const category = "Quantitative";
const topic = "Averages";

module.exports = [
  {
    difficulty: "Easy",
    question: "What is the average of 10, 20, 30, 40 and 50?",
    options: ["25", "30", "35", "40"],
    answer: 1,
    explanation: "Sum = 150. Average = 150 / 5 = 30.",
  },
  {
    difficulty: "Easy",
    question: "The average of 5 numbers is 24. What is their sum?",
    options: ["100", "110", "120", "125"],
    answer: 2,
    explanation: "Sum = average × number of items = 24 × 5 = 120.",
  },
  {
    difficulty: "Medium",
    question: "The average of 6 numbers is 20. If one of the numbers, 25, is removed, what is the average of the remaining 5 numbers?",
    options: ["18", "19", "19.5", "20"],
    answer: 1,
    explanation: "Sum of 6 numbers = 120. After removing 25, the sum = 95. New average = 95 / 5 = 19.",
  },
  {
    difficulty: "Medium",
    question: "The average of 4 numbers is 30. A fifth number is added and the average becomes 32. What is the fifth number?",
    options: ["36", "38", "40", "42"],
    answer: 2,
    explanation: "Sum of 4 numbers = 120. New sum = 32 × 5 = 160. Fifth number = 160 − 120 = 40.",
  },
  {
    difficulty: "Medium",
    question: "The average age of 3 persons is 24 years. A new person joins and the average becomes 26. What is the age of the new person?",
    options: ["30", "32", "34", "36"],
    answer: 1,
    explanation: "Old sum = 72. New sum = 26 × 4 = 104. New person's age = 104 − 72 = 32.",
  },
  {
    difficulty: "Medium",
    question: "A cricketer's average after 10 innings is 40. He scores 62 in the 11th innings. What is his new average?",
    options: ["41", "42", "43", "44"],
    answer: 1,
    explanation: "Runs in 10 innings = 400. After the 11th innings, total = 462. New average = 462 / 11 = 42.",
  },
  {
    difficulty: "Easy",
    question: "What is the average of the first 10 natural numbers?",
    options: ["5", "5.5", "6", "6.5"],
    answer: 1,
    explanation: "Sum of 1 to 10 = 55. Average = 55 / 10 = 5.5.",
  },
  {
    difficulty: "Medium",
    question: "The average weight of 8 students is 50 kg. When their teacher's weight is included, the average rises by 2 kg. What is the teacher's weight?",
    options: ["64 kg", "66 kg", "68 kg", "70 kg"],
    answer: 2,
    explanation: "Sum of 8 students = 400. New average = 52 for 9 people, so the new sum = 468. Teacher's weight = 468 − 400 = 68 kg.",
  },
  {
    difficulty: "Easy",
    question: "The average of three consecutive even numbers is 14. What is the largest of them?",
    options: ["14", "16", "18", "12"],
    answer: 1,
    explanation: "The middle number is the average, 14. So the numbers are 12, 14 and 16. The largest is 16.",
  },
  {
    difficulty: "Medium",
    question: "The average marks of 40 students is 60 and of another 20 students is 75. What is the average of all 60 students?",
    options: ["62.5", "65", "67.5", "70"],
    answer: 1,
    explanation: "Total marks = 40 × 60 + 20 × 75 = 2,400 + 1,500 = 3,900. Average = 3,900 / 60 = 65.",
  },
].map((q) => ({ category, topic, ...q }));