const category = "Verbal";
const topic = "Fill in the Blanks";

module.exports = [
  {
    difficulty: "Easy",
    question: "She ___ to the office every day.",
    options: ["goes", "go", "going", "gone"],
    answer: 0,
    explanation: "In the simple present, a singular subject (he, she, it) takes a verb ending in -s or -es. So the answer is goes.",
  },
  {
    difficulty: "Easy",
    question: "They ___ playing football when it started to rain.",
    options: ["was", "were", "is", "are"],
    answer: 1,
    explanation: "\"They\" is plural, and the action was in the past, so we use were.",
  },
  {
    difficulty: "Easy",
    question: "I have lived in this city ___ 2015.",
    options: ["for", "from", "since", "during"],
    answer: 2,
    explanation: "Use since with a point in time (2015), and for with a length of time (ten years).",
  },
  {
    difficulty: "Easy",
    question: "He is good ___ mathematics.",
    options: ["in", "on", "for", "at"],
    answer: 3,
    explanation: "The fixed combination is \"good at\" a subject or skill.",
  },
  {
    difficulty: "Medium",
    question: "Neither of the two answers ___ correct.",
    options: ["are", "were", "have been", "is"],
    answer: 3,
    explanation: "\"Neither\" means not one of the two, so it takes a singular verb. The answer is is.",
  },
  {
    difficulty: "Medium",
    question: "If I ___ you, I would accept the offer.",
    options: ["were", "was", "am", "be"],
    answer: 0,
    explanation: "For an imaginary situation, we use were with every subject: \"If I were you\".",
  },
  {
    difficulty: "Medium",
    question: "The teacher, along with her students, ___ going on a trip.",
    options: ["are", "is", "were", "have"],
    answer: 1,
    explanation: "The subject is \"teacher\". The phrase \"along with her students\" is extra and does not make the subject plural, so the verb is is.",
  },
  {
    difficulty: "Easy",
    question: "He has been waiting ___ two hours.",
    options: ["since", "at", "for", "from"],
    answer: 2,
    explanation: "Use for with a length of time (two hours). Since is used with a starting point, such as 5 o'clock.",
  },
  {
    difficulty: "Medium",
    question: "She asked me where ___.",
    options: ["did I live", "do I live", "I lived", "I live in"],
    answer: 2,
    explanation: "In reported speech the question becomes a statement, so the word order is normal and the verb moves back to the past: \"where I lived\".",
  },
  {
    difficulty: "Medium",
    question: "I would rather ___ at home than go out.",
    options: ["to stay", "staying", "stay", "stayed"],
    answer: 2,
    explanation: "\"Would rather\" is followed by the base form of the verb, so the answer is stay.",
  },
].map((q) => ({ category, topic, ...q }));