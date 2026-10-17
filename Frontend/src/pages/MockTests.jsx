import { useEffect, useRef, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const authHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

const formatTime = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

const getRemark = (percent) => {
  if (percent < 50) return "Needs improvement";
  if (percent <= 75) return "Getting better";
  return "Strong";
};

function MockTests() {
  const [view, setView] = useState("list");
  const [tests, setTests] = useState([]);
  const [history, setHistory] = useState([]);
  const [attempt, setAttempt] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const endTimeRef = useRef(0);
  const submittedRef = useRef(false);

  const loadList = async () => {
    try {
      const [testsRes, historyRes] = await Promise.all([
        axios.get(`${API}/api/mock/tests`, authHeaders()),
        axios.get(`${API}/api/mock/history`, authHeaders()),
      ]);
      setTests(testsRes.data.tests);
      setHistory(historyRes.data.attempts);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load mock tests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadList();
  }, []);

  // Countdown timer
  useEffect(() => {
    if (view !== "test") return;

    const timer = setInterval(() => {
      const left = Math.max(0, Math.round((endTimeRef.current - Date.now()) / 1000));
      setSecondsLeft(left);
    }, 1000);

    return () => clearInterval(timer);
  }, [view]);

  // Auto-submit when the time is over
  useEffect(() => {
    if (view === "test" && secondsLeft === 0 && attempt) {
      submitTest();
    }
  }, [secondsLeft, view]);

  const startTest = async (testId) => {
    setError("");

    try {
      const res = await axios.post(`${API}/api/mock/start`, { testId }, authHeaders());
      const minutes = res.data.attempt.durationMinutes;

      setAttempt(res.data.attempt);
      setQuestions(res.data.questions);
      setAnswers({});
      setCurrent(0);
      submittedRef.current = false;
      endTimeRef.current = Date.now() + minutes * 60 * 1000;
      setSecondsLeft(minutes * 60);
      setView("test");
    } catch (err) {
      setError(err.response?.data?.message || "Could not start the test");
    }
  };

  const selectOption = (questionId, index) => {
    setAnswers({ ...answers, [questionId]: index });
  };

  const submitTest = async () => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    setSubmitting(true);
    setError("");

    try {
      const res = await axios.post(
        `${API}/api/mock/submit`,
        { attemptId: attempt.id, answers },
        authHeaders()
      );
      setResult(res.data);
      setView("result");
    } catch (err) {
      submittedRef.current = false;
      setError(err.response?.data?.message || "Could not submit the test");
    } finally {
      setSubmitting(false);
    }
  };

  const handleManualSubmit = () => {
    const unanswered = questions.length - Object.keys(answers).length;
    const message =
      unanswered > 0
        ? `You have ${unanswered} unanswered question(s). Submit the test now?`
        : "Submit the test now?";

    if (window.confirm(message)) {
      submitTest();
    }
  };

  const backToList = () => {
    setLoading(true);
    setResult(null);
    setView("list");
    loadList();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (view === "list") {
    return (
      <div>
        <h2 className="section-title">Mock Tests</h2>
        {error && <p className="auth-error">{error}</p>}

        <div className="learning-grid">
          {tests.map((test) => (
            <div className="learning-card" key={test.id}>
              <h3>{test.title}</h3>
              <p className="learning-meta">{test.description}</p>
              <p className="learning-meta">
                {test.totalQuestions} questions · {test.durationMinutes} minutes
              </p>
              <button className="feature-btn" onClick={() => startTest(test.id)}>
                Start test
              </button>
            </div>
          ))}
        </div>

        <div className="panel" style={{ marginTop: "24px" }}>
          <h3 className="section-title">Your recent attempts</h3>

          {history.length === 0 ? (
            <p className="empty-text">No attempts yet. Start a test above.</p>
          ) : (
            history.map((item) => (
              <div className="history-row" key={item._id}>
                <span>{item.testTitle}</span>
                <span className="learning-meta">
                  {new Date(item.submittedAt).toLocaleDateString()}
                </span>
                <strong>
                  {item.score} / {item.total}
                </strong>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  if (view === "test") {
    const question = questions[current];
    const answeredCount = Object.keys(answers).length;

    return (
      <div>
        <div className="mock-header">
          <div>
            <h2 className="section-title">{attempt.title}</h2>
            <p className="learning-meta">
              Answered {answeredCount} of {questions.length}
            </p>
          </div>
          <div className={secondsLeft <= 60 ? "timer low" : "timer"}>{formatTime(secondsLeft)}</div>
        </div>

        <div className="panel">
          <p className="learning-meta">
            Question {current + 1} of {questions.length} · {question.category}
          </p>
          <p className="question-text">{question.question}</p>

          {question.options.map((option, index) => (
            <button
              key={index}
              className={answers[question._id] === index ? "option-btn selected" : "option-btn"}
              onClick={() => selectOption(question._id, index)}
            >
              {option}
            </button>
          ))}

          <div className="mock-nav">
            <button
              className="feature-btn"
              onClick={() => setCurrent(current - 1)}
              disabled={current === 0}
            >
              ← Previous
            </button>
            <button
              className="feature-btn"
              onClick={() => setCurrent(current + 1)}
              disabled={current + 1 === questions.length}
            >
              Next →
            </button>
          </div>
        </div>

        <div className="panel" style={{ marginTop: "16px" }}>
          <p className="learning-meta">Jump to a question</p>
          <div className="palette">
            {questions.map((q, index) => {
              let className = "palette-btn";
              if (answers[q._id] !== undefined) className += " answered";
              if (index === current) className += " current";

              return (
                <button key={q._id} className={className} onClick={() => setCurrent(index)}>
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>

        {error && <p className="auth-error">{error}</p>}

        <div style={{ marginTop: "16px" }}>
          <button className="feature-btn" onClick={handleManualSubmit} disabled={submitting}>
            {submitting ? "Submitting..." : "Submit test"}
          </button>
        </div>
      </div>
    );
  }

  const percent = result.total ? Math.round((result.score / result.total) * 100) : 0;

  return (
    <div>
      <div className="panel result-card">
        <h2 className="section-title">{result.testTitle}</h2>
        <div className="result-score">
          {result.score} / {result.total}
        </div>
        <p>
          {percent}% correct · Time taken {formatTime(result.timeTakenSeconds)}
        </p>
        <div className="result-actions">
          <button className="feature-btn" onClick={backToList}>
            Back to mock tests
          </button>
        </div>
      </div>

      <div className="panel" style={{ marginTop: "16px" }}>
        <h3 className="section-title">Topic-wise result</h3>

        {result.breakdown.map((item) => {
          const topicPercent = Math.round((item.correct / item.total) * 100);

          return (
            <div className="history-row" key={`${item.category}-${item.topic}`}>
              <span>
                {item.topic} <span className="learning-meta">({item.category})</span>
              </span>
              <span>
                {item.correct} / {item.total}
              </span>
              <strong>{getRemark(topicPercent)}</strong>
            </div>
          );
        })}
      </div>

      <div className="panel" style={{ marginTop: "16px" }}>
        <h3 className="section-title">Review your answers</h3>

        {result.review.map((item, index) => (
          <div className="review-item" key={item.questionId}>
            <p className="review-q">
              <strong>{index + 1}.</strong> {item.question}
            </p>
            <p className={item.isCorrect ? "review-line ok" : "review-line bad"}>
              Your answer: {item.selected === null ? "Not answered" : item.options[item.selected]}
            </p>
            {!item.isCorrect && (
              <p className="review-line ok">Correct answer: {item.options[item.correctIndex]}</p>
            )}
            <p className="review-exp">{item.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MockTests;