require("dotenv").config();
const mongoose = require("mongoose");
const Course = require("../models/course.model");
const Lesson = require("../models/lesson.model");

const courses = [
  { title: "HTML", slug: "html", category: "Web", description: "Build the structure of web pages.", icon: "🌐", order: 1 },
  { title: "CSS", slug: "css", category: "Web", description: "Style and lay out your pages.", icon: "🎨", order: 2 },
  { title: "JavaScript", slug: "javascript", category: "Programming", description: "Add logic and interactivity.", icon: "💻", order: 3 },
  { title: "English Communication", slug: "english", category: "English", description: "Essential grammar for clear communication.", icon: "🗣️", order: 4 },
];

const lessons = {
    html: [
    {
      title: "What is HTML?",
      content: `HTML (HyperText Markup Language) is used to build the structure of a web page. It uses tags to tell the browser what each part is, such as a heading, a paragraph, an image or a link.`,
      codeExample: `<!DOCTYPE html>
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1>Hello</h1>
  </body>
</html>`,
      keyPoints: ["HTML describes structure, not style", "Tags usually come in pairs: opening and closing", "Everything visible goes inside <body>"],
    },
    {
      title: "Headings and Paragraphs",
      content: `Headings go from h1 (most important) to h6 (least important). Use one h1 per page. Paragraphs are written with the p tag.`,
      codeExample: `<h1>Main title</h1>
<h2>Section title</h2>
<p>This is a paragraph.</p>`,
      keyPoints: ["h1 to h6 define heading levels", "Use p for normal text", "Headings help both readers and search engines"],
    },
    {
      title: "Text Formatting",
      content: `HTML has tags that change how text looks and, more importantly, what it means. Use strong for important text, em for emphasis, br for a line break and hr for a horizontal line.`,
      codeExample: `<p>This is <strong>very important</strong>.</p>
<p>This is <em>emphasised</em>.</p>
<p>Line one<br>Line two</p>
<hr>`,
      keyPoints: ["strong marks important text (usually bold)", "em marks emphasis (usually italic)", "br and hr have no closing tag"],
    },
    {
      title: "Links",
      content: `Links connect pages. The a (anchor) tag uses the href attribute to say where the link goes. Add target="_blank" to open the link in a new tab.`,
      codeExample: `<a href="https://example.com">Visit Example</a>

<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  Open in a new tab
</a>

<a href="about.html">About page</a>`,
      keyPoints: ["href holds the destination", "The text between the tags is what the user clicks", "Use rel=\"noopener noreferrer\" with target=\"_blank\" for safety"],
    },
    {
      title: "Images",
      content: `The img tag shows an image. It has no closing tag. The src attribute gives the image location, and alt gives a text description that screen readers read and that shows if the image fails to load.`,
      codeExample: `<img src="photo.jpg" alt="A student studying" width="300">`,
      keyPoints: ["src is the image location", "Always add alt text", "img is a void element (no closing tag)"],
    },
    {
      title: "Lists",
      content: `Use ul for an unordered (bullet) list and ol for an ordered (numbered) list. Each item goes inside an li tag.`,
      codeExample: `<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>

<ol>
  <li>Open the editor</li>
  <li>Write the code</li>
  <li>Save and refresh</li>
</ol>`,
      keyPoints: ["ul = bullets, ol = numbers", "Every item uses li", "Lists can be nested inside li"],
    },
    {
      title: "Tables",
      content: `Tables show data in rows and columns. table is the container, tr is a row, th is a header cell and td is a data cell. Use tables for data, not for page layout.`,
      codeExample: `<table>
  <tr>
    <th>Name</th>
    <th>Score</th>
  </tr>
  <tr>
    <td>Asha</td>
    <td>85</td>
  </tr>
  <tr>
    <td>Ravi</td>
    <td>72</td>
  </tr>
</table>`,
      keyPoints: ["tr = row, th = header cell, td = data cell", "Tables are for data, not layout", "Each row should have the same number of cells"],
    },
    {
      title: "Forms and Inputs",
      content: `Forms collect information from users. The form tag wraps the fields. Use label to name each input, input for typing, and button to submit. The name attribute identifies the data when it is sent.`,
      codeExample: `<form>
  <label for="email">Email</label>
  <input type="email" id="email" name="email" required>

  <label for="password">Password</label>
  <input type="password" id="password" name="password" required>

  <button type="submit">Login</button>
</form>`,
      keyPoints: ["The label's for matches the input's id", "type sets the kind of input: text, email, password, number", "required stops the form from submitting if the field is empty"],
    },
    {
      title: "Semantic HTML",
      content: `Semantic tags describe the meaning of each part of a page. They help screen readers, search engines and other developers. Common ones are header, nav, main, section, article, aside and footer.`,
      codeExample: `<header>
  <h1>My Website</h1>
  <nav>
    <a href="/">Home</a>
  </nav>
</header>

<main>
  <section>
    <h2>About</h2>
    <p>Welcome to my site.</p>
  </section>
</main>

<footer>
  <p>My Website</p>
</footer>`,
      keyPoints: ["Prefer semantic tags over many div tags", "Use main once per page", "Semantic HTML improves accessibility and SEO"],
    },
    {
      title: "Div, Span, Class and ID",
      content: `div is a block container that starts on a new line, and span is an inline container for part of a line. Neither has meaning on its own, so they are used for grouping and styling. Use class to style many elements the same way, and id to name one unique element.`,
      codeExample: `<div class="card">
  <h3>Course</h3>
  <p>Learn <span class="highlight">HTML</span> today.</p>
</div>

<div id="main-banner">Welcome</div>`,
      keyPoints: ["div is block, span is inline", "A class can be reused, an id must be unique", "CSS and JavaScript find elements using class and id"],
    },
  ], 
    css: [
    {
      title: "What is CSS?",
      content: `CSS (Cascading Style Sheets) controls how HTML elements look: colors, fonts, spacing and layout. HTML builds the structure, and CSS makes it look good.

There are three ways to add CSS:
1. Inline: inside the style attribute of one element.
2. Internal: inside a style tag in the head of the page.
3. External: in a separate .css file linked with a link tag. This is the best way for real projects, because one file can style many pages.`,
      codeExample: `/* style.css (external file) */
p {
  color: blue;
  font-size: 18px;
}

<!-- In your HTML head -->
<link rel="stylesheet" href="style.css">

<!-- Inline example -->
<p style="color: red;">Red text</p>`,
      keyPoints: ["CSS styles the HTML", "A rule has a selector and declarations", "Each declaration is property: value;", "Prefer an external stylesheet"],
    },
    {
      title: "CSS Selectors",
      content: `A selector chooses which elements a rule applies to. You can select by tag name, by class (starting with a dot) or by id (starting with a hash). You can also group selectors with a comma, or select an element inside another one with a space.`,
      codeExample: `/* tag selector */
h1 { color: red; }

/* class selector */
.card { padding: 16px; }

/* id selector */
#header { background: black; }

/* group selector */
h1, h2, h3 { font-family: Arial, sans-serif; }

/* descendant selector: p inside .card */
.card p { color: gray; }`,
      keyPoints: ["Tag selector: p", "Class selector: .name (reusable)", "Id selector: #name (use once per page)", "A space selects elements inside another element"],
    },
    {
      title: "Colors and Backgrounds",
      content: `Colors can be written as a name (red), a hex code (#ff0000), or rgb values. The rgba form adds transparency. Use color for text and background-color for the background of an element.`,
      codeExample: `body {
  background-color: #f4f5fb;
}

h1 {
  color: rgb(79, 70, 229);
}

.overlay {
  background-color: rgba(0, 0, 0, 0.5);
}`,
      keyPoints: ["color changes the text color", "background-color changes the background", "Hex codes look like #4f46e5", "The last number in rgba is transparency from 0 to 1"],
    },
    {
      title: "Text and Fonts",
      content: `CSS controls how text looks. Use font-family to choose the font, font-size for the size, font-weight for boldness, line-height for the space between lines and text-align to align the text. Units like px are fixed, while rem scales with the user's browser settings.`,
      codeExample: `body {
  font-family: "Segoe UI", Arial, sans-serif;
  font-size: 16px;
  line-height: 1.6;
}

h1 {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
}

a {
  text-decoration: none;
}`,
      keyPoints: ["Always give fallback fonts in font-family", "line-height around 1.5 makes text easier to read", "text-align: center centers text", "rem is relative to the root font size"],
    },
    {
      title: "The Box Model",
      content: `Every HTML element is a box made of four layers, from inside to outside: content, padding (space inside the border), border, and margin (space outside the border). Setting box-sizing to border-box makes the width include the padding and border, which makes sizing much easier.`,
      codeExample: `* {
  box-sizing: border-box;
}

.card {
  width: 300px;
  padding: 20px;
  border: 1px solid #d1d5db;
  margin: 16px;
}`,
      keyPoints: ["Content, padding, border, margin", "Padding is inside the border, margin is outside", "Use box-sizing: border-box on everything", "margin: 0 auto centers a block with a fixed width"],
    },
    {
      title: "Display and Position",
      content: `The display property decides how an element behaves. Block elements (like div and p) start on a new line and take the full width. Inline elements (like span and a) stay in the line. Use display: none to hide an element.

The position property decides where an element sits: static (default), relative (offset from its normal place), absolute (placed inside the nearest positioned parent) and fixed (stays on the screen while scrolling).`,
      codeExample: `.hidden {
  display: none;
}

.badge-wrapper {
  position: relative;
}

.badge {
  position: absolute;
  top: 0;
  right: 0;
}

.navbar {
  position: fixed;
  top: 0;
  width: 100%;
}`,
      keyPoints: ["block starts a new line, inline does not", "display: none removes the element from the page", "absolute is placed relative to the nearest positioned parent", "fixed stays in place when the page scrolls"],
    },
    {
      title: "Flexbox",
      content: `Flexbox is the easiest way to arrange items in a row or a column. Put display: flex on the parent, and its children become flex items. Use justify-content to space items along the main direction, align-items to align them in the other direction, and gap to add space between them.`,
      codeExample: `.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.center-everything {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}`,
      keyPoints: ["Add display: flex to the parent, not the children", "justify-content works along the main direction", "align-items works across it", "flex-wrap: wrap lets items move to the next line"],
    },
    {
      title: "CSS Grid",
      content: `Grid arranges items in rows and columns at the same time. Put display: grid on the parent and define the columns with grid-template-columns. The fr unit means a fraction of the free space. Use repeat to avoid writing the same value many times.`,
      codeExample: `.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

/* responsive without media queries */
.auto-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}`,
      keyPoints: ["Use Flexbox for one direction, Grid for rows and columns together", "1fr means one share of the available space", "repeat(3, 1fr) makes three equal columns", "gap adds space between rows and columns"],
    },
    {
      title: "Hover, Focus and Transitions",
      content: `Pseudo-classes style an element in a special state. :hover applies when the mouse is over it, and :focus applies when it is selected, for example a text box you are typing in. A transition makes the change happen smoothly instead of instantly.`,
      codeExample: `.button {
  background: #6366f1;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  transition: background 0.2s;
}

.button:hover {
  background: #4f46e5;
}

input:focus {
  outline: none;
  border-color: #6366f1;
}`,
      keyPoints: [":hover reacts to the mouse", ":focus shows which input is active", "Put transition on the normal state, not on :hover", "Keep transitions short, around 0.2 seconds"],
    },
    {
      title: "Responsive Design",
      content: `A responsive page looks good on phones, tablets and computers. First, add the viewport meta tag in your HTML head. Then use flexible units like percentages, rem and max-width instead of fixed widths. Finally, use media queries to change the style at certain screen sizes. A good habit is mobile-first: write the style for small screens first, then add min-width queries for larger ones.`,
      codeExample: `<!-- In your HTML head -->
<meta name="viewport" content="width=device-width, initial-scale=1">

/* CSS */
.container {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 16px;
}

.cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 768px) {
  .cards {
    grid-template-columns: repeat(3, 1fr);
  }
}`,
      keyPoints: ["Always add the viewport meta tag", "Use max-width instead of a fixed width", "Mobile-first: start small, then use min-width", "Test by resizing the browser window"],
    },
  ],
    javascript: [
    {
      title: "What is JavaScript?",
      content: `JavaScript is the language that makes web pages interactive. HTML builds the structure, CSS styles it, and JavaScript adds behavior: reacting to clicks, checking forms, loading data and updating the page without a reload.

JavaScript runs in the browser, and it also runs on servers through Node.js. Your own backend is written in it.

You add it to a page with a script tag. The console.log function prints a message in the browser console (press F12 to open it), which is the most useful tool for testing.`,
      codeExample: `<!-- In your HTML, just before the closing body tag -->
<script src="app.js"></script>

// app.js
console.log("Hello, JavaScript!");`,
      keyPoints: ["HTML is structure, CSS is style, JavaScript is behavior", "It runs in the browser and on servers with Node.js", "Use console.log to check values while you code", "Open the browser console with F12"],
    },
    {
      title: "Variables and Data Types",
      content: `Variables store values. Use let for values that will change and const for values that will not. Avoid var in modern code.

The main data types are:
string: text, like "Asha"
number: 10 or 3.5
boolean: true or false
undefined: a variable with no value yet
null: an intentional empty value

The typeof operator tells you the type of a value.`,
      codeExample: `let score = 10;
score = 15;

const name = "Asha";
let isLoggedIn = true;
let city;

console.log(typeof score);   // "number"
console.log(typeof name);    // "string"
console.log(city);           // undefined

// joining strings
console.log("Hello, " + name);`,
      keyPoints: ["let can be changed, const cannot", "Prefer const by default", "String, number, boolean, undefined and null are the basic types", "typeof shows the type of a value"],
    },
    {
      title: "Operators and Conditions",
      content: `Operators work on values. Arithmetic: + - * / and % (remainder). Comparison: > < >= <= and ===. Logical: && (and), || (or) and ! (not).

Always compare with === (strict equality), which checks the value and the type. The loose == can give surprising results.

Use if, else if and else to run different code depending on a condition.`,
      codeExample: `console.log(10 % 3);        // 1
console.log(5 === "5");     // false (different types)
console.log(5 == "5");      // true (avoid this)

const marks = 72;

if (marks >= 90) {
  console.log("Grade A");
} else if (marks >= 60) {
  console.log("Grade B");
} else {
  console.log("Keep practising");
}

const age = 20;
const hasId = true;
console.log(age >= 18 && hasId);   // true`,
      keyPoints: ["Use === instead of ==", "&& needs both sides true, || needs one", "% gives the remainder of a division", "else if lets you check more than two cases"],
    },
    {
      title: "Loops",
      content: `Loops repeat code. A for loop is used when you know how many times to repeat. A while loop repeats as long as a condition is true. A for...of loop goes through every item of an array.

Be careful with while loops: if the condition never becomes false, the loop runs forever and freezes the page.`,
      codeExample: `for (let i = 1; i <= 5; i++) {
  console.log("Number " + i);
}

let count = 3;
while (count > 0) {
  console.log(count);
  count--;
}

const fruits = ["apple", "mango", "banana"];
for (const fruit of fruits) {
  console.log(fruit);
}`,
      keyPoints: ["A for loop has a start, a condition and a step", "while repeats until its condition is false", "for...of reads each item of an array", "Make sure a while loop can end"],
    },
    {
      title: "Functions",
      content: `A function is a reusable block of code. You give it inputs (parameters), and it can send back a result with return. Writing a function once and calling it many times avoids repeating code.

Arrow functions are a shorter way to write a function and are used everywhere in modern JavaScript, including React. A parameter can also have a default value.`,
      codeExample: `function add(a, b) {
  return a + b;
}
console.log(add(2, 3));   // 5

// arrow function
const multiply = (a, b) => a * b;
console.log(multiply(4, 5));   // 20

// default value
function greet(name = "friend") {
  return "Hello, " + name;
}
console.log(greet());          // Hello, friend
console.log(greet("Asha"));    // Hello, Asha`,
      keyPoints: ["Functions avoid repeating code", "Parameters are inputs, return sends a value back", "Arrow functions are a shorter syntax", "Default values are used when no argument is given"],
    },
    {
      title: "Arrays",
      content: `An array is an ordered list of values. Positions start at 0, so the first item is at index 0. Use push to add an item at the end and pop to remove the last one. The length property tells you how many items there are.

Three methods are used all the time:
map creates a new array by changing every item.
filter creates a new array with only the items that pass a test.
find returns the first item that passes a test.

These methods do not change the original array.`,
      codeExample: `const numbers = [1, 2, 3, 4, 5];

console.log(numbers[0]);       // 1
console.log(numbers.length);   // 5

numbers.push(6);

const doubled = numbers.map((n) => n * 2);
console.log(doubled);          // [2, 4, 6, 8, 10, 12]

const even = numbers.filter((n) => n % 2 === 0);
console.log(even);             // [2, 4, 6]

const firstBig = numbers.find((n) => n > 3);
console.log(firstBig);         // 4`,
      keyPoints: ["Indexes start at 0", "push adds to the end, pop removes the last item", "map changes every item into a new array", "filter keeps only matching items, find returns the first match"],
    },
    {
      title: "Objects",
      content: `An object stores related data as key-value pairs. Read a value with dot notation (user.name). You can add or change a property by assigning to it. An object can also hold a function, which is called a method.

Destructuring pulls values out of an object into variables in one line. You have already used it in your backend: const { email, password } = req.body.

Arrays of objects are the most common shape of data from an API.`,
      codeExample: `const user = {
  name: "Asha",
  age: 21,
  skills: ["HTML", "CSS"],
};

console.log(user.name);        // Asha
user.age = 22;
user.city = "Delhi";

// destructuring
const { name, city } = user;
console.log(name, city);       // Asha Delhi

// array of objects
const courses = [
  { title: "HTML", lessons: 10 },
  { title: "CSS", lessons: 10 },
];
console.log(courses[1].title); // CSS`,
      keyPoints: ["Objects hold key-value pairs", "Use dot notation to read and change values", "Destructuring pulls out several values at once", "API data is usually an array of objects"],
    },
    {
      title: "The DOM",
      content: `The DOM (Document Object Model) is the browser's live version of your HTML page. JavaScript can find elements in it and change them, which is how pages update without reloading.

Use document.querySelector to find an element with a CSS selector. Then change its text with textContent, its style with style, or its classes with classList. You can also create new elements and add them to the page.`,
      codeExample: `<h1 id="title">Hello</h1>
<ul id="list"></ul>

<script>
  const title = document.querySelector("#title");
  title.textContent = "Welcome to SkillVilla";
  title.style.color = "blue";
  title.classList.add("highlight");

  const list = document.querySelector("#list");
  const item = document.createElement("li");
  item.textContent = "First item";
  list.appendChild(item);
</script>`,
      keyPoints: ["The DOM is the page as JavaScript sees it", "querySelector finds an element using a CSS selector", "textContent changes the text of an element", "createElement and appendChild add new elements"],
    },
    {
      title: "Events",
      content: `Events are things that happen on a page: a click, typing in a box, submitting a form. Use addEventListener to run a function when an event happens on an element.

The function receives an event object. For a form submit, call event.preventDefault() to stop the browser from reloading the page. This is the same idea you use in React with onClick and onSubmit.`,
      codeExample: `<button id="btn">Click me</button>
<input id="nameInput" type="text">
<p id="message"></p>

<script>
  const btn = document.querySelector("#btn");
  const input = document.querySelector("#nameInput");
  const message = document.querySelector("#message");

  btn.addEventListener("click", () => {
    message.textContent = "Hello, " + input.value;
  });

  input.addEventListener("input", (event) => {
    console.log("Typing:", event.target.value);
  });
</script>`,
      keyPoints: ["addEventListener connects an event to a function", "Common events: click, input, submit", "event.target.value gives what the user typed", "event.preventDefault() stops a form from reloading the page"],
    },
    {
      title: "Async JavaScript and Fetch",
      content: `Some tasks take time, like loading data from a server. JavaScript does not wait for them and blocks the page. Instead, it uses promises: a promise is a value that will arrive later.

async and await make promise code easy to read. Put await in front of a slow task, inside a function marked async, and the code waits there for the result. Wrap it in try and catch to handle errors.

fetch is the built-in way to call an API. It returns a promise, and you call response.json() to read the data. Your React app does the same thing with axios.`,
      codeExample: `async function loadCourses() {
  try {
    const response = await fetch("http://localhost:3000/api/courses", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();
    console.log(data.courses);
  } catch (error) {
    console.error("Could not load courses:", error.message);
  }
}

loadCourses();`,
      keyPoints: ["A promise is a value that arrives later", "await can only be used inside an async function", "Always handle errors with try and catch", "fetch calls an API, and response.json() reads the data"],
    },
  ],
    english: [
    {
      title: "Parts of Speech",
      content: `Every word in a sentence has a job. The eight parts of speech are:

Noun: names a person, place, thing or idea (student, Delhi, laptop, honesty)
Pronoun: replaces a noun (he, she, it, they, we)
Verb: shows an action or a state (write, run, is, seem)
Adjective: describes a noun (quick, smart, difficult)
Adverb: describes a verb, an adjective or another adverb (quickly, very, carefully)
Preposition: shows a relation of place, time or direction (in, on, at, under, before)
Conjunction: joins words or sentences (and, but, because, or)
Interjection: shows a sudden feeling (Wow! Oh! Oops!)

Example: The smart student quickly finished her work.
smart = adjective, student = noun, quickly = adverb, finished = verb, her = pronoun, work = noun.

Knowing these helps you understand why a sentence is right or wrong.`,
      codeExample: "",
      keyPoints: ["Noun names, verb acts, adjective describes a noun", "An adverb describes a verb, an adjective or another adverb", "A preposition shows place, time or direction", "A conjunction joins words and sentences"],
    },
    {
      title: "Tenses: Present, Past and Future",
      content: `A tense tells us when something happens. Start with the three simple tenses.

Simple present: habits and facts
I work every day. The sun rises in the east.

Simple past: finished actions
I worked yesterday. She completed the course last month.

Simple future: things that will happen
I will work tomorrow. They will join next week.

Two more tenses you need every day:

Present continuous: happening now
I am working on a project. (am/is/are + verb with -ing)

Present perfect: past action with a result now
I have finished the report. (have/has + past participle)

Choosing the right tense makes your meaning clear. Compare: I live in Delhi (now), I lived in Delhi (earlier) and I have lived in Delhi for five years (started in the past and still true).`,
      codeExample: "",
      keyPoints: ["Simple present is for habits and facts", "Simple past is for finished actions", "Use will for the future", "Present perfect = have/has + past participle"],
    },
    {
      title: "Subject-Verb Agreement",
      content: `The verb must agree with its subject. A singular subject takes a singular verb, and a plural subject takes a plural verb. In the simple present, a singular subject (he, she, it, a name) takes a verb ending in -s or -es.

Correct: She works hard. They work hard.
Wrong: She work hard. They works hard.

With do and does:
Correct: He does not like tea. (not: He do not)
Correct: Does she know the answer?

Be careful with these:
Everyone, everybody, each, someone and nobody take a singular verb: Everyone is ready.
Each of the students has a book. (the subject is each, not students)
A list of items is on the table. (the subject is list)
Two subjects joined by and take a plural verb: Ravi and Asha are friends.

Tip: ignore the words between the subject and the verb, and check the verb against the real subject.`,
      codeExample: "",
      keyPoints: ["He, she and it take a verb with -s", "Use does and doesn't with he, she and it", "Everyone and each take a singular verb", "Find the real subject before choosing the verb"],
    },
    {
      title: "Articles and Prepositions",
      content: `Articles: a, an and the

Use a or an for one non-specific thing. The choice depends on the sound, not the spelling:
a book, a university (starts with a "yoo" sound), an apple, an hour (silent h).

Use the for something specific or already known:
I bought a laptop. The laptop is fast.

Use no article for general plural or uncountable nouns:
Water is important. Students need practice.

Prepositions of time and place:
in: months, years, cities (in May, in 2026, in Delhi)
on: days and dates (on Monday, on 5 March)
at: exact times and points (at 9 am, at the station)

Fixed combinations to remember:
interested in, good at, depend on, afraid of, wait for, listen to, agree with.

Some verbs take no preposition:
Correct: We discussed the plan. Wrong: We discussed about the plan.
Correct: She reached the office. Wrong: She reached to the office.`,
      codeExample: "",
      keyPoints: ["a or an depends on the sound of the next word", "Use the for something specific", "in for months and cities, on for days, at for exact times", "Do not add about after discuss"],
    },
    {
      title: "Common Grammar Mistakes",
      content: `These mistakes are very common. Learn them once and fix them for good.

I am agree. -> I agree. (agree is a verb, do not add am)
He don't know. -> He doesn't know.
More better. -> Better. (better is already a comparison)
Discuss about the topic. -> Discuss the topic.
Informations, advices, furnitures. -> Information, advice, furniture. (these words are uncountable)
Peoples. -> People. (already plural)
Myself Asha. -> I am Asha. or My name is Asha.

Words that are often confused:
its / it's: its = belongs to it (the dog wagged its tail); it's = it is.
their / there / they're: their = belongs to them; there = a place; they're = they are.
your / you're: your = belongs to you; you're = you are.
fewer / less: fewer for things you can count (fewer mistakes); less for things you cannot (less water).

Before you send an email, read it once slowly for these.`,
      codeExample: "",
      keyPoints: ["Say I agree, not I am agree", "Information, advice and furniture have no plural", "it's means it is, its shows possession", "Use fewer for countable things and less for uncountable things"],
    },
    {
      title: "Sentence Structure and Punctuation",
      content: `A complete sentence has a subject and a verb and expresses a full thought.

Basic order: subject + verb + object
Asha (subject) wrote (verb) the report (object).

Three kinds of sentences:
Simple: one idea. I study.
Compound: two ideas joined by and, but or so. I study, but she works.
Complex: a main idea plus a dependent idea. I study because I want a job.

Two errors to avoid:
Fragment (incomplete): Because I was late. (what happened?)
Run-on (two sentences joined wrongly): I was late I missed the bus.
Correct: I was late, so I missed the bus.

Punctuation basics:
Start every sentence with a capital letter and end it with a full stop, question mark or exclamation mark.
Use a comma before and, but or so when they join two full sentences, and after an opening phrase: After the meeting, we left.
Use an apostrophe for contractions (don't = do not) and for possession (Asha's laptop).`,
      codeExample: "",
      keyPoints: ["A sentence needs a subject and a verb", "A fragment is incomplete, a run-on joins sentences wrongly", "Use a comma before and, but or so joining two sentences", "An apostrophe shows possession or a missing letter"],
    },
    {
      title: "Writing Professional Emails",
      content: `A good email is short, clear and polite. Use this structure:

1. Subject line: say the purpose in a few words (Request for leave on Friday)
2. Greeting: Dear Mr. Sharma, or Hello Priya,
3. Purpose: say why you are writing in the first line
4. Details: keep it short, one idea per paragraph
5. Closing: say what you expect next, then thank the reader
6. Sign-off: Kind regards, followed by your name

Example:

Subject: Request for interview rescheduling

Dear Ms. Verma,

I am writing to request a change in my interview time. I have an exam on Tuesday morning and would like to attend the interview on Wednesday instead.

Please let me know if this is possible. Thank you for your time and understanding.

Kind regards,
Asha Singh

Useful phrases:
I am writing to ask about...
Please find the attachment.
I would appreciate your reply by Friday.
Thank you for your help.

Avoid: SMS language (pls, u, thx), many exclamation marks, and long paragraphs. Always check the spelling of the person's name.`,
      codeExample: "",
      keyPoints: ["Write a clear subject line", "State your purpose in the first sentence", "Keep paragraphs short, one idea each", "End with a polite closing such as Kind regards"],
    },
    {
      title: "Introducing Yourself",
      content: `In an interview, the first question is almost always: Tell me about yourself. Prepare a short answer of 60 to 90 seconds with four parts:

1. Who you are: your name and your education
2. What you can do: your main skills
3. What you have done: one project or experience
4. What you want: your goal

Example:

Good morning. My name is Asha Singh. I have completed my degree in computer applications and a full stack development course. My main skills are HTML, CSS, JavaScript, React, Node.js and MongoDB. I recently built a learning web application where users sign up, log in, read lessons and practise aptitude questions. I am looking for an opportunity as a junior developer where I can learn and contribute to a team.

Tips:
Say I am Asha or My name is Asha. Do not say Myself Asha.
Speak slowly and look at the interviewer.
Do not memorise word for word. Remember the four parts and say them naturally.
Practise it aloud until it feels comfortable.

Prepare your own version with your real details.`,
      codeExample: "",
      keyPoints: ["Use four parts: who you are, skills, project, goal", "Keep it to 60 to 90 seconds", "Say My name is Asha, not Myself Asha", "Practise aloud, do not memorise word for word"],
    },
    {
      title: "Workplace Phrases and Vocabulary",
      content: `The right phrase makes you sound polite and professional.

Asking for clarification:
Could you please explain that again?
Could you clarify what you mean by...?

Asking for help:
Could you help me with this?
I would appreciate your guidance on...

Giving an update:
I have completed the first part and I am working on the second.
I will send the report by the end of the day.

Disagreeing politely:
I see your point, but I think we could also...
That is a good idea. May I suggest another option?

Apologising:
Sorry for the delay.
I apologise for the confusion.

Useful workplace words:
deadline: the last time to finish a task
update: the latest information
follow up: contact again about something
schedule: plan a time for something
feedback: comments on your work
priority: something more important than the rest

Replace casual words with professional ones: say Could you please... instead of Give me..., and I am not available instead of I can't come.`,
      codeExample: "",
      keyPoints: ["Use Could you please... to make requests politely", "Give updates with clear times and results", "Disagree by first acknowledging the other person's idea", "Learn words like deadline, feedback and follow up"],
    },
    {
      title: "Active and Passive Voice",
      content: `In the active voice, the subject does the action. In the passive voice, the subject receives the action.

Active: The team completed the project.
Passive: The project was completed by the team.

The passive voice uses a form of be plus the past participle:
Present: The report is written every week.
Past: The report was written yesterday.
Future: The report will be written tomorrow.
Present perfect: The report has been written.

When to use each:
Prefer the active voice. It is shorter, clearer and more direct.
Use the passive voice when the doer is unknown or not important: My laptop was stolen. Applications are accepted until Friday.

Compare: Active: We will send the results on Monday. Passive: The results will be sent on Monday.

In interviews and emails, active sentences sound confident: I built the login system sounds stronger than The login system was built by me.`,
      codeExample: "",
      keyPoints: ["Active: the subject does the action", "Passive: be + past participle", "Use passive when the doer is unknown or unimportant", "Prefer active voice for clear, confident writing"],
    },
  ],
};

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Lesson.deleteMany();
    await Course.deleteMany();

    const createdCourses = await Course.insertMany(courses);

    const lessonDocs = [];
    createdCourses.forEach((course) => {
      lessons[course.slug].forEach((lesson, index) => {
        lessonDocs.push({ ...lesson, course: course._id, order: index + 1 });
      });
    });

    await Lesson.insertMany(lessonDocs);

    console.log(`Seeded ${createdCourses.length} courses and ${lessonDocs.length} lessons`);
  } catch (error) {
    console.error("Seed error:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

seed();