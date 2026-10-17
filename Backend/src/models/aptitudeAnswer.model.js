const mongoose = require("mongoose");

const aptitudeAnswerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  question: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
  category: { type: String, required: true },
  topic: { type: String, required: true },
  selected: { type: Number, required: true },
  isCorrect: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
});

aptitudeAnswerSchema.index({ user: 1, category: 1 });

module.exports = mongoose.model("AptitudeAnswer", aptitudeAnswerSchema);