const express = require("express");
const mongoose = require("mongoose");
const AptitudeAnswer = require("../models/aptitudeAnswer.model");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

const MIN_ATTEMPTS = 5;

const getLevel = (percent, attempted) => {
  if (attempted < MIN_ATTEMPTS) return "new";
  if (percent < 50) return "weak";
  if (percent <= 75) return "improving";
  return "strong";
};

const getMessage = (level, topic) => {
  if (level === "weak") return `You need to improve in ${topic}. Practise this topic more.`;
  if (level === "improving") return `You are getting better in ${topic}. Keep practising.`;
  if (level === "strong") return `You are strong in ${topic}. Well done!`;
  return `Answer a few more ${topic} questions to see your remark.`;
};

router.get("/insights/aptitude", authMiddleware, async (req, res) => {
  try {
    const rows = await AptitudeAnswer.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
      {
        $group: {
          _id: { category: "$category", topic: "$topic" },
          attempted: { $sum: 1 },
          correct: { $sum: { $cond: ["$isCorrect", 1, 0] } },
        },
      },
    ]);

    const byCategory = {};
    let totalAttempted = 0;
    let totalCorrect = 0;

    rows.forEach(({ _id, attempted, correct }) => {
      const percent = Math.round((correct / attempted) * 100);
      const level = getLevel(percent, attempted);

      if (!byCategory[_id.category]) {
        byCategory[_id.category] = { name: _id.category, attempted: 0, correct: 0, topics: [] };
      }

      const category = byCategory[_id.category];
      category.attempted += attempted;
      category.correct += correct;
      category.topics.push({
        topic: _id.topic,
        attempted,
        correct,
        percent,
        level,
        message: getMessage(level, _id.topic),
      });

      totalAttempted += attempted;
      totalCorrect += correct;
    });

    const categories = Object.values(byCategory)
      .map((category) => {
        const percent = Math.round((category.correct / category.attempted) * 100);

        return {
          ...category,
          percent,
          level: getLevel(percent, category.attempted),
          topics: category.topics.sort((a, b) => a.percent - b.percent),
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    const allTopics = categories.flatMap((category) =>
      category.topics.map((topic) => ({ ...topic, category: category.name }))
    );

    const focusTopics = allTopics
      .filter((topic) => topic.level === "weak")
      .sort((a, b) => a.percent - b.percent)
      .slice(0, 5);

    const strongTopics = allTopics
      .filter((topic) => topic.level === "strong")
      .sort((a, b) => b.percent - a.percent)
      .slice(0, 3);

    res.status(200).json({
      totalAttempted,
      totalCorrect,
      overallPercent: totalAttempted ? Math.round((totalCorrect / totalAttempted) * 100) : 0,
      categories,
      focusTopics,
      strongTopics,
    });
  } catch (error) {
    console.error("Aptitude insights error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;