import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [completedIds, setCompletedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };
        const api = import.meta.env.VITE_API_URL;

        const [courseRes, progressRes] = await Promise.all([
          axios.get(`${api}/api/courses/${id}`, { headers }),
          axios.get(`${api}/api/progress`, { headers }),
        ]);

        setCourse(courseRes.data.course);
        setLessons(courseRes.data.lessons);
        setCompletedIds(progressRes.data.completedLessonIds);
      } catch (err) {
        setError(err.response?.data?.message || "Could not load course");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return <p>Loading course...</p>;
  }

  if (error) {
    return (
      <div className="panel">
        <h2 className="section-title">{error}</h2>
        <Link to="/my-learning">Back to My Learning</Link>
      </div>
    );
  }

  const doneCount = lessons.filter((lesson) => completedIds.includes(lesson._id)).length;
  const percent = lessons.length ? Math.round((doneCount / lessons.length) * 100) : 0;

  return (
    <div>
      <Link to="/my-learning" className="back-link">
        ← Back to My Learning
      </Link>

      <div className="course-header">
        <div className="feature-icon">{course.icon}</div>
        <div>
          <h2>{course.title}</h2>
          <p className="learning-meta">
            {course.description} · {doneCount} of {lessons.length} lessons completed
          </p>
        </div>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percent}%` }}></div>
      </div>
      <p className="learning-percent">{percent}% complete</p>

      <div className="panel">
        <h3 className="section-title">Lessons</h3>

        {lessons.map((lesson) => {
          const done = completedIds.includes(lesson._id);

          return (
            <Link to={`/lessons/${lesson._id}`} className="lesson-item" key={lesson._id}>
              <span className={done ? "lesson-check done" : "lesson-check"}>
                {done ? "✓" : lesson.order}
              </span>
              <span className="lesson-title">{lesson.title}</span>
              <span className="lesson-status">{done ? "Completed" : "Open →"}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default CourseDetails;