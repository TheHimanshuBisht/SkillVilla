const category = "Quantitative";
const topic = "Time and Work";

module.exports = [
  {
    difficulty: "Easy",
    question: "A can finish a job in 12 days. What fraction of the job does A finish in one day?",
    options: ["1/6", "1/12", "1/10", "1/24"],
    answer: 1,
    explanation: "If a job takes 12 days, one day's work is 1/12 of the job.",
  },
  {
    difficulty: "Easy",
    question: "A can finish a job in 20 days and B can finish it in 30 days. Working together, in how many days will they finish it?",
    options: ["10", "12", "15", "25"],
    answer: 1,
    explanation: "In one day they do 1/20 + 1/30 = 3/60 + 2/60 = 5/60 = 1/12 of the job. So they need 12 days.",
  },
  {
    difficulty: "Easy",
    question: "10 men can build a wall in 15 days. How many days will 15 men take to build the same wall?",
    options: ["8", "10", "12", "22.5"],
    answer: 1,
    explanation: "Total work = 10 × 15 = 150 man-days. With 15 men, days needed = 150 / 15 = 10.",
  },
  {
    difficulty: "Medium",
    question: "A can finish a job in 10 days. A and B together can finish it in 6 days. In how many days can B alone finish it?",
    options: ["12", "15", "16", "18"],
    answer: 1,
    explanation: "B's one-day work = 1/6 − 1/10 = 5/30 − 3/30 = 2/30 = 1/15. So B alone needs 15 days.",
  },
  {
    difficulty: "Hard",
    question: "A and B can do a job in 12 days, B and C in 15 days, and A and C in 20 days. In how many days can all three together do it?",
    options: ["8", "10", "12", "15"],
    answer: 1,
    explanation: "Adding the three: 2(A + B + C) = 1/12 + 1/15 + 1/20 = 5/60 + 4/60 + 3/60 = 12/60 = 1/5. So A + B + C = 1/10, which means 10 days.",
  },
  {
    difficulty: "Medium",
    question: "A pipe can fill a tank in 6 hours. Another pipe can empty the full tank in 12 hours. If both are opened together, how long will the empty tank take to fill?",
    options: ["6 hours", "9 hours", "12 hours", "18 hours"],
    answer: 2,
    explanation: "Net work in one hour = 1/6 − 1/12 = 2/12 − 1/12 = 1/12. So the tank fills in 12 hours.",
  },
  {
    difficulty: "Medium",
    question: "A can do a job in 15 days and B in 20 days. They work together for 4 days. What fraction of the job is left?",
    options: ["7/15", "8/15", "1/3", "11/15"],
    answer: 1,
    explanation: "In one day they do 1/15 + 1/20 = 4/60 + 3/60 = 7/60. In 4 days they do 28/60 = 7/15. Left = 1 − 7/15 = 8/15.",
  },
  {
    difficulty: "Medium",
    question: "A is twice as efficient as B. Together they finish a job in 12 days. In how many days can A alone finish it?",
    options: ["18", "24", "30", "36"],
    answer: 0,
    explanation: "Let B's rate be x, so A's rate is 2x. Together 3x = 1/12, so x = 1/36. A's rate = 2/36 = 1/18, so A alone needs 18 days.",
  },
  {
    difficulty: "Easy",
    question: "If 4 workers can paint a house in 9 days, how many days will 6 workers take, working at the same speed?",
    options: ["5", "6", "7", "13.5"],
    answer: 1,
    explanation: "Total work = 4 × 9 = 36 worker-days. With 6 workers, days needed = 36 / 6 = 6.",
  },
  {
    difficulty: "Hard",
    question: "A can do a job in 10 days, and A and B together can do it in 6 days. A works alone for 4 days and then leaves. In how many more days will B finish the rest?",
    options: ["6", "8", "9", "12"],
    answer: 2,
    explanation: "B's rate = 1/6 − 1/10 = 1/15. A does 4/10 = 2/5 of the job in 4 days, so 3/5 is left. B takes (3/5) × 15 = 9 days.",
  },
].map((q) => ({ category, topic, ...q }));