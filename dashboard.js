/*************************
 * EMOTION QUIZ LOGIC
 *************************/

// Emotion score tracker
let emotionScore = {
  happy: 0,
  sad: 0,
  romantic: 0,
  excited: 0,
  angry: 0
};

let totalAnswers = 0;

// When user clicks quiz option
function answer(emotion) {
  emotionScore[emotion]++;
  totalAnswers++;

  console.log("Score:", emotionScore);

  // Optional: limit clicks
  if (totalAnswers >= 5) {
    document
      .querySelectorAll("#quizBox button")
      .forEach(btn => (btn.disabled = true));
  }
}

// Detect emotion automatically
function detectEmotion() {
  let finalEmotion = "happy";
  let maxScore = -1;

  for (let emo in emotionScore) {
    if (emotionScore[emo] > maxScore) {
      maxScore = emotionScore[emo];
      finalEmotion = emo;
    }
  }

  // Auto set emotion dropdown
  document.getElementById("emotion").value = finalEmotion;

  // Auto set default budget
  const budgetSelect = document.getElementById("budget");
  if (!budgetSelect.value) {
    budgetSelect.value = "500";
  }

  alert("Detected Emotion: " + finalEmotion.toUpperCase());

  // Auto load gifts
  getGifts(1);
}

/*************************
 * GIFT FETCH & DISPLAY
 *************************/

let currentPage = 1;

async function getGifts(page = 1) {
  currentPage = page;

  const emotion = document.getElementById("emotion").value;
  const budget = document.getElementById("budget").value;

  console.log("FRONTEND SEND:", emotion, budget);

  if (!emotion || !budget) {
    alert("Please select emotion and budget");
    return;
  }

  const res = await fetch("http://localhost:5000/api/gifts/detect", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      emotion: emotion,
      budget: budget,
      page: currentPage
    })
  });

  const data = await res.json();
  console.log("BACKEND RESPONSE:", data);

  const giftDiv = document.getElementById("gifts");
  giftDiv.innerHTML = "";

  if (!data.gifts || data.gifts.length === 0) {
    giftDiv.innerHTML = "<h3 style='text-align:center'>No gifts found</h3>";
    return;
  }

  /**************
   * PREMIUM GIFT CARDS
   **************/
  data.gifts.forEach(g => {
    giftDiv.innerHTML += `
      <div class="card">
        <img src="${g.image}" alt="Gift Image">
        <h4>${g.name}</h4>
        <p>Perfect for ${g.emotion.toUpperCase()} mood</p>
        <a href="${g.buyLink}" target="_blank">Buy Now</a>
      </div>
    `;
  });

  /**************
   * PAGINATION
   **************/
  const pagesDiv = document.getElementById("pages");
  pagesDiv.innerHTML = "";

  const totalPages = Math.ceil(data.total / 8);

  for (let i = 1; i <= totalPages; i++) {
    pagesDiv.innerHTML += `
      <button onclick="getGifts(${i})"
        style="${i === currentPage ? 'background:#667eea;color:#fff;' : ''}">
        ${i}
      </button>
    `;
  }
}
