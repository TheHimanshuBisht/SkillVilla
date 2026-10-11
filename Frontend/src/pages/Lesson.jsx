import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function Lesson() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [siblings, setSiblings] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [actionError, setActionError] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLesson = async () => {
      setLoading(true);
      setError("");
      setActionError("");

      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };
        const api = import.meta.env.VITE_API_URL;

        const res = await axios.get(`${api}/api/lessons/${id}`, { headers });
        setLesson(res.data.lesson);

        const courseRes = await axios.get(
          `${api}/api/courses/${res.data.lesson.course._id}`,
          { headers }
        );
        setSiblings(courseRes.data.lessons);

        const progressRes = await axios.get(`${api}/api/progress`, { headers });
        setCompleted(progressRes.data.completedLessonIds.includes(res.data.lesson._id));
      } catch (err) {
        setError(err.response?.data?.message || "Could not load lesson");
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id]);

  const handleComplete = async () => {
    setSaving(true);
    setActionError("");

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/progress/complete`,
        { lessonId: lesson._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCompleted(true);
    } catch (err) {
      setActionError(err.response?.data?.message || "Could not save progress");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p>Loading lesson...</p>;
  }

  if (error) {
    return (
      <div className="panel">
        <h2 className="section-title">{error}</h2>
        <Link to="/my-learning">Back to My Learning</Link>
      </div>
    );
  }

  const index = siblings.findIndex((item) => item._id === lesson._id);
  const prevLesson = index > 0 ? siblings[index - 1] : null;
  const nextLesson = index < siblings.length - 1 ? siblings[index + 1] : null;

  return (
    <div>
      <Link to={`/courses/${lesson.course._id}`} className="back-link">
        ← Back to {lesson.course.title}
      </Link>

      <h2 className="lesson-heading">{lesson.title}</h2>
      <p className="learning-meta">
        Lesson {lesson.order} of {siblings.length}
      </p>

      <div className="panel">
        <div className="lesson-content">{lesson.content}</div>

        {lesson.codeExample && (
          <div className="lesson-block">
            <h3 className="section-title">Example</h3>
            <pre className="code-block">
              <code>{lesson.codeExample}</code>
            </pre>
          </div>
        )}

        {lesson.keyPoints.length > 0 && (
          <div className="lesson-block">
            <h3 className="section-title">Key points</h3>
            <ul className="keypoints">
              {lesson.keyPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="lesson-block">
        {completed ? (
          <p className="lesson-status">✓ Lesson completed</p>
        ) : (
          <button className="feature-btn" onClick={handleComplete} disabled={saving}>
            {saving ? "Saving..." : "Mark as complete"}
          </button>
        )}
        {actionError && <p className="auth-error">{actionError}</p>}
      </div>

      <div className="lesson-nav">
        {prevLesson ? (
          <Link to={`/lessons/${prevLesson._id}`} className="feature-btn">
            ← Previous
          </Link>
        ) : (
          <span></span>
        )}

        {nextLesson && (
          <Link to={`/lessons/${nextLesson._id}`} className="feature-btn">
            Next →
          </Link>
        )}
      </div>
    </div>
  );
}

export default Lesson;