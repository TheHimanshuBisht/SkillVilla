const category = "Verbal";
const topic = "Idioms and Phrases";

module.exports = [
  {
    difficulty: "Easy",
    question: "What does the idiom \"Break the ice\" mean?",
    options: [
      "To break something frozen",
      "To start a conversation in an awkward situation",
      "To end a friendship",
      "To make a mistake",
    ],
    answer: 1,
    explanation: "To break the ice means to make people feel relaxed when they first meet, usually by starting a conversation.",
  },
  {
    difficulty: "Easy",
    question: "What does the idiom \"A piece of cake\" mean?",
    options: ["Something very easy", "A small gift", "A sweet dish", "Something very costly"],
    answer: 0,
    explanation: "A piece of cake means something that is very easy to do.",
  },
  {
    difficulty: "Easy",
    question: "What does the idiom \"Once in a blue moon\" mean?",
    options: ["Very often", "Every night", "Very rarely", "At midnight"],
    answer: 2,
    explanation: "Once in a blue moon means something that happens very rarely.",
  },
  {
    difficulty: "Medium",
    question: "What does the idiom \"Hit the nail on the head\" mean?",
    options: [
      "To make a loud noise",
      "To hurt oneself",
      "To say or do exactly the right thing",
      "To waste time",
    ],
    answer: 2,
    explanation: "To hit the nail on the head means to be exactly right about something.",
  },
  {
    difficulty: "Easy",
    question: "What does the idiom \"Cost an arm and a leg\" mean?",
    options: ["To cause an injury", "To be very expensive", "To be very cheap", "To be free of cost"],
    answer: 1,
    explanation: "Cost an arm and a leg means to be very expensive.",
  },
  {
    difficulty: "Medium",
    question: "What does the idiom \"Let the cat out of the bag\" mean?",
    options: ["To lose a pet", "To hide the truth", "To start a fight", "To reveal a secret by mistake"],
    answer: 3,
    explanation: "To let the cat out of the bag means to reveal a secret, usually by accident.",
  },
  {
    difficulty: "Easy",
    question: "What does the idiom \"Under the weather\" mean?",
    options: ["Standing in the rain", "Feeling slightly ill", "Very happy", "Working outdoors"],
    answer: 1,
    explanation: "Under the weather means feeling slightly ill or unwell.",
  },
  {
    difficulty: "Medium",
    question: "What does the idiom \"Burn the midnight oil\" mean?",
    options: ["To waste fuel", "To waste time", "To work late into the night", "To wake up early"],
    answer: 2,
    explanation: "To burn the midnight oil means to work or study late into the night.",
  },
  {
    difficulty: "Medium",
    question: "What does the idiom \"Bite the bullet\" mean?",
    options: [
      "To eat quickly",
      "To accept something unpleasant and face it bravely",
      "To get angry",
      "To run away from danger",
    ],
    answer: 1,
    explanation: "To bite the bullet means to face a difficult or unpleasant situation with courage.",
  },
  {
    difficulty: "Hard",
    question: "What does the idiom \"A blessing in disguise\" mean?",
    options: [
      "A well-hidden gift",
      "A prayer for help",
      "Something that seems bad but turns out to be good",
      "A false promise",
    ],
    answer: 2,
    explanation: "A blessing in disguise is something that looks like bad luck at first but later turns out to be good.",
  },
].map((q) => ({ category, topic, ...q }));
