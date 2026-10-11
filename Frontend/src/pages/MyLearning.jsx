import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function MyLearning() {
  const [courses, setCourses] = useState([]);
  const [completedByCourse, setCompletedByCourse] = useState({});
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };
        const api = import.meta.env.VITE_API_URL;

        const [coursesRes, progressRes] = await Promise.all([
          axios.get(`${api}/api/courses`, { headers }),
          axios.get(`${api}/api/progress`, { headers }),
        ]);

        setCourses(coursesRes.data.courses);
        setCompletedByCourse(progressRes.data.completedByCourse);
      } catch (err) {
        setError(err.response?.data?.message || "Could not load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCompleted = (course) => completedByCourse[course._id] || 0;

  const isDone = (course) =>
    course.lessonCount > 0 && getCompleted(course) === course.lessonCount;

  const filteredCourses = courses.filter((course) => {
    if (filter === "completed") return isDone(course);
    if (filter === "progress") return !isDone(course);
    return true;
  });

  const getButtonText = (course) => {
    if (isDone(course)) return "Review";
    if (getCompleted(course) === 0) return "Start";
    return "Resume";
  };

  if (loading) {
    return <p>Loading courses...</p>;
  }

  if (error) {
    return <p className="auth-error">{error}</p>;
  }

  return (
    <div>
      <h2 className="section-title">My Learning</h2>

      <div className="tabs">
        <button
          className={filter === "all" ? "tab active" : "tab"}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "progress" ? "tab active" : "tab"}
          onClick={() => setFilter("progress")}
        >
          In Progress
        </button>
        <button
          className={filter === "completed" ? "tab active" : "tab"}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      {filteredCourses.length === 0 ? (
        <p className="empty-text">No courses here yet.</p>
      ) : (
        <div className="learning-grid">
          {filteredCourses.map((course) => {
            const completed = getCompleted(course);
            const percent = course.lessonCount
              ? Math.round((completed / course.lessonCount) * 100)
              : 0;

            return (
              <div className="learning-card" key={course._id}>
                <div className="learning-top">
                  <div className="feature-icon">{course.icon}</div>
                  <span className="course-tag">{course.category}</span>
                </div>

                <h3>{course.title}</h3>
                <p className="learning-meta">
                  {completed} of {course.lessonCount} lessons
                </p>

                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${percent}%` }}></div>
                </div>
                <p className="learning-percent">{percent}% complete</p>

                <Link to={`/courses/${course._id}`} className="feature-btn">
                  {getButtonText(course)}
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyLearning;