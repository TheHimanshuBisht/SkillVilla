const category = "Verbal";
const topic = "Synonyms and Antonyms";

module.exports = [
  {
    difficulty: "Easy",
    question: "Choose the word closest in meaning to \"Rapid\".",
    options: ["Slow", "Quick", "Weak", "Quiet"],
    answer: 1,
    explanation: "Rapid means happening at great speed, so Quick is the closest.",
  },
  {
    difficulty: "Easy",
    question: "Choose the word opposite in meaning to \"Generous\".",
    options: ["Kind", "Brave", "Selfish", "Wealthy"],
    answer: 2,
    explanation: "A generous person gives freely. The opposite is Selfish.",
  },
  {
    difficulty: "Easy",
    question: "Choose the word closest in meaning to \"Abundant\".",
    options: ["Plentiful", "Scarce", "Tiny", "Costly"],
    answer: 0,
    explanation: "Abundant means existing in large quantities, so Plentiful is the closest.",
  },
  {
    difficulty: "Easy",
    question: "Choose the word opposite in meaning to \"Ancient\".",
    options: ["Old", "Historic", "Dusty", "Modern"],
    answer: 3,
    explanation: "Ancient means very old. The opposite is Modern.",
  },
  {
    difficulty: "Easy",
    question: "Choose the word closest in meaning to \"Brave\".",
    options: ["Timid", "Careless", "Courageous", "Proud"],
    answer: 2,
    explanation: "Brave means ready to face danger without fear. Courageous has the same meaning.",
  },
  {
    difficulty: "Medium",
    question: "Choose the word opposite in meaning to \"Expand\".",
    options: ["Grow", "Contract", "Stretch", "Spread"],
    answer: 1,
    explanation: "Expand means to become larger. The opposite is Contract, which means to become smaller.",
  },
  {
    difficulty: "Medium",
    question: "Choose the word closest in meaning to \"Reluctant\".",
    options: ["Unwilling", "Eager", "Certain", "Careful"],
    answer: 0,
    explanation: "Reluctant means not willing to do something. Unwilling is the closest.",
  },
  {
    difficulty: "Medium",
    question: "Choose the word opposite in meaning to \"Transparent\".",
    options: ["Clear", "Thin", "Opaque", "Bright"],
    answer: 2,
    explanation: "Transparent means that you can see through it. The opposite is Opaque, which means you cannot see through it.",
  },
  {
    difficulty: "Hard",
    question: "Choose the word closest in meaning to \"Meagre\".",
    options: ["Plentiful", "Heavy", "Rich", "Scanty"],
    answer: 3,
    explanation: "Meagre means small in quantity or amount. Scanty is the closest.",
  },
  {
    difficulty: "Hard",
    question: "Choose the word opposite in meaning to \"Benevolent\".",
    options: ["Malevolent", "Kind", "Helpful", "Generous"],
    answer: 0,
    explanation: "Benevolent means kind and wishing good for others. The opposite is Malevolent, which means wishing harm to others.",
  },
].map((q) => ({ category, topic, ...q }));