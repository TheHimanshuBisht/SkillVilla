const express = require("express");
const cors = require("cors");

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

app.use(cors());
app.use(express.json());

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