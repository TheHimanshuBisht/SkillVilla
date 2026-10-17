export const askMeCategories = [
  {
    name: "Using SkillVilla",
    questions: [
      {
        id: "start",
        question: "How do I start learning?",
        answer:
          "Open My Learning, choose a course (HTML, CSS, JavaScript or English Communication) and open lesson 1. Read it, then click Mark as complete so your progress is saved.",
      },
      {
        id: "streak",
        question: "How does the day streak work?",
        answer:
          "Your streak is the number of days in a row on which you completed at least one lesson. If you haven't studied yet today, yesterday's streak still shows, but missing a whole day starts it again from zero. Only completed lessons count.",
      },
      {
        id: "mock",
        question: "How do mock tests work?",
        answer:
          "Pick a test and a countdown starts. Answer in any order, and use the numbered boxes to jump between questions. When you submit, or when time runs out, the test is graded automatically. Each correct answer is 1 mark with no negative marking, and you get a topic-wise result and a full review with explanations.",
      },
      {
        id: "remarks",
        question: "What do the remarks on the Progress page mean?",
        answer:
          "Each aptitude topic gets a remark from your accuracy: below 50% is Needs improvement, 50% to 75% is Getting better, and above 75% is Strong. A topic needs at least 5 answered questions before it gets a remark.",
      },
      {
        id: "grammar",
        question: "How does the Grammar Assistant work?",
        answer:
          "Type a sentence of up to 300 characters and it returns a corrected version with a short reason. You get 15 checks per day. Please don't type personal information, and double-check important sentences, since AI can make mistakes.",
      },
    ],
  },
  {
    name: "Aptitude tips",
    questions: [
      {
        id: "prep",
        question: "How should I prepare for aptitude tests?",
        answer:
          "Practise a little every day. Start with one topic at a time, like Percentages or Time and Work, then move to timed mock tests. After each test, read the explanations for your wrong answers and keep a small notebook of formulas.",
      },
      {
        id: "percent",
        question: "How do I solve percentage questions faster?",
        answer:
          "Learn the common fractions as percentages: 1/2 = 50%, 1/4 = 25%, 1/5 = 20% and 1/8 = 12.5%. Find 10% first and build up from it. Treat an increase of 20% as multiplying by 1.2, and a decrease of 20% as multiplying by 0.8.",
      },
      {
        id: "time",
        question: "How do I manage time in a mock test?",
        answer:
          "Aim for about one minute per question. If a question looks long, skip it and come back to it using the numbered boxes. Save the last few minutes to check the questions you left unanswered.",
      },
      {
        id: "mistakes",
        question: "How do I learn from my wrong answers?",
        answer:
          "Read the explanation, then try the same question again after a day. Note which topic it came from and practise five more questions from that topic. The Progress page shows which topics need the most work.",
      },
    ],
  },
  {
    name: "Interview & English",
    questions: [
      {
        id: "intro",
        question: "How do I introduce myself in an interview?",
        answer:
          "Use four parts and keep it to 60 to 90 seconds: who you are and your education, your main skills, one project you built, and what you are looking for. Practise it aloud so it sounds natural, not memorised.",
      },
      {
        id: "project",
        question: "How do I explain my project in an interview?",
        answer:
          "Say what problem it solves, the tools you used, which parts you built yourself, one problem you faced and how you solved it, and what you would improve next. Keep it under about two minutes, and only claim what you can explain.",
      },
      {
        id: "english",
        question: "How can I improve my English communication?",
        answer:
          "Read a short English article every day, write three to five sentences about your day and check them in the Grammar Assistant, and speak aloud for a few minutes. Finish the English Communication course for the key grammar rules.",
      },
      {
        id: "unknown",
        question: "What should I say if I don't know an answer?",
        answer:
          "Be honest. Say you are not sure, then explain what you do know about it and how you would find out. Never make up an answer, because interviewers can usually tell.",
      },
    ],
  },
  {
    name: "Web basics",
    questions: [
      {
        id: "trio",
        question: "HTML, CSS and JavaScript: what is the difference?",
        answer:
          "HTML builds the structure of a page, CSS styles it, and JavaScript adds behaviour, such as reacting to clicks and loading data.",
      },
      {
        id: "letconst",
        question: "What is the difference between let and const?",
        answer:
          "A variable made with let can be reassigned later, but one made with const cannot. Use const by default, and let only when the value will change.",
      },
      {
        id: "rest",
        question: "What is a REST API?",
        answer:
          "It's a way for the frontend to talk to the backend using URLs and HTTP methods: GET reads data, POST creates it, PUT updates it and DELETE removes it. The data usually travels as JSON.",
      },
      {
        id: "jwt",
        question: "What is a JWT?",
        answer:
          "A JSON Web Token is a signed token the server gives you after login. You send it with later requests to prove who you are. The signature stops anyone from editing it, but anyone can read what's inside, so never put a password in it.",
      },
    ],
  },
];