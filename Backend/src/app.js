const express = require("express");
const cors = require("cors");

const { apiLimiter, loginLimiter, signupLimiter } = require("./middlewares/rateLimit.middleware");

const authRoutes = require("./routes/auth.routes");
const courseRoutes = require("./routes/course.routes");
const progressRoutes = require("./routes/progress.routes");
const aptitudeRoutes = require("./routes/aptitude.routes");
const mockRoutes = require("./routes/mock.routes");
const insightsRoutes = require("./routes/insights.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const settingsRoutes = require("./routes/settings.routes");
const aiRoutes = require("./routes/ai.routes");

const app = express();

// Render sits behind a proxy, so trust it to read each visitor's real address
app.set("trust proxy", 1);

const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:5173"].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, !origin || allowedOrigins.includes(origin));
    },
  })
);
app.use(express.json());

app.use("/api", apiLimiter);
app.post("/api/auth/login", loginLimiter);
app.post("/api/auth/signup", signupLimiter);

app.use("/api/auth", authRoutes);
app.use("/api", courseRoutes);
app.use("/api", progressRoutes);
app.use("/api", aptitudeRoutes);
app.use("/api", mockRoutes);
app.use("/api", insightsRoutes);
app.use("/api", dashboardRoutes);
app.use("/api", settingsRoutes);
app.use("/api", aiRoutes);

module.exports = app;