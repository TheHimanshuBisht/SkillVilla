const timeAgo = (iso) => {
  const seconds = Math.round((Date.now() - new Date(iso).getTime()) / 1000);

  if (seconds < 60) return "Just now";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;

  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
};

const icons = { lesson: "✅", mock: "📝" };

function RecentActivity({ items }) {
  return (
    <section className="panel">
      <h2 className="section-title">Recent Activity</h2>

      {items.length === 0 ? (
        <p className="empty-text">
          Complete a lesson or take a mock test, and it will show up here.
        </p>
      ) : (
        items.map((item, index) => (
          <div className="activity-item" key={index}>
            <div className="activity-icon">{icons[item.type]}</div>
            <div>
              <p className="activity-text">{item.text}</p>
              <span className="activity-time">{timeAgo(item.at)}</span>
            </div>
          </div>
        ))
      )}
    </section>
  );
}

export default RecentActivity;