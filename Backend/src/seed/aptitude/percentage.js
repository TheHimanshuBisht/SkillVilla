const category = "Quantitative";
const topic = "Percentages";

module.exports = [
  {
    difficulty: "Easy",
    question: "What is 15% of 240?",
    options: ["24", "30", "36", "40"],
    answer: 2,
    explanation: "15% of 240 = (15 / 100) × 240 = 36.",
  },
  {
    difficulty: "Medium",
    question: "A number increased by 20% becomes 180. What is the number?",
    options: ["144", "150", "160", "156"],
    answer: 1,
    explanation: "Let the number be x. x × 1.20 = 180, so x = 180 / 1.2 = 150.",
  },
  {
    difficulty: "Medium",
    question: "In an exam, 40% of the students failed. If 180 students passed, how many students appeared?",
    options: ["250", "300", "360", "450"],
    answer: 1,
    explanation: "Passed students are 60% of the total. 60% of x = 180, so x = 180 / 0.6 = 300.",
  },
  {
    difficulty: "Easy",
    question: "The price of an item rises from ₹400 to ₹500. What is the percentage increase?",
    options: ["20%", "25%", "30%", "12.5%"],
    answer: 1,
    explanation: "Increase = 500 − 400 = ₹100. Percentage increase = (100 / 400) × 100 = 25%.",
  },
  {
    difficulty: "Medium",
    question: "A's salary is 25% more than B's. By what percent is B's salary less than A's?",
    options: ["25%", "20%", "15%", "30%"],
    answer: 1,
    explanation: "Let B = 100, so A = 125. B is less than A by 25 out of 125, which is (25 / 125) × 100 = 20%.",
  },
  {
    difficulty: "Easy",
    question: "If 30% of a number is 90, what is 50% of the number?",
    options: ["120", "135", "150", "180"],
    answer: 2,
    explanation: "30% of x = 90, so x = 300. Then 50% of 300 = 150.",
  },
  {
    difficulty: "Medium",
    question: "A town has a population of 10,000. It increases by 10% every year. What will the population be after 2 years?",
    options: ["12,000", "12,100", "12,200", "11,000"],
    answer: 1,
    explanation: "After year 1: 10,000 × 1.1 = 11,000. After year 2: 11,000 × 1.1 = 12,100.",
  },
  {
    difficulty: "Easy",
    question: "A student scores 45 out of 60 marks. What is the percentage?",
    options: ["65%", "70%", "75%", "80%"],
    answer: 2,
    explanation: "Percentage = (45 / 60) × 100 = 75%.",
  },
  {
    difficulty: "Medium",
    question: "After a discount of 20%, the price of a shirt is ₹640. What was the original price?",
    options: ["₹768", "₹800", "₹820", "₹850"],
    answer: 1,
    explanation: "The price after discount is 80% of the original. 0.8 × x = 640, so x = 640 / 0.8 = ₹800.",
  },
  {
    difficulty: "Medium",
    question: "The length of a rectangle is increased by 20% and its breadth is decreased by 10%. What is the change in its area?",
    options: ["8% increase", "10% increase", "2% increase", "No change"],
    answer: 0,
    explanation: "New area = 1.2 × 0.9 = 1.08 times the old area. So the area increases by 8%.",
  },
].map((q) => ({ category, topic, ...q }));