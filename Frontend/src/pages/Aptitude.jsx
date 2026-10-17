import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const authHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

const getRemark = (percent) => {
  if (percent < 50) return "Needs improvement. Practise this topic more.";
  if (percent <= 75) return "Getting better. Keep practising.";
  return "Strong. Well done!";
};

function Aptitude() {
  const [view, setView] = useState("select");
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [title, setTitle] = useState("");
  const [lastPick, setLastPick] = useState({ category: "", topic: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await axios.get(`${API}/api/aptitude/topics`, authHeaders());
        setCategories(res.data.categories);
      } catch (err) {
        setError(err.response?.data?.message || "Could not load topics");
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  const startQuiz = async (category, topic) => {
    setError("");

    try {
      const params = new URLSearchParams({ category, limit: "10" });
      if (topic) params.set("topic", topic);

      const res = await axios.get(`${API}/api/aptitude/questions?${params}`, authHeaders());

      if (res.data.questions.length === 0) {
        setError("No questions found for this choice");
        return;
      }

      setQuestions(res.data.questions);
      setTitle(topic ? `${category}: ${topic}` : category);
      setLastPick({ category, topic });
      setCurrent(0);
      setSelected(null);
      setFeedback(null);
      setScore(0);
      setView("quiz");
    } catch (err) {
      setError(err.response?.data?.message || "Could not load questions");
    }
  };

  const handleAnswer = async (index) => {
    if (feedback) return;

    setSelected(index);

    try {
      const res = await axios.post(
        `${API}/api/aptitude/check`,
        { questionId: questions[current]._id, selected: index },
        authHeaders()
      );
      setFeedback(res.data);
      if (res.data.isCorrect) setScore((value) => value + 1);
    } catch (err) {
      setError(err.response?.data?.message || "Could not check the answer");
      setSelected(null);
    }
  };

  const handleNext = () => {
    if (current + 1 === questions.length) {
      setView("result");
      return;
    }

    setCurrent(current + 1);
    setSelected(null);
    setFeedback(null);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (view === "select") {
    return (
      <div>
        <h2 className="section-title">Aptitude Practice</h2>
        {error && <p className="auth-error">{error}</p>}

        {categories.length === 0 ? (
          <p className="empty-text">No questions available yet.</p>
        ) : (
          categories.map((cat) => (
            <div className="panel apt-category" key={cat.name}>
              <div className="apt-top">
                <div>
                  <h3 className="section-title">{cat.name}</h3>
                  <p className="learning-meta">{cat.total} questions</p>
                </div>
                <button className="feature-btn" onClick={() => startQuiz(cat.name, "")}>
                  Practice all
                </button>
              </div>

              <div className="topic-chips">
                {cat.topics.map((t) => (
                  <button
                    className="topic-chip"
                    key={t.topic}
                    onClick={() => startQuiz(cat.name, t.topic)}
                  >
                    {t.topic} ({t.count})
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    );
  }

  if (view === "quiz") {
    const question = questions[current];
    const percent = Math.round((current / questions.length) * 100);

    return (
      <div>
        <h2 className="section-title">{title}</h2>
        <p className="learning-meta">
          Question {current + 1} of {questions.length}
        </p>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${percent}%` }}></div>
        </div>

        <div className="panel" style={{ marginTop: "16px" }}>
          <p className="question-text">{question.question}</p>

          {question.options.map((option, index) => {
            let className = "option-btn";

            if (feedback) {
              if (index === feedback.correctIndex) className += " correct";
              else if (index === selected) className += " wrong";
            }

            return (
              <button
                key={index}
                className={className}
                onClick={() => handleAnswer(index)}
                disabled={Boolean(feedback)}
              >
                {option}
              </button>
            );
          })}

          {error && <p className="auth-error">{error}</p>}

          {feedback && (
            <>
              <div className="explanation-box">
                <strong>{feedback.isCorrect ? "Correct! " : "Not quite. "}</strong>
                {feedback.explanation}
              </div>

              <div style={{ marginTop: "16px" }}>
                <button className="feature-btn" onClick={handleNext}>
                  {current + 1 === questions.length ? "Finish" : "Next question"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  const finalPercent = Math.round((score / questions.length) * 100);

  return (
    <div className="panel result-card">
      <h2 className="section-title">{title}</h2>
      <div className="result-score">
        {score} / {questions.length}
      </div>
      <p>{finalPercent}% correct</p>
      <p className="learning-meta">{getRemark(finalPercent)}</p>

      <div className="result-actions">
        <button
          className="feature-btn"
          onClick={() => startQuiz(lastPick.category, lastPick.topic)}
        >
          Try again
        </button>
        <button className="feature-btn" onClick={() => setView("select")}>
          Choose another topic
        </button>
      </div>
    </div>
  );
}

export default Aptitude;
