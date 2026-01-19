const mongoose = require("mongoose");
const Gift = require("./models/Gift");

mongoose.connect("mongodb://localhost:27017/emotionGiftDB");

const emotions = ["happy", "sad", "romantic", "excited", "angry"];
const budgets = [500, 1000, 2000];

const gifts = [];

for (let emotion of emotions) {
  for (let budget of budgets) {
    for (let i = 1; i <= 20; i++) {
      gifts.push({
  name: `${emotion.toUpperCase()} Gift ${i}`,
  emotion: emotion,
  budget: budget,
  image: `https://picsum.photos/seed/${emotion}${i}/400/300`,
  buyLink: `https://www.amazon.in/s?k=${emotion}+gift+under+${budget}`
});

    }
  }
}

(async () => {
  await Gift.deleteMany({});
  await Gift.insertMany(gifts);
  console.log("✅ REAL GIFTS INSERTED:", gifts.length);
  mongoose.connection.close();
})();
