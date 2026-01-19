const express = require("express");
const router = express.Router(); // ✅ ROUTER DEFINE (YAHI MISSING THA)
const Gift = require("../models/Gift");

router.post("/detect", async (req, res) => {
  console.log("REQ BODY:", req.body);

  const { emotion, budget, page = 1 } = req.body;
  const limit = 8;
  const skip = (page - 1) * limit;

  try {
    const gifts = await Gift.find({
      emotion: emotion,
      budget: Number(budget)
    })
      .skip(skip)
      .limit(limit);

    const total = await Gift.countDocuments({
      emotion: emotion,
      budget: Number(budget)
    });

    console.log("FOUND GIFTS:", gifts.length);
    res.json({ gifts, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router; // ✅ EXPORT ROUTER
