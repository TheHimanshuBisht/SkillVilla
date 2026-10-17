const category = "Quantitative";
const topic = "Profit and Loss";

module.exports = [
  {
    difficulty: "Easy",
    question: "An item bought for ₹500 is sold for ₹600. What is the profit percentage?",
    options: ["10%", "15%", "20%", "25%"],
    answer: 2,
    explanation: "Profit = 600 − 500 = ₹100. Profit % = (100 / 500) × 100 = 20%.",
  },
  {
    difficulty: "Easy",
    question: "A bag bought for ₹800 is sold at a loss of 10%. What is the selling price?",
    options: ["₹700", "₹720", "₹730", "₹880"],
    answer: 1,
    explanation: "Selling price = 90% of 800 = 0.9 × 800 = ₹720.",
  },
  {
    difficulty: "Medium",
    question: "A shopkeeper sells an article for ₹1,320 and makes a profit of 10%. What is the cost price?",
    options: ["₹1,188", "₹1,200", "₹1,250", "₹1,452"],
    answer: 1,
    explanation: "Selling price = 110% of cost price. So cost price = 1,320 / 1.1 = ₹1,200.",
  },
  {
    difficulty: "Medium",
    question: "An article sold for ₹450 gives a loss of 10%. What is its cost price?",
    options: ["₹495", "₹500", "₹540", "₹405"],
    answer: 1,
    explanation: "Selling price = 90% of cost price. So cost price = 450 / 0.9 = ₹500.",
  },
  {
    difficulty: "Medium",
    question: "A trader marks a product 25% above its cost price and then gives a 10% discount. What is his profit percentage?",
    options: ["12.5%", "15%", "10%", "17.5%"],
    answer: 0,
    explanation: "Let the cost price be 100. Marked price = 125. After a 10% discount, selling price = 125 × 0.9 = 112.5. Profit = 12.5%.",
  },
  {
    difficulty: "Hard",
    question: "The cost price of 10 articles is equal to the selling price of 8 articles. What is the profit percentage?",
    options: ["20%", "25%", "30%", "12.5%"],
    answer: 1,
    explanation: "Let the selling price of 1 article be ₹1. Then 10 × CP = 8, so CP = ₹0.8. Profit = 1 − 0.8 = ₹0.2. Profit % = (0.2 / 0.8) × 100 = 25%.",
  },
  {
    difficulty: "Easy",
    question: "A person buys 12 pens for ₹120 and sells each pen for ₹12. What is the result?",
    options: ["Profit of 10%", "Profit of 20%", "Loss of 20%", "No profit, no loss"],
    answer: 1,
    explanation: "Cost of 1 pen = 120 / 12 = ₹10. Selling price = ₹12. Profit = ₹2, which is (2 / 10) × 100 = 20%.",
  },
  {
    difficulty: "Hard",
    question: "Two articles are each sold for ₹1,000. One is sold at a 20% profit and the other at a 20% loss. What is the overall result?",
    options: ["No profit, no loss", "4% loss", "4% profit", "2% loss"],
    answer: 1,
    explanation: "Cost of the first = 1,000 / 1.2 ≈ ₹833.33. Cost of the second = 1,000 / 0.8 = ₹1,250. Total cost ≈ ₹2,083.33, total sale = ₹2,000. Loss ≈ ₹83.33, which is 4% of the cost.",
  },
  {
    difficulty: "Easy",
    question: "The marked price of a jacket is ₹2,000. A discount of 15% is given. What is the selling price?",
    options: ["₹1,700", "₹1,800", "₹1,600", "₹1,850"],
    answer: 0,
    explanation: "Discount = 15% of 2,000 = ₹300. Selling price = 2,000 − 300 = ₹1,700.",
  },
  {
    difficulty: "Medium",
    question: "By selling an item for ₹960, a seller gains 20%. At what price should he sell it to gain 30%?",
    options: ["₹1,000", "₹1,040", "₹1,080", "₹1,100"],
    answer: 1,
    explanation: "Cost price = 960 / 1.2 = ₹800. For a 30% gain, selling price = 800 × 1.3 = ₹1,040.",
  },
].map((q) => ({ category, topic, ...q }));