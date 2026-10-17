const mongoose = require("mongoose");

const mockAttemptSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  testId: { type: String, required: true },
  testTitle: { type: String, required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  durationMinutes: { type: Number, required: true },
  startedAt: { type: Date, default: Date.now },
  submittedAt: { type: Date },
  status: { type: String, enum: ["in-progress", "submitted"], default: "in-progress" },
  score: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  breakdown: [
    {
      category: String,
      topic: String,
      correct: Number,
      total: Number,
    },
  ],
});

mockAttemptSchema.index({ user: 1, startedAt: -1 });

module.exports = mongoose.model("MockAttempt", mockAttemptSchema);