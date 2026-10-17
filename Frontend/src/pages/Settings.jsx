import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const authHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

function Settings() {
  const { user, setUser } = useOutletContext();

  const [name, setName] = useState(user.name);
  const [nameMessage, setNameMessage] = useState({ type: "", text: "" });
  const [savingName, setSavingName] = useState(false);

  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "" });
  const [passwordMessage, setPasswordMessage] = useState({ type: "", text: "" });
  const [savingPassword, setSavingPassword] = useState(false);

  const handleNameSubmit = async (e) => {
    e.preventDefault();
    setNameMessage({ type: "", text: "" });
    setSavingName(true);

    try {
      const res = await axios.put(`${API}/api/user/profile`, { name }, authHeaders());
      setUser({ ...user, name: res.data.user.name });
      setNameMessage({ type: "success", text: "Your name has been updated." });
    } catch (err) {
      setNameMessage({
        type: "error",
        text: err.response?.data?.message || "Could not update your name",
      });
    } finally {
      setSavingName(false);
    }
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordMessage({ type: "", text: "" });
    setSavingPassword(true);

    try {
      await axios.put(`${API}/api/user/password`, passwords, authHeaders());
      setPasswords({ currentPassword: "", newPassword: "" });
      setPasswordMessage({ type: "success", text: "Your password has been updated." });
    } catch (err) {
      setPasswordMessage({
        type: "error",
        text: err.response?.data?.message || "Could not update your password",
      });
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div>
      <h2 className="section-title">Settings</h2>

      <div className="panel settings-panel">
        <h3 className="section-title">Profile</h3>
        <p className="learning-meta">Email: {user.email}</p>

        <form className="auth-form" onSubmit={handleNameSubmit}>
          <label htmlFor="name">Name</label>
          <input
            className="auth-input"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="feature-btn" type="submit" disabled={savingName}>
            {savingName ? "Saving..." : "Save name"}
          </button>
        </form>

        {nameMessage.text && (
          <p className={nameMessage.type === "success" ? "success-msg" : "auth-error"}>
            {nameMessage.text}
          </p>
        )}
      </div>

      <div className="panel settings-panel" style={{ marginTop: "16px" }}>
        <h3 className="section-title">Change password</h3>

        <form className="auth-form" onSubmit={handlePasswordSubmit}>
          <input
            className="auth-input"
            type="password"
            name="currentPassword"
            placeholder="Current password"
            value={passwords.currentPassword}
            onChange={handlePasswordChange}
          />
          <input
            className="auth-input"
            type="password"
            name="newPassword"
            placeholder="New password (min 8 characters)"
            value={passwords.newPassword}
            onChange={handlePasswordChange}
          />
          <button className="feature-btn" type="submit" disabled={savingPassword}>
            {savingPassword ? "Saving..." : "Change password"}
          </button>
        </form>

        {passwordMessage.text && (
          <p className={passwordMessage.type === "success" ? "success-msg" : "auth-error"}>
            {passwordMessage.text}
          </p>
        )}
      </div>
    </div>
  );
}

export default Settings;