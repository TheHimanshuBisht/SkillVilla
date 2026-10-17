import { Link } from "react-router-dom";

function AIFeatures() {
  const features = [
    {
      title: "Aptitude Practice",
      desc: "Practise 150 questions across Quantitative, Logical and Verbal.",
      icon: "🧮",
      to: "/aptitude",
    },
    {
      title: "Mock Tests",
      desc: "Take timed tests and review every answer with explanations.",
      icon: "📝",
      to: "/mock-tests",
    },
    {
      title: "Grammar Assistant",
      desc: "Check a sentence and get a correction with a clear explanation.",
      icon: "🗣️",
      to: "/sentence-checker",
    },
  ];

  return (
    <section className="section">
      <h2 className="section-title">Practice & Tools</h2>

      <div className="feature-grid">
        {features.map((item) => (
          <div className="feature-card" key={item.title}>
            <div className="feature-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
            <Link to={item.to} className="feature-btn">
              Open
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AIFeatures;