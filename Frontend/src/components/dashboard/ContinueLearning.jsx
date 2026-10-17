import { Link } from "react-router-dom";

function ContinueLearning({ items }) {
  return (
    <section className="panel">
      <h2 className="section-title">Continue Learning</h2>

      {items.length === 0 ? (
        <>
          <p className="empty-text">You have no course in progress yet.</p>
          <Link to="/my-learning" className="feature-btn">
            Browse courses
          </Link>
        </>
      ) : (
        items.map((course) => (
          <div className="course-item" key={course.courseId}>
            <div className="course-info">
              <h3>
                {course.icon} {course.title}
              </h3>
              <p>
                Next: Lesson {course.nextLesson.order}: {course.nextLesson.title}
              </p>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${course.percent}%` }}></div>
              </div>
            </div>
            <Link to={`/lessons/${course.nextLesson.id}`} className="feature-btn">
              Resume
            </Link>
          </div>
        ))
      )}
    </section>
  );
}

export default ContinueLearning;