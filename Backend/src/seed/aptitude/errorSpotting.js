const category = "Verbal";
const topic = "Error Spotting";

module.exports = [
  {
    difficulty: "Easy",
    question: "Find the part that has an error: \"He don't (A) like to (B) play cricket in the evening (C).\" Choose \"No error\" if the sentence is correct.",
    options: ["A", "B", "C", "No error"],
    answer: 0,
    explanation: "With he, she and it, we use doesn't. The correct form is \"He doesn't\".",
  },
  {
    difficulty: "Easy",
    question: "Find the part that has an error: \"The books (A) on the table (B) is mine (C).\" Choose \"No error\" if the sentence is correct.",
    options: ["A", "B", "C", "No error"],
    answer: 2,
    explanation: "The subject \"books\" is plural, so the verb must be are. The correct form is \"are mine\".",
  },
  {
    difficulty: "Easy",
    question: "Find the part that has an error: \"She has (A) been working here (B) since five years (C).\" Choose \"No error\" if the sentence is correct.",
    options: ["A", "B", "C", "No error"],
    answer: 2,
    explanation: "Use for with a length of time. The correct form is \"for five years\".",
  },
  {
    difficulty: "Medium",
    question: "Find the part that has an error: \"I am (A) looking forward (B) to meet you (C).\" Choose \"No error\" if the sentence is correct.",
    options: ["A", "B", "C", "No error"],
    answer: 2,
    explanation: "In \"look forward to\", the word to is a preposition, so it is followed by an -ing form. The correct form is \"to meeting you\".",
  },
  {
    difficulty: "Medium",
    question: "Find the part that has an error: \"Each of the students (A) have completed (B) the assignment (C).\" Choose \"No error\" if the sentence is correct.",
    options: ["A", "B", "C", "No error"],
    answer: 1,
    explanation: "\"Each\" is singular, so the verb must be has. The correct form is \"has completed\".",
  },
  {
    difficulty: "Easy",
    question: "Find the part that has an error: \"He is (A) more taller (B) than his brother (C).\" Choose \"No error\" if the sentence is correct.",
    options: ["A", "B", "C", "No error"],
    answer: 1,
    explanation: "Taller is already a comparison, so we do not add more. The correct form is \"taller\".",
  },
  {
    difficulty: "Hard",
    question: "Find the part that has an error: \"Neither the manager (A) nor the employees (B) was present (C) at the meeting.\" Choose \"No error\" if the sentence is correct.",
    options: ["A", "B", "C", "No error"],
    answer: 2,
    explanation: "With neither...nor, the verb agrees with the subject nearest to it. That is \"employees\", which is plural, so the correct form is \"were present\".",
  },
  {
    difficulty: "Medium",
    question: "Find the part that has an error: \"We discussed about (A) the problem (B) for two hours (C).\" Choose \"No error\" if the sentence is correct.",
    options: ["A", "B", "C", "No error"],
    answer: 0,
    explanation: "The verb discuss takes no preposition. The correct form is \"We discussed the problem\".",
  },
  {
    difficulty: "Medium",
    question: "Find the part that has an error: \"She gave me (A) an advice (B) about my career (C).\" Choose \"No error\" if the sentence is correct.",
    options: ["A", "B", "C", "No error"],
    answer: 1,
    explanation: "Advice is uncountable, so it has no a or an. The correct form is \"some advice\" or \"a piece of advice\".",
  },
  {
    difficulty: "Easy",
    question: "Find the part that has an error: \"The sun (A) rises (B) in the east (C).\" Choose \"No error\" if the sentence is correct.",
    options: ["A", "B", "C", "No error"],
    answer: 3,
    explanation: "The sentence is correct. A general fact uses the simple present, and the sun rises in the east.",
  },
].map((q) => ({ category, topic, ...q }));