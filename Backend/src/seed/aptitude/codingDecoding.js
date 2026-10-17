const category = "Logical Reasoning";
const topic = "Coding-Decoding";

module.exports = [
  {
    difficulty: "Easy",
    question: "If CAT is written as DBU, how is DOG written?",
    options: ["DPH", "EPH", "EOH", "CNF"],
    answer: 1,
    explanation: "Each letter moves one step forward: C→D, A→B, T→U. So D→E, O→P, G→H, which gives EPH.",
  },
  {
    difficulty: "Easy",
    question: "If MANGO is written as NBOHP, how is APPLE written?",
    options: ["BPQMF", "BQQLF", "BQQMF", "ZOOKD"],
    answer: 2,
    explanation: "Each letter moves one step forward: M→N, A→B, N→O, G→H, O→P. So A→B, P→Q, P→Q, L→M, E→F, which gives BQQMF.",
  },
  {
    difficulty: "Medium",
    question: "If TABLE is written as UCEPJ, how is CHAIR written in the same code?",
    options: ["DJCMW", "DJDMW", "DKDMW", "DJDNW"],
    answer: 1,
    explanation: "The letters move forward by 1, 2, 3, 4, 5 in order (T+1=U, A+2=C, B+3=E, L+4=P, E+5=J). Applying this to CHAIR: C+1=D, H+2=J, A+3=D, I+4=M, R+5=W, which gives DJDMW.",
  },
  {
    difficulty: "Easy",
    question: "If A = 1, B = 2, C = 3 and so on, what is the sum of the values of the letters in the word FACE?",
    options: ["13", "14", "15", "16"],
    answer: 2,
    explanation: "F = 6, A = 1, C = 3, E = 5. The sum = 6 + 1 + 3 + 5 = 15.",
  },
  {
    difficulty: "Medium",
    question: "If ROSE is written as TQUG, how is LILY written in the same code?",
    options: ["MJMZ", "NJNA", "NKNA", "NKMA"],
    answer: 2,
    explanation: "Each letter moves two steps forward: R→T, O→Q, S→U, E→G. So L→N, I→K, L→N, Y→A (after Z it goes back to A), which gives NKNA.",
  },
  {
    difficulty: "Easy",
    question: "If BOOK is written as KOOB, how is STUDY written in the same code?",
    options: ["YUDTS", "YDUTS", "YDTUS", "STDUY"],
    answer: 1,
    explanation: "The word is written backwards. STUDY reversed is YDUTS.",
  },
  {
    difficulty: "Medium",
    question: "In a certain code, A is written as Z, B as Y, C as X and so on. How is BAD written in this code?",
    options: ["YXW", "ZYX", "YZV", "YZW"],
    answer: 3,
    explanation: "The alphabet is reversed: A↔Z, B↔Y, C↔X, D↔W. So B→Y, A→Z, D→W, which gives YZW.",
  },
  {
    difficulty: "Hard",
    question: "If CLOUD is written as EMQVF, how is PLANT written in the same code?",
    options: ["RLCOV", "RMCOV", "SMCOV", "RMCNV"],
    answer: 1,
    explanation: "The letters move forward alternately by 2 and 1 (C+2=E, L+1=M, O+2=Q, U+1=V, D+2=F). For PLANT: P+2=R, L+1=M, A+2=C, N+1=O, T+2=V, which gives RMCOV.",
  },
  {
    difficulty: "Medium",
    question: "If TRAIN is written as GIZRM, how is BUS written in the same code?",
    options: ["YGH", "YFH", "XFH", "YFI"],
    answer: 1,
    explanation: "Each letter is replaced by its opposite in the alphabet (A↔Z, B↔Y and so on), so the two positions add up to 27. B(2)→Y(25), U(21)→F(6), S(19)→H(8), which gives YFH.",
  },
  {
    difficulty: "Easy",
    question: "In a certain language, a pen is called a ball, a ball is called a book, and a book is called a bag. What will a student use to write?",
    options: ["Pen", "Ball", "Book", "Bag"],
    answer: 1,
    explanation: "A student writes with a pen, and a pen is called a ball in this language. So the answer is ball.",
  },
].map((q) => ({ category, topic, ...q }));