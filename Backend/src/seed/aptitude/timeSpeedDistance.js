const category = "Quantitative";
const topic = "Time Speed and Distance";

module.exports = [
  {
    difficulty: "Easy",
    question: "A car travels 150 km in 3 hours. What is its speed?",
    options: ["45 km/h", "50 km/h", "55 km/h", "60 km/h"],
    answer: 1,
    explanation: "Speed = distance / time = 150 / 3 = 50 km/h.",
  },
  {
    difficulty: "Easy",
    question: "What is 72 km/h in metres per second?",
    options: ["15 m/s", "18 m/s", "20 m/s", "25 m/s"],
    answer: 2,
    explanation: "To convert km/h to m/s, multiply by 5/18. 72 × 5/18 = 20 m/s.",
  },
  {
    difficulty: "Medium",
    question: "A train 120 m long crosses a pole in 6 seconds. What is its speed in km/h?",
    options: ["60 km/h", "72 km/h", "80 km/h", "90 km/h"],
    answer: 1,
    explanation: "Crossing a pole means covering its own length. Speed = 120 / 6 = 20 m/s. In km/h: 20 × 18/5 = 72 km/h.",
  },
  {
    difficulty: "Medium",
    question: "A person walks at 5 km/h for 2 hours and then at 4 km/h for 3 hours. What is the average speed for the whole journey?",
    options: ["4.4 km/h", "4.5 km/h", "4.6 km/h", "4.8 km/h"],
    answer: 0,
    explanation: "Distance = 5 × 2 + 4 × 3 = 10 + 12 = 22 km. Time = 5 hours. Average speed = 22 / 5 = 4.4 km/h.",
  },
  {
    difficulty: "Medium",
    question: "A man goes to a place at 40 km/h and returns along the same route at 60 km/h. What is his average speed for the whole trip?",
    options: ["48 km/h", "50 km/h", "52 km/h", "45 km/h"],
    answer: 0,
    explanation: "For equal distances, average speed = 2xy / (x + y) = (2 × 40 × 60) / 100 = 48 km/h.",
  },
  {
    difficulty: "Medium",
    question: "A train 150 m long passes a platform 250 m long in 20 seconds. What is the speed of the train?",
    options: ["15 m/s", "18 m/s", "20 m/s", "25 m/s"],
    answer: 2,
    explanation: "Distance covered = train length + platform length = 150 + 250 = 400 m. Speed = 400 / 20 = 20 m/s.",
  },
  {
    difficulty: "Easy",
    question: "Two trains move towards each other at 60 km/h and 40 km/h. What is their relative speed?",
    options: ["20 km/h", "50 km/h", "100 km/h", "120 km/h"],
    answer: 2,
    explanation: "When two objects move towards each other, their speeds add. 60 + 40 = 100 km/h.",
  },
  {
    difficulty: "Medium",
    question: "A boat's speed in still water is 10 km/h and the stream flows at 2 km/h. How long does it take to go 36 km downstream?",
    options: ["2 hours", "3 hours", "3.6 hours", "4 hours"],
    answer: 1,
    explanation: "Downstream speed = 10 + 2 = 12 km/h. Time = 36 / 12 = 3 hours.",
  },
  {
    difficulty: "Easy",
    question: "A person covers a distance in 6 hours at 12 km/h. At what speed must he travel to cover the same distance in 4 hours?",
    options: ["16 km/h", "18 km/h", "20 km/h", "24 km/h"],
    answer: 1,
    explanation: "Distance = 12 × 6 = 72 km. Speed needed = 72 / 4 = 18 km/h.",
  },
  {
    difficulty: "Hard",
    question: "Two trains, each 100 m long, run in opposite directions at 36 km/h and 54 km/h. How long do they take to cross each other?",
    options: ["6 seconds", "8 seconds", "10 seconds", "12 seconds"],
    answer: 1,
    explanation: "Relative speed = 36 + 54 = 90 km/h = 90 × 5/18 = 25 m/s. Total distance = 100 + 100 = 200 m. Time = 200 / 25 = 8 seconds.",
  },
].map((q) => ({ category, topic, ...q }));