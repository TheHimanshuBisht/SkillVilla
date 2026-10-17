const category = "Logical Reasoning";
const topic = "Blood Relations";

module.exports = [
  {
    difficulty: "Medium",
    question: "Pointing to a photograph, Ravi says, \"He is the son of my father's only son.\" How is the person in the photograph related to Ravi?",
    options: ["Brother", "Son", "Nephew", "Cousin"],
    answer: 1,
    explanation: "Ravi's father's only son is Ravi himself. So the person in the photograph is Ravi's son.",
  },
  {
    difficulty: "Easy",
    question: "Mohan is the brother of Rita's mother. How is Mohan related to Rita?",
    options: ["Father", "Uncle", "Cousin", "Grandfather"],
    answer: 1,
    explanation: "A mother's brother is a maternal uncle.",
  },
  {
    difficulty: "Medium",
    question: "A is B's sister. C is B's mother. D is C's father. How is A related to D?",
    options: ["Daughter", "Niece", "Grandmother", "Granddaughter"],
    answer: 3,
    explanation: "A and B are siblings, so C is also A's mother. D is C's father, so D is A's grandfather. That makes A the granddaughter of D.",
  },
  {
    difficulty: "Medium",
    question: "Pointing to a woman, a man said, \"Her mother is the only daughter of my mother.\" How is the woman related to the man?",
    options: ["Sister", "Daughter", "Niece", "Cousin"],
    answer: 2,
    explanation: "The only daughter of the man's mother is the man's sister. The woman's mother is his sister, so the woman is his niece.",
  },
  {
    difficulty: "Easy",
    question: "P is the father of Q. Q is the sister of R. How is P related to R?",
    options: ["Uncle", "Father", "Brother", "Grandfather"],
    answer: 1,
    explanation: "Q and R are siblings, so P, the father of Q, is also the father of R.",
  },
  {
    difficulty: "Easy",
    question: "Deepa is the daughter of Anil. Sunita is the mother of Anil. How is Sunita related to Deepa?",
    options: ["Mother", "Aunt", "Grandmother", "Sister"],
    answer: 2,
    explanation: "Sunita is the mother of Deepa's father, so she is Deepa's paternal grandmother.",
  },
  {
    difficulty: "Medium",
    question: "A and B are brothers. C is the father of A. D is the son of B. How is C related to D?",
    options: ["Father", "Uncle", "Grandfather", "Brother"],
    answer: 2,
    explanation: "A and B are brothers, so C is also B's father. D is B's son, which makes C the grandfather of D.",
  },
  {
    difficulty: "Medium",
    question: "Pointing to a boy, Sita said, \"He is the son of the only son of my father's father.\" How is the boy related to Sita?",
    options: ["Cousin", "Brother", "Nephew", "Uncle"],
    answer: 1,
    explanation: "The only son of Sita's father's father is Sita's father. His son is Sita's brother.",
  },
  {
    difficulty: "Medium",
    question: "X is the brother of Y. Y is the sister of Z. Z is the father of W. How is X related to W?",
    options: ["Father", "Uncle", "Brother", "Cousin"],
    answer: 1,
    explanation: "X and Z are both siblings of Y, so X is Z's brother. Z is W's father, so X is W's uncle.",
  },
  {
    difficulty: "Medium",
    question: "Mahesh is the father of Naresh. Naresh is the brother of Pooja. Pooja is the mother of Qadir. How is Mahesh related to Qadir?",
    options: ["Grandfather", "Father", "Uncle", "Brother"],
    answer: 0,
    explanation: "Naresh and Pooja are siblings, so Mahesh is Pooja's father too. Pooja is Qadir's mother, so Mahesh is Qadir's grandfather.",
  },
].map((q) => ({ category, topic, ...q }));