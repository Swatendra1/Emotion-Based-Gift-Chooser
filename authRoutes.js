const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/signup", async (req, res) => {
  await User.create(req.body);
  res.json({ message: "Signup successful" });
});

router.post("/login", async (req, res) => {
  const user = await User.findOne(req.body);
  if (user) res.json({ success: true });
  else res.json({ success: false });
});

module.exports = router;
