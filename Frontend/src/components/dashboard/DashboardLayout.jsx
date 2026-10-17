import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import AskMe from "./AskMe";
import "../../styles/dashboard.css";

function DashboardLayout() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (err) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="dashboard-container">
      <Sidebar onLogout={handleLogout} />

      <main className="dashboard-main">
        <Topbar user={user} />

        <div className="dashboard-content">
          <Outlet context={{ user, setUser }} />
        </div>
      </main>

      <AskMe />
    </div>
  );
}

export default DashboardLayout;