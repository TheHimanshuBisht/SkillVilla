import { useEffect, useState } from "react";
import axios from "axios";

function StatsCards() {
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const token = localStorage.getItem("token");
        const offset = new Date().getTimezoneOffset();
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/progress?tzOffset=${offset}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProgress(res.data);
      } catch (err) {
        setProgress(null);
      }
    };

    fetchProgress();
  }, []);

  const stats = [
    { label: "Courses Started", value: progress ? progress.coursesStarted : 0, icon: "📚" },
    { label: "Lessons Completed", value: progress ? progress.totalCompleted : 0, icon: "✅" },
    { label: "Day Streak", value: progress ? progress.streak : 0, icon: "🔥" },
    { label: "Overall Progress", value: `${progress ? progress.overallPercent : 0}%`, icon: "📈" },
  ];

  return (
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
  );
}

export default StatsCards;