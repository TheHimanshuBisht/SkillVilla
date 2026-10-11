const express = require('express')
const cors = require('cors')
const app = express();
const authRoutes = require("./routes/auth.routes");
const courseRoutes = require("./routes/course.routes");
const progressRoutes = require("./routes/progress.routes");

app.use(express.json())
app.use(cors());

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api", courseRoutes);
app.use("/api", progressRoutes);

module.exports = app;
