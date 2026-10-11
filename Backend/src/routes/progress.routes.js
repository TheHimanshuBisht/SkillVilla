const express = require("express");
const mongoose = require("mongoose");
const Lesson = require("../models/lesson.model");
const Progress = require("../models/progress.model");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

// Helpers for the streak
const toDayKey = (date, offsetMinutes) =>
  new Date(date.getTime() - offsetMinutes * 60000).toISOString().slice(0, 10);

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

// Get the logged-in user's progress summary
router.get("/progress", authMiddleware, async (req, res) => {
  try {
    const offset = parseInt(req.query.tzOffset, 10) || 0;

    const records = await Progress.find({ user: req.user.id });
    const totalLessons = await Lesson.countDocuments();

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
    const streak = calculateStreak(
      records.map((record) => record.completedAt),
      offset
    );

    res.status(200).json({
      completedLessonIds,
      completedByCourse,
      totalCompleted,
      totalLessons,
      overallPercent,
      streak,
      coursesStarted: Object.keys(completedByCourse).length,
    });
  } catch (error) {
    console.error("Get progress error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;