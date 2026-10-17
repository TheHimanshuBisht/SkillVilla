import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

import WelcomeCard from "../components/dashboard/WelcomeCard";
import StatsCards from "../components/dashboard/StatsCards";
import AIFeatures from "../components/dashboard/AIFeatures";
import ContinueLearning from "../components/dashboard/ContinueLearning";
import RecentActivity from "../components/dashboard/RecentActivity";

function Dashboard() {
  const { user } = useOutletContext();
  const [summary, setSummary] = useState({ continueLearning: [], recentActivity: [] });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/dashboard/summary`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSummary(res.data);
      } catch (err) {
        setSummary({ continueLearning: [], recentActivity: [] });
      }
    };

    fetchSummary();
  }, []);

  return (
    <>
      <WelcomeCard user={user} />
      <StatsCards />
      <AIFeatures />

      <div className="dashboard-grid">
        <ContinueLearning items={summary.continueLearning} />
        <RecentActivity items={summary.recentActivity} />
      </div>
    </>
  );
}

export default Dashboard;