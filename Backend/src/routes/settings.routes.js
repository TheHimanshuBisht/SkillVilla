const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

// Change the name
router.put("/user/profile", authMiddleware, async (req, res) => {
  try {
    const name = typeof req.body.name === "string" ? req.body.name.trim() : "";

    if (name.length < 2 || name.length > 50) {
      return res.status(400).json({ message: "Name must be between 2 and 50 characters" });
    }

        const user = await User.findByIdAndUpdate(req.user.id, { name }, { returnDocument: "after" }).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Name updated", user });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Change the password
router.put("/user/password", authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (
      typeof currentPassword !== "string" ||
      typeof newPassword !== "string" ||
      !currentPassword ||
      !newPassword
    ) {
      return res.status(400).json({ message: "Please fill in both fields" });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ message: "New password must be at least 8 characters" });
    }

    const user = await User.findById(req.user.id).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isCorrect = await bcrypt.compare(currentPassword, user.password);

    if (!isCorrect) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({ message: "New password must be different" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: "Password updated" });
  } catch (error) {
    console.error("Update password error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;