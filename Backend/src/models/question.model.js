const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  category: { type: String, required: true },
  topic: { type: String, required: true },
  difficulty: { type: String, default: "Easy" },
  question: { type: String, required: true },
  options: { type: [String], required: true },
  answer: { type: Number, required: true },
  explanation: { type: String, default: "" },
});

module.exports = mongoose.model("Question", questionSchema);