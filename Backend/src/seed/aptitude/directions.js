const category = "Logical Reasoning";
const topic = "Directions";

module.exports = [
  {
    difficulty: "Easy",
    question: "A man walks 5 km north and then 5 km east. In which direction is he from his starting point?",
    options: ["East", "North-East", "South-East", "North-West"],
    answer: 1,
    explanation: "He has moved north and east, so he is to the north-east of the starting point.",
  },
  {
    difficulty: "Easy",
    question: "Rahul is facing north. He turns 90° to his right. Which direction is he facing now?",
    options: ["West", "East", "South", "North"],
    answer: 1,
    explanation: "A right turn from north points to the east.",
  },
  {
    difficulty: "Easy",
    question: "A person is facing east. He turns left, and then left again. Which direction is he facing now?",
    options: ["North", "South", "West", "East"],
    answer: 2,
    explanation: "East → left turn → North → left turn → West.",
  },
  {
    difficulty: "Medium",
    question: "A person walks 3 km north and then 4 km east. What is the shortest distance from his starting point?",
    options: ["7 km", "5 km", "6 km", "4 km"],
    answer: 1,
    explanation: "The two walks form a right-angled triangle. Distance = √(3² + 4²) = √25 = 5 km.",
  },
  {
    difficulty: "Medium",
    question: "In the morning, Ravi stands facing the Sun. In which direction does his shadow fall?",
    options: ["East", "West", "North", "South"],
    answer: 1,
    explanation: "In the morning the Sun is in the east. Ravi faces east, and his shadow falls behind him, which is west.",
  },
  {
    difficulty: "Medium",
    question: "A man walks 8 km south, then turns left and walks 6 km. How far is he from his starting point?",
    options: ["14 km", "12 km", "10 km", "8 km"],
    answer: 2,
    explanation: "Facing south, a left turn points east. So he has gone 8 km south and 6 km east. Distance = √(8² + 6²) = √100 = 10 km.",
  },
  {
    difficulty: "Medium",
    question: "Rita walks 10 m west, then turns right and walks 10 m, then turns right again and walks 10 m. In which direction is she from her starting point?",
    options: ["South", "North", "East", "West"],
    answer: 1,
    explanation: "Facing west, a right turn points north, so she walks 10 m north. Another right turn points east, so she walks 10 m east. The west and east walks cancel out, which leaves her 10 m north of the start.",
  },
  {
    difficulty: "Medium",
    question: "A is to the north of B, and C is to the east of B. In which direction is A with respect to C?",
    options: ["North-East", "North-West", "South-West", "South-East"],
    answer: 1,
    explanation: "Take B as the centre. A is north of B and C is east of B. From C, A is to the north and also to the west, so A is north-west of C.",
  },
  {
    difficulty: "Hard",
    question: "A man is facing north-west. He turns 90° clockwise and then 180° anticlockwise. Which direction is he facing now?",
    options: ["South-East", "North-East", "South-West", "North-West"],
    answer: 2,
    explanation: "North-west turned 90° clockwise is north-east. Turning 180° anticlockwise from north-east turns him fully around, to south-west.",
  },
  {
    difficulty: "Medium",
    question: "Two friends start from the same point. One walks 12 km east and the other walks 5 km north. What is the distance between them?",
    options: ["17 km", "15 km", "13 km", "11 km"],
    answer: 2,
    explanation: "Their paths make a right angle. Distance = √(12² + 5²) = √169 = 13 km.",
  },
].map((q) => ({ category, topic, ...q }));