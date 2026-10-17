const express = require("express");
const Course = require("../models/course.model");
const Lesson = require("../models/lesson.model");
const Progress = require("../models/progress.model");
const MockAttempt = require("../models/mockAttempt.model");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/dashboard/summary", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const [courses, lessons, records, attempts] = await Promise.all([
      Course.find().sort({ order: 1 }).lean(),
      Lesson.find().sort({ order: 1 }).select("title order course").lean(),
      Progress.find({ user: userId }).sort({ completedAt: -1 }).lean(),
      MockAttempt.find({ user: userId, status: "submitted" })
        .sort({ submittedAt: -1 })
        .limit(5)
        .lean(),
    ]);

    const completedIds = new Set(records.map((record) => record.lesson.toString()));
    const lessonTitleById = new Map(lessons.map((lesson) => [lesson._id.toString(), lesson.title]));

    // Courses the user has started but not finished, with the next lesson to open
    const continueLearning = courses
      .map((course) => {
        const courseLessons = lessons.filter(
          (lesson) => lesson.course.toString() === course._id.toString()
        );
        const done = courseLessons.filter((lesson) => completedIds.has(lesson._id.toString())).length;
        const next = courseLessons.find((lesson) => !completedIds.has(lesson._id.toString()));

        return {
          courseId: course._id,
          title: course.title,
          icon: course.icon,
          completed: done,
          total: courseLessons.length,
          percent: courseLessons.length ? Math.round((done / courseLessons.length) * 100) : 0,
          nextLesson: next ? { id: next._id, title: next.title, order: next.order } : null,
        };
      })
      .filter((course) => course.completed > 0 && course.nextLesson)
      .slice(0, 3);

    // Latest lessons completed and mock tests submitted, newest first
    const events = [];

    records.slice(0, 5).forEach((record) => {
      const title = lessonTitleById.get(record.lesson.toString());
      if (title) {
        events.push({ type: "lesson", text: `Completed lesson: ${title}`, at: record.completedAt });
      }
    });

    attempts.forEach((attempt) => {
      events.push({
        type: "mock",
        text: `Scored ${attempt.score}/${attempt.total} in ${attempt.testTitle}`,
        at: attempt.submittedAt,
      });
    });

    const recentActivity = events
      .sort((a, b) => new Date(b.at) - new Date(a.at))
      .slice(0, 5);

    res.status(200).json({ continueLearning, recentActivity });
  } catch (error) {
    console.error("Dashboard summary error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;