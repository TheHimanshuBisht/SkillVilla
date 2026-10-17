import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MyLearning from "./pages/MyLearning";
import Progress from "./pages/Progress";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import CourseDetails from "./pages/CourseDetails";
import Lesson from "./pages/Lesson";
import Aptitude from "./pages/Aptitude";
import MockTests from "./pages/MockTests";
import SentenceChecker from "./pages/SentenceChecker";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signup" />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/courses/:id" element={<CourseDetails />} />
      <Route path="/lessons/:id" element={<Lesson />} />
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-learning" element={<MyLearning />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/aptitude" element={<Aptitude />} />
        <Route path="/mock-tests" element={<MockTests />} />
        <Route path="/sentence-checker" element={<SentenceChecker />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;