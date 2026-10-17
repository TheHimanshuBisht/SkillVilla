const category = "Quantitative";
const topic = "Ratio and Proportion";

module.exports = [
  {
    difficulty: "Easy",
    question: "₹900 is divided among three people in the ratio 2 : 3 : 4. What is the largest share?",
    options: ["₹300", "₹400", "₹450", "₹500"],
    answer: 1,
    explanation: "Total parts = 2 + 3 + 4 = 9. One part = 900 / 9 = ₹100. The largest share = 4 × 100 = ₹400.",
  },
  {
    difficulty: "Medium",
    question: "If A : B = 3 : 4 and B : C = 8 : 9, what is A : C?",
    options: ["2 : 3", "3 : 4", "1 : 2", "3 : 5"],
    answer: 0,
    explanation: "Make B the same in both ratios. A : B = 3 : 4 = 6 : 8, and B : C = 8 : 9. So A : C = 6 : 9 = 2 : 3.",
  },
  {
    difficulty: "Easy",
    question: "The ratio of boys to girls in a class is 5 : 3. If there are 40 boys, how many girls are there?",
    options: ["20", "24", "30", "32"],
    answer: 1,
    explanation: "5 parts = 40 boys, so one part = 8. Girls = 3 × 8 = 24.",
  },
  {
    difficulty: "Easy",
    question: "Two numbers are in the ratio 3 : 5 and their sum is 96. What is the larger number?",
    options: ["36", "48", "60", "72"],
    answer: 2,
    explanation: "Total parts = 8, so one part = 96 / 8 = 12. The larger number = 5 × 12 = 60.",
  },
  {
    difficulty: "Easy",
    question: "If 12 pencils cost ₹30, how much will 20 pencils cost?",
    options: ["₹45", "₹50", "₹55", "₹60"],
    answer: 1,
    explanation: "One pencil costs 30 / 12 = ₹2.50. So 20 pencils cost 20 × 2.50 = ₹50.",
  },
  {
    difficulty: "Medium",
    question: "What is the mean proportional between 4 and 16?",
    options: ["6", "8", "10", "12"],
    answer: 1,
    explanation: "If x is the mean proportional, 4 / x = x / 16, so x² = 64 and x = 8.",
  },
  {
    difficulty: "Hard",
    question: "The ratio of the ages of a father and his son is 5 : 2. After 10 years the ratio will be 2 : 1. What is the present age of the father?",
    options: ["40", "45", "50", "55"],
    answer: 2,
    explanation: "Let the ages be 5x and 2x. After 10 years: 5x + 10 = 2(2x + 10) = 4x + 20, so x = 10. The father's age is 5 × 10 = 50.",
  },
  {
    difficulty: "Easy",
    question: "A 40-litre mixture contains milk and water in the ratio 3 : 1. How many litres of milk does it contain?",
    options: ["10", "25", "30", "35"],
    answer: 2,
    explanation: "Total parts = 4, so one part = 10 litres. Milk = 3 × 10 = 30 litres.",
  },
  {
    difficulty: "Medium",
    question: "₹1,500 is divided between A and B so that A gets 2/3 of what B gets. How much does A get?",
    options: ["₹500", "₹600", "₹750", "₹900"],
    answer: 1,
    explanation: "A : B = 2 : 3, so the total parts = 5. One part = 1,500 / 5 = ₹300. A gets 2 × 300 = ₹600.",
  },
  {
    difficulty: "Hard",
    question: "Two numbers are in the ratio 4 : 5. If each is increased by 6, the ratio becomes 5 : 6. What is the smaller number?",
    options: ["20", "24", "28", "30"],
    answer: 1,
    explanation: "Let the numbers be 4x and 5x. (4x + 6) / (5x + 6) = 5 / 6, so 24x + 36 = 25x + 30, which gives x = 6. The smaller number = 4 × 6 = 24.",
  },
].map((q) => ({ category, topic, ...q }));