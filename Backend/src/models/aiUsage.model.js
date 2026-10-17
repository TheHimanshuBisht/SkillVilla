const mongoose = require("mongoose");

const aiUsageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  day: { type: String, required: true },
  count: { type: Number, default: 0 },
});

aiUsageSchema.index({ user: 1, day: 1 }, { unique: true });

module.exports = mongoose.model("AiUsage", aiUsageSchema);