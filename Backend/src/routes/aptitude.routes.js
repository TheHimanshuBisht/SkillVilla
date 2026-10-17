const express = require("express");
const mongoose = require("mongoose");
const Question = require("../models/question.model");
const AptitudeAnswer = require("../models/aptitudeAnswer.model");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

// Categories with their topics and question counts
router.get("/aptitude/topics", authMiddleware, async (req, res) => {
  try {
    const rows = await Question.aggregate([
      { $group: { _id: { category: "$category", topic: "$topic" }, count: { $sum: 1 } } },
      { $sort: { "_id.category": 1, "_id.topic": 1 } },
    ]);

    const byCategory = {};
    rows.forEach(({ _id, count }) => {
      if (!byCategory[_id.category]) byCategory[_id.category] = [];
      byCategory[_id.category].push({ topic: _id.topic, count });
    });

    const categories = Object.keys(byCategory).map((name) => ({
      name,
      topics: byCategory[name],
      total: byCategory[name].reduce((sum, t) => sum + t.count, 0),
    }));

    res.status(200).json({ categories });
  } catch (error) {
    console.error("Aptitude topics error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Random questions, without the answers
router.get("/aptitude/questions", authMiddleware, async (req, res) => {
  try {
    const { category, topic } = req.query;
    const limit = Math.min(parseInt(req.query.limit, 10) || 10, 30);

    const match = {};
    if (typeof category === "string" && category) match.category = category;
    if (typeof topic === "string" && topic) match.topic = topic;

    const questions = await Question.aggregate([
      { $match: match },
      { $sample: { size: limit } },
      { $project: { answer: 0, explanation: 0 } },
    ]);

    res.status(200).json({ questions });
  } catch (error) {
    console.error("Aptitude questions error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Check one answer and save it
router.post("/aptitude/check", authMiddleware, async (req, res) => {
  try {
    const { questionId, selected } = req.body;

    if (!mongoose.isValidObjectId(questionId) || !Number.isInteger(selected)) {
      return res.status(400).json({ message: "questionId and selected are required" });
    }

    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    if (selected < 0 || selected >= question.options.length) {
      return res.status(400).json({ message: "Invalid option" });
    }

    const isCorrect = selected === question.answer;

    await AptitudeAnswer.create({
      user: req.user.id,
      question: question._id,
      category: question.category,
      topic: question.topic,
      selected,
      isCorrect,
    });

    res.status(200).json({
      isCorrect,
      correctIndex: question.answer,
      explanation: question.explanation,
    });
  } catch (error) {
    console.error("Aptitude check error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;