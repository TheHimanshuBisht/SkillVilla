import { NavLink } from "react-router-dom";

function Sidebar({ onLogout }) {
  return (
    <aside className="sidebar">
      <h2>SkillVilla</h2>
      <nav>
        <NavLink to="/dashboard" className="nav-item">Dashboard</NavLink>
        <NavLink to="/my-learning" className="nav-item">My Learning</NavLink>
        <NavLink to="/aptitude" className="nav-item">Aptitude Practice</NavLink>
        <NavLink to="/mock-tests" className="nav-item">Mock Tests</NavLink>
        <NavLink to="/sentence-checker" className="nav-item">Grammar Assistant</NavLink>
        <NavLink to="/progress" className="nav-item">Progress</NavLink>
        <NavLink to="/settings" className="nav-item">Settings</NavLink>
      </nav>
      <button className="logout-btn" onClick={onLogout}>
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;