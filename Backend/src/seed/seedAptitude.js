require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Question = require("../models/question.model");
const AptitudeAnswer = require("../models/aptitudeAnswer.model");

const folder = path.join(__dirname, "aptitude");

const loadQuestions = () => {
  const files = fs.readdirSync(folder).filter((file) => file.endsWith(".js"));
  const all = [];

  files.forEach((file) => {
    const list = require(path.join(folder, file));

    list.forEach((q, index) => {
      const problems = [];

      if (!q.question) problems.push("missing question");
      if (!Array.isArray(q.options) || q.options.length !== 4) problems.push("needs exactly 4 options");
      if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3) problems.push("answer must be 0 to 3");
      if (!q.explanation) problems.push("missing explanation");

      if (problems.length > 0) {
        throw new Error(`${file}, question ${index + 1}: ${problems.join(", ")}`);
      }
    });

    all.push(...list);
  });

  return { all, fileCount: files.length };
};

async function seed() {
  try {
    const { all, fileCount } = loadQuestions();

    await mongoose.connect(process.env.MONGO_URI);

    await AptitudeAnswer.deleteMany();
    await Question.deleteMany();
    await Question.insertMany(all);

    console.log(`Seeded ${all.length} aptitude questions from ${fileCount} files`);
  } catch (error) {
    console.error("Seed error:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

seed();