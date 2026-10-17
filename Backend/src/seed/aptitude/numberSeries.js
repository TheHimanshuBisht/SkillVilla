const category = "Logical Reasoning";
const topic = "Number Series";

module.exports = [
  {
    difficulty: "Easy",
    question: "Find the next number: 2, 4, 6, 8, ?",
    options: ["9", "10", "11", "12"],
    answer: 1,
    explanation: "Each number is 2 more than the previous one. 8 + 2 = 10.",
  },
  {
    difficulty: "Easy",
    question: "Find the next number: 3, 6, 12, 24, ?",
    options: ["48", "36", "42", "60"],
    answer: 0,
    explanation: "Each number is double the previous one. 24 × 2 = 48.",
  },
  {
    difficulty: "Easy",
    question: "Find the next number: 1, 4, 9, 16, 25, ?",
    options: ["30", "34", "49", "36"],
    answer: 3,
    explanation: "These are square numbers: 1², 2², 3², 4², 5². The next is 6² = 36.",
  },
  {
    difficulty: "Medium",
    question: "Find the next number: 5, 11, 23, 47, ?",
    options: ["91", "93", "95", "97"],
    answer: 2,
    explanation: "Each number = previous × 2 + 1. 5×2+1 = 11, 11×2+1 = 23, 23×2+1 = 47, so the next is 47×2+1 = 95.",
  },
  {
    difficulty: "Easy",
    question: "Find the next number: 2, 3, 5, 7, 11, ?",
    options: ["12", "13", "14", "15"],
    answer: 1,
    explanation: "These are prime numbers in order. The next prime after 11 is 13.",
  },
  {
    difficulty: "Medium",
    question: "Find the next number: 1, 2, 6, 24, 120, ?",
    options: ["720", "240", "600", "840"],
    answer: 0,
    explanation: "The multipliers go 2, 3, 4, 5, so the next multiplier is 6. 120 × 6 = 720.",
  },
  {
    difficulty: "Medium",
    question: "Find the next number: 100, 95, 85, 70, ?",
    options: ["45", "55", "60", "50"],
    answer: 3,
    explanation: "The differences are −5, −10, −15, so the next difference is −20. 70 − 20 = 50.",
  },
  {
    difficulty: "Easy",
    question: "Find the next number: 1, 1, 2, 3, 5, 8, ?",
    options: ["11", "12", "13", "14"],
    answer: 2,
    explanation: "Each number is the sum of the two before it (Fibonacci series). 5 + 8 = 13.",
  },
  {
    difficulty: "Medium",
    question: "Find the next number: 2, 5, 10, 17, 26, ?",
    options: ["37", "35", "36", "38"],
    answer: 0,
    explanation: "The differences are 3, 5, 7, 9, so the next difference is 11. 26 + 11 = 37. (Each term is n² + 1.)",
  },
  {
    difficulty: "Hard",
    question: "Find the wrong number in the series: 3, 6, 12, 24, 50, 96, 192",
    options: ["12", "24", "50", "96"],
    answer: 2,
    explanation: "Each number should be double the previous one: 3, 6, 12, 24, 48, 96, 192. So 50 is wrong, and it should be 48.",
  },
].map((q) => ({ category, topic, ...q }));