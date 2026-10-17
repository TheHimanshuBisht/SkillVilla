const express = require("express");
const mongoose = require("mongoose");
const Question = require("../models/question.model");
const MockAttempt = require("../models/mockAttempt.model");
const AptitudeAnswer = require("../models/aptitudeAnswer.model");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

const TESTS = [
  {
    id: "full",
    title: "Full Mock Test",
    description: "A mix of Quantitative, Logical Reasoning and Verbal, like a real placement test.",
    durationMinutes: 30,
    plan: [
      { category: "Quantitative", count: 10 },
      { category: "Logical Reasoning", count: 10 },
      { category: "Verbal", count: 10 },
    ],
  },
  {
    id: "quant",
    title: "Quantitative Test",
    description: "Percentages, profit and loss, time and work, averages and more.",
    durationMinutes: 20,
    plan: [{ category: "Quantitative", count: 20 }],
  },
  {
    id: "logical",
    title: "Logical Reasoning Test",
    description: "Series, coding-decoding, blood relations, directions and syllogisms.",
    durationMinutes: 20,
    plan: [{ category: "Logical Reasoning", count: 20 }],
  },
  {
    id: "verbal",
    title: "Verbal Test",
    description: "Synonyms, fill in the blanks, error spotting and idioms.",
    durationMinutes: 15,
    plan: [{ category: "Verbal", count: 20 }],
  },
];

const totalOf = (test) => test.plan.reduce((sum, part) => sum + part.count, 0);

// List of available tests
router.get("/mock/tests", authMiddleware, (req, res) => {
  const tests = TESTS.map((test) => ({
    id: test.id,
    title: test.title,
    description: test.description,
    durationMinutes: test.durationMinutes,
    totalQuestions: totalOf(test),
  }));

  res.status(200).json({ tests });
});

// Start a test: pick random questions (without answers) and create an attempt
router.post("/mock/start", authMiddleware, async (req, res) => {
  try {
    const test = TESTS.find((t) => t.id === req.body.testId);

    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    let questions = [];

    for (const part of test.plan) {
      const picked = await Question.aggregate([
        { $match: { category: part.category } },
        { $sample: { size: part.count } },
        { $project: { answer: 0, explanation: 0, difficulty: 0 } },
      ]);

      if (picked.length < part.count) {
        return res.status(400).json({ message: `Not enough ${part.category} questions` });
      }

      questions = questions.concat(picked);
    }

    const attempt = await MockAttempt.create({
      user: req.user.id,
      testId: test.id,
      testTitle: test.title,
      questions: questions.map((q) => q._id),
      durationMinutes: test.durationMinutes,
    });

    res.status(200).json({
      attempt: {
        id: attempt._id,
        title: test.title,
        durationMinutes: test.durationMinutes,
      },
      questions,
    });
  } catch (error) {
    console.error("Start mock error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Submit a test: grade it, save the result and return a full review
router.post("/mock/submit", authMiddleware, async (req, res) => {
  try {
    const { attemptId, answers } = req.body;

    if (!mongoose.isValidObjectId(attemptId)) {
      return res.status(400).json({ message: "A valid attemptId is required" });
    }

    const attempt = await MockAttempt.findOne({ _id: attemptId, user: req.user.id });

    if (!attempt) {
      return res.status(404).json({ message: "Attempt not found" });
    }

    if (attempt.status === "submitted") {
      return res.status(400).json({ message: "This test was already submitted" });
    }

    const given = answers && typeof answers === "object" ? answers : {};

    const found = await Question.find({ _id: { $in: attempt.questions } });
    const byId = new Map(found.map((q) => [q._id.toString(), q]));

    const review = [];
    const topicStats = {};
    const answeredDocs = [];
    let score = 0;

    attempt.questions.forEach((id) => {
      const q = byId.get(id.toString());
      if (!q) return;

      const picked = given[q._id.toString()];
      const selected =
        Number.isInteger(picked) && picked >= 0 && picked < q.options.length ? picked : null;
      const isCorrect = selected === q.answer;

      if (isCorrect) score++;

      const key = `${q.category}|${q.topic}`;
      if (!topicStats[key]) {
        topicStats[key] = { category: q.category, topic: q.topic, correct: 0, total: 0 };
      }
      topicStats[key].total++;
      if (isCorrect) topicStats[key].correct++;

      if (selected !== null) {
        answeredDocs.push({
          user: req.user.id,
          question: q._id,
          category: q.category,
          topic: q.topic,
          selected,
          isCorrect,
        });
      }

      review.push({
        questionId: q._id,
        question: q.question,
        options: q.options,
        category: q.category,
        topic: q.topic,
        selected,
        correctIndex: q.answer,
        isCorrect,
        explanation: q.explanation,
      });
    });

    const breakdown = Object.values(topicStats);
    const submittedAt = new Date();

    attempt.status = "submitted";
    attempt.submittedAt = submittedAt;
    attempt.score = score;
    attempt.total = review.length;
    attempt.breakdown = breakdown;
    await attempt.save();

    // Saved answers will also feed the weak-topic remarks later
    if (answeredDocs.length > 0) {
      await AptitudeAnswer.insertMany(answeredDocs);
    }

    const timeTakenSeconds = Math.min(
      Math.round((submittedAt - attempt.startedAt) / 1000),
      attempt.durationMinutes * 60
    );

    res.status(200).json({
      testTitle: attempt.testTitle,
      score,
      total: review.length,
      timeTakenSeconds,
      breakdown,
      review,
    });
  } catch (error) {
    console.error("Submit mock error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// The last 10 submitted attempts
router.get("/mock/history", authMiddleware, async (req, res) => {
  try {
    const attempts = await MockAttempt.find({ user: req.user.id, status: "submitted" })
      .sort({ submittedAt: -1 })
      .limit(10)
      .select("testTitle score total submittedAt");

    res.status(200).json({ attempts });
  } catch (error) {
    console.error("Mock history error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;