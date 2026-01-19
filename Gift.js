const mongoose = require("mongoose");

const giftSchema = new mongoose.Schema({
  name: String,
  emotion: String,
  budget: Number,
  image: String,
  buyLink: String
});

module.exports = mongoose.model("Gift", giftSchema);
