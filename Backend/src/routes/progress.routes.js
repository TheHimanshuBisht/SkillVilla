const express = require("express");
const mongoose = require("mongoose");
const Lesson = require("../models/lesson.model");
const Progress = require("../models/progress.model");
const AptitudeAnswer = require("../models/aptitudeAnswer.model");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

// Helpers for streaks and daily activity
const getOffset = (req) => {
  const value = parseInt(req.query.tzOffset, 10);
  return Number.isFinite(value) && Math.abs(value) <= 840 ? value : 0;
};

const toDayKey = (date, offsetMinutes) =>
  new Date(new Date(date).getTime() - offsetMinutes * 60000).toISOString().slice(0, 10);

const previousDay = (key) => {
  const d = new Date(`${key}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().slice(0, 10);
};

const calculateStreak = (dates, offsetMinutes) => {
  const days = new Set(dates.map((d) => toDayKey(d, offsetMinutes)));
  const today = toDayKey(new Date(), offsetMinutes);

  let current = days.has(today) ? today : previousDay(today);
  let streak = 0;

  while (days.has(current)) {
    streak++;
    current = previousDay(current);
  }

  return streak;
};

const calculateLongestStreak = (dates, offsetMinutes) => {
  const days = [...new Set(dates.map((d) => toDayKey(d, offsetMinutes)))].sort();

  let longest = 0;
  let run = 0;
  let previous = null;

  days.forEach((day) => {
    run = previous && previousDay(day) === previous ? run + 1 : 1;
    longest = Math.max(longest, run);
    previous = day;
  });

  return longest;
};

// Mark a lesson as complete
router.post("/progress/complete", authMiddleware, async (req, res) => {
  try {
    const { lessonId } = req.body;

    if (!lessonId || !mongoose.isValidObjectId(lessonId)) {
      return res.status(400).json({ message: "A valid lessonId is required" });
    }

    const lesson = await Lesson.findById(lessonId);

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    await Progress.findOneAndUpdate(
      { user: req.user.id, lesson: lesson._id },
      { $setOnInsert: { course: lesson.course, completedAt: new Date() } },
      { upsert: true }
    );

    res.status(200).json({ message: "Lesson marked as complete" });
  } catch (error) {
    console.error("Complete lesson error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Progress summary: lessons, streaks and totals
router.get("/progress", authMiddleware, async (req, res) => {
  try {
    const offset = getOffset(req);

    const [records, answers, totalLessons] = await Promise.all([
      Progress.find({ user: req.user.id }),
      AptitudeAnswer.find({ user: req.user.id }).select("createdAt").lean(),
      Lesson.countDocuments(),
    ]);

    const completedLessonIds = records.map((record) => record.lesson);

    const completedByCourse = {};
    records.forEach((record) => {
      const key = record.course.toString();
      completedByCourse[key] = (completedByCourse[key] || 0) + 1;
    });

    const totalCompleted = records.length;
    const overallPercent = totalLessons
      ? Math.round((totalCompleted / totalLessons) * 100)
      : 0;

    // Any lesson completed or aptitude question answered counts as a day of activity
    const activityDates = [
      ...records.map((record) => record.completedAt),
      ...answers.map((answer) => answer.createdAt),
    ];

    res.status(200).json({
      completedLessonIds,
      completedByCourse,
      totalCompleted,
      totalLessons,
      overallPercent,
      streak: calculateStreak(activityDates, offset),
      longestStreak: calculateLongestStreak(activityDates, offset),
      coursesStarted: Object.keys(completedByCourse).length,
    });
  } catch (error) {
    console.error("Get progress error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Activity for the last 7 days
router.get("/progress/activity", authMiddleware, async (req, res) => {
  try {
    const offset = getOffset(req);

    const [records, answers] = await Promise.all([
      Progress.find({ user: req.user.id }).select("completedAt").lean(),
      AptitudeAnswer.find({ user: req.user.id }).select("createdAt").lean(),
    ]);

    const days = [];
    let key = toDayKey(new Date(), offset);

    for (let i = 0; i < 7; i++) {
      days.unshift(key);
      key = previousDay(key);
    }

    const lessonsByDay = {};
    records.forEach((record) => {
      const day = toDayKey(record.completedAt, offset);
      lessonsByDay[day] = (lessonsByDay[day] || 0) + 1;
    });

    const questionsByDay = {};
    answers.forEach((answer) => {
      const day = toDayKey(answer.createdAt, offset);
      questionsByDay[day] = (questionsByDay[day] || 0) + 1;
    });

    const activity = days.map((day) => ({
      day,
      lessons: lessonsByDay[day] || 0,
      questions: questionsByDay[day] || 0,
    }));

    res.status(200).json({
      activity,
      weekLessons: activity.reduce((sum, item) => sum + item.lessons, 0),
      weekQuestions: activity.reduce((sum, item) => sum + item.questions, 0),
      activeDays: activity.filter((item) => item.lessons + item.questions > 0).length,
    });
  } catch (error) {
    console.error("Get activity error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;