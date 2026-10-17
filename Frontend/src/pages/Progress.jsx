import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const authHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

const levelLabel = {
  weak: "Needs improvement",
  improving: "Getting better",
  strong: "Strong",
  new: "Not enough data",
};

const dayLabel = (key) =>
  new Date(`${key}T00:00:00`).toLocaleDateString(undefined, { weekday: "short" });

const getWeeklyMessage = (activeDays) => {
  if (activeDays >= 5) return "Great consistency this week. Keep it up!";
  if (activeDays >= 3) return "Good effort. Try to study on one or two more days.";
  if (activeDays >= 1) return "A start is made. Try to study a little every day.";
  return "No activity this week yet. Complete a lesson or answer a few questions to start your streak.";
};

function Progress() {
  const [learning, setLearning] = useState(null);
  const [aptitude, setAptitude] = useState(null);
  const [weekly, setWeekly] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const offset = new Date().getTimezoneOffset();

        const [learningRes, aptitudeRes, weeklyRes] = await Promise.all([
          axios.get(`${API}/api/progress?tzOffset=${offset}`, authHeaders()),
          axios.get(`${API}/api/insights/aptitude`, authHeaders()),
          axios.get(`${API}/api/progress/activity?tzOffset=${offset}`, authHeaders()),
        ]);

        setLearning(learningRes.data);
        setAptitude(aptitudeRes.data);
        setWeekly(weeklyRes.data);
      } catch (err) {
        setError(err.response?.data?.message || "Could not load your progress");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading your progress...</p>;
  }

  if (error) {
    return <p className="auth-error">{error}</p>;
  }

  const stats = [
    {
      label: "Lessons Completed",
      value: `${learning.totalCompleted} / ${learning.totalLessons}`,
      icon: "✅",
    },
    { label: "Day Streak", value: learning.streak, icon: "🔥" },
    { label: "Longest Streak", value: learning.longestStreak, icon: "🏆" },
    { label: "Questions Answered", value: aptitude.totalAttempted, icon: "🧮" },
    { label: "Aptitude Accuracy", value: `${aptitude.overallPercent}%`, icon: "🎯" },
  ];

  const maxValue = Math.max(1, ...weekly.activity.map((item) => item.lessons + item.questions));

  return (
    <div>
      <h2 className="section-title">Your Progress</h2>

      <div className="stats-grid">
        {stats.map((item) => (
          <div className="stat-card" key={item.label}>
            <div className="stat-icon">{item.icon}</div>
            <div>
              <h3>{item.value}</h3>
              <p>{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="learning-meta" style={{ marginTop: "10px" }}>
        A day counts toward your streak when you complete a lesson or answer an aptitude
        question, in practice or in a mock test.
      </p>

      <div className="panel" style={{ marginTop: "24px" }}>
        <h3 className="section-title">Weekly report</h3>
        <p className="activity-summary">
          Last 7 days: {weekly.weekLessons} lesson{weekly.weekLessons === 1 ? "" : "s"} completed,{" "}
          {weekly.weekQuestions} question{weekly.weekQuestions === 1 ? "" : "s"} answered, active
          on {weekly.activeDays} of 7 days. {getWeeklyMessage(weekly.activeDays)}
        </p>

        <div className="activity-chart">
          {weekly.activity.map((item) => {
            const total = item.lessons + item.questions;

            return (
              <div
                className="activity-col"
                key={item.day}
                title={`${item.lessons} lessons, ${item.questions} questions`}
              >
                <span className="activity-count">{total}</span>
                <div className="activity-bar-wrap">
                  {total === 0 ? (
                    <div className="activity-bar empty"></div>
                  ) : (
                    <div
                      className="activity-bar"
                      style={{ height: `${(total / maxValue) * 100}%` }}
                    >
                      <div className="seg-questions" style={{ flex: item.questions }}></div>
                      <div className="seg-lessons" style={{ flex: item.lessons }}></div>
                    </div>
                  )}
                </div>
                <span className="activity-day">{dayLabel(item.day)}</span>
              </div>
            );
          })}
        </div>

        <div className="activity-legend">
          <span>
            <span className="legend-dot lessons"></span>Lessons
          </span>
          <span>
            <span className="legend-dot questions"></span>Questions
          </span>
        </div>
      </div>

      {aptitude.totalAttempted === 0 ? (
        <div className="panel" style={{ marginTop: "24px" }}>
          <h3 className="section-title">Aptitude insights</h3>
          <p className="empty-text">
            Answer some aptitude questions to see which topics need your attention.
          </p>
          <Link to="/aptitude" className="feature-btn">
            Start practising
          </Link>
        </div>
      ) : (
        <>
          <div className="panel" style={{ marginTop: "24px" }}>
            <h3 className="section-title">Focus areas</h3>

            {aptitude.focusTopics.length === 0 ? (
              <p className="empty-text">
                No weak topics right now. Keep practising to stay sharp.
              </p>
            ) : (
              aptitude.focusTopics.map((item) => (
                <div className="focus-item" key={`${item.category}-${item.topic}`}>
                  <div>
                    <strong>{item.topic}</strong>{" "}
                    <span className="learning-meta">({item.category})</span>
                    <p className="focus-message">{item.message}</p>
                  </div>
                  <span className="focus-percent">{item.percent}%</span>
                </div>
              ))
            )}

            <Link to="/aptitude" className="feature-btn" style={{ marginTop: "12px" }}>
              Practise now
            </Link>
          </div>

          {aptitude.strongTopics.length > 0 && (
            <div className="panel" style={{ marginTop: "16px" }}>
              <h3 className="section-title">Your strengths</h3>

              {aptitude.strongTopics.map((item) => (
                <div className="focus-item" key={`${item.category}-${item.topic}`}>
                  <div>
                    <strong>{item.topic}</strong>{" "}
                    <span className="learning-meta">({item.category})</span>
                    <p className="focus-message">{item.message}</p>
                  </div>
                  <span className="focus-percent good">{item.percent}%</span>
                </div>
              ))}
            </div>
          )}

          {aptitude.categories.map((category) => (
            <div className="panel" style={{ marginTop: "16px" }} key={category.name}>
              <div className="apt-top">
                <h3 className="section-title">{category.name}</h3>
                <span className="learning-meta">
                  {category.correct} correct of {category.attempted} answered ({category.percent}%)
                </span>
              </div>

              {category.topics.map((topic) => (
                <div className="topic-row" key={topic.topic}>
                  <div className="topic-row-top">
                    <span>{topic.topic}</span>
                    <span className={`level-badge ${topic.level}`}>{levelLabel[topic.level]}</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className={`progress-fill ${topic.level}`}
                      style={{ width: `${topic.percent}%` }}
                    ></div>
                  </div>
                  <p className="learning-meta">
                    {topic.correct} of {topic.attempted} correct ({topic.percent}%)
                  </p>
                </div>
              ))}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Progress;