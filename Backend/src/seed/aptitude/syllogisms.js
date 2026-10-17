const category = "Logical Reasoning";
const topic = "Syllogisms";

const options = [
  "Only conclusion I follows",
  "Only conclusion II follows",
  "Both I and II follow",
  "Neither I nor II follows",
];

module.exports = [
  {
    difficulty: "Easy",
    question: "Statements: All cats are animals. All animals are living beings.\nConclusions: I. All cats are living beings. II. All living beings are cats.",
    options,
    answer: 0,
    explanation: "If all cats are animals and all animals are living beings, then all cats are living beings, so I follows. II reverses the statement, which is not allowed.",
  },
  {
    difficulty: "Easy",
    question: "Statements: All pens are books. All books are tables.\nConclusions: I. All pens are tables. II. Some tables are pens.",
    options,
    answer: 2,
    explanation: "I follows by chaining the two statements. If all pens are tables, then at least some tables are pens, so II also follows.",
  },
  {
    difficulty: "Medium",
    question: "Statements: Some doctors are teachers. All teachers are honest.\nConclusions: I. Some doctors are honest. II. All doctors are honest.",
    options,
    answer: 0,
    explanation: "The doctors who are teachers are honest, so some doctors are honest, and I follows. Only some doctors are teachers, so we cannot say that all doctors are honest. II does not follow.",
  },
  {
    difficulty: "Medium",
    question: "Statements: No flower is a stone. All stones are rocks.\nConclusions: I. No flower is a rock. II. Some rocks are not flowers.",
    options,
    answer: 1,
    explanation: "Stones are rocks, and no stone is a flower, so some rocks (the stones) are not flowers. II follows. Flowers could still be rocks of another kind, so I does not follow.",
  },
  {
    difficulty: "Medium",
    question: "Statements: Some birds are fish. Some fish are trees.\nConclusions: I. Some birds are trees. II. Some trees are fish.",
    options,
    answer: 1,
    explanation: "Two \"some\" statements give no link between birds and trees, so I does not follow. \"Some fish are trees\" can be turned around to \"Some trees are fish\", so II follows.",
  },
  {
    difficulty: "Medium",
    question: "Statements: All roses are flowers. Some flowers are red.\nConclusions: I. Some roses are red. II. All roses are red.",
    options,
    answer: 3,
    explanation: "The red flowers may or may not be roses, so we cannot say that any rose is red. Neither conclusion follows.",
  },
  {
    difficulty: "Medium",
    question: "Statements: All A are B. No B is C.\nConclusions: I. No A is C. II. No C is A.",
    options,
    answer: 2,
    explanation: "All A are B, and no B is C, so no A is C, and I follows. \"No A is C\" can be reversed to \"No C is A\", so II follows too.",
  },
  {
    difficulty: "Medium",
    question: "Statements: All students are intelligent. Some intelligent people are lazy.\nConclusions: I. Some students are lazy. II. Some lazy people are intelligent.",
    options,
    answer: 1,
    explanation: "The lazy intelligent people may not be students, so I does not follow. \"Some intelligent people are lazy\" can be turned around to \"Some lazy people are intelligent\", so II follows.",
  },
  {
    difficulty: "Hard",
    question: "Statements: No teacher is a student. Some students are players.\nConclusions: I. Some players are not teachers. II. No player is a teacher.",
    options,
    answer: 0,
    explanation: "The players who are students cannot be teachers, so some players are not teachers, and I follows. Other players who are not students could still be teachers, so II does not follow.",
  },
  {
    difficulty: "Medium",
    question: "Statements: All books are pages. All pages are papers. Some papers are files.\nConclusions: I. Some files are papers. II. Some books are files.",
    options,
    answer: 0,
    explanation: "\"Some papers are files\" can be turned around to \"Some files are papers\", so I follows. The files may be papers that are not books, so II does not follow.",
  },
].map((q) => ({ category, topic, ...q }));