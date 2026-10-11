import { useLocation } from "react-router-dom";

const titles = {
  "/dashboard": "Dashboard",
  "/my-learning": "My Learning",
  "/progress": "Progress",
  "/settings": "Settings",
};

function getTitle(pathname) {
  if (titles[pathname]) return titles[pathname];
  if (pathname.startsWith("/courses/")) return "Course Details";
  if (pathname.startsWith("/lessons/")) return "Lesson";
  return "SkillVilla";
}

function Topbar({ user }) {
  const { pathname } = useLocation();

  return (
    <header className="topbar">
      <span className="topbar-title">{getTitle(pathname)}</span>
      <div className="topbar-user">
        <span>{user.name}</span>
        <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
      </div>
    </header>
  );
}

export default Topbar;