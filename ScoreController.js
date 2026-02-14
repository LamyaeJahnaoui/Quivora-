// ============================================
// SCORE PAGE CONTROLLER
// ============================================
// This file displays the user's quiz score
// It checks: URL parameters > localStorage > empty state


// ============================================
// 1. GET SCORE DATA
// ============================================

// Get score from URL (passed when redirected from quiz)
const urlParams = new URLSearchParams(window.location.search);
const scoreFromUrl = urlParams.get("score");
const quizFromUrl = urlParams.get("quiz");
const levelFromUrl = urlParams.get("level");

// Get user ID from localStorage (saved when user logs in)
const userId = localStorage.getItem("userId");

// Get quiz results from localStorage (saved after each quiz)
const quizResultsJson = localStorage.getItem("quizResults");
const quizResults = quizResultsJson ? JSON.parse(quizResultsJson) : [];


// ============================================
// 2. FIND THE LATEST RESULT FOR THIS USER
// ============================================

function getLatestUserResult() {
  // If we have results AND they belong to the current user
  if (quizResults.length > 0 && userId) {
    // Get the LAST result (most recent)
    const lastResult = quizResults[quizResults.length - 1];
    
    // Make sure it belongs to the current user
    if (lastResult && lastResult.userId === userId) {
      return lastResult;
    }
  }
  
  // No valid result found
  return null;
}


// ============================================
// 3. DISPLAY LATEST RESULT CARD
// ============================================

function displayLatestResult() {
  const container = document.getElementById('latestResultContainer');
  const latestResult = getLatestUserResult();
  
  // If no results, show "no results" message
  if (!latestResult) {
    container.innerHTML = `
      <div class="no-result">
        <p>📝 No quiz results yet.</p>
        <p>Complete a quiz to see your latest result!</p>
      </div>
    `;
    return;
  }

  // Show the latest result
  // Determine level to display: prefer URL level (explicit), else try to parse stored level
  let levelDisplay = 'Unknown';
  if (levelFromUrl) {
    levelDisplay = `${levelFromUrl}`;
  } else if (latestResult.level) {
    // Try to extract a number from the saved level string (e.g. "Level 2" or "Quiz 1")
    const m = String(latestResult.level).match(/(\d+)/);
    if (m) levelDisplay = `Level ${m[1]}`;
    else levelDisplay = latestResult.level;
  }

  const date = new Date(latestResult.timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  container.innerHTML = `
    <div class="result-card">
      <h3>Your Latest Result</h3>
      <p><strong>Level:</strong> ${levelDisplay}</p>
      <p><strong>Score:</strong> ${latestResult.score}/${latestResult.totalQuestions}</p>
      <p><strong>Percentage:</strong> ${latestResult.percentage}%</p>
      <p><strong>Date:</strong> ${date}</p>
    </div>
  `;
}


// ============================================
// 4. DISPLAY SCORE & MESSAGE
// ============================================

function displayScore() {
  const scoreBox = document.getElementById("finalScore");
  const scoreMessage = document.getElementById("scoreMessage");
  
  let displayScore = 0;
  let totalQuestions = 5;
  let hasResult = false;
  
  // Step 1: Check if score came from URL (just took a quiz)
  if (scoreFromUrl) {
    displayScore = parseInt(scoreFromUrl);
    hasResult = true;
    console.log("Score from quiz:", displayScore);
  } 
  // Step 2: Check localStorage for latest result
  else {
    const latestResult = getLatestUserResult();
    if (latestResult) {
      displayScore = latestResult.score;
      totalQuestions = latestResult.totalQuestions;
      hasResult = true;
      console.log("Score from saved results:", displayScore);
    } else {
      console.log("No score data available");
    }
  }
  
  // If no results, hide the score box and message
  if (!hasResult) {
    if (scoreBox) scoreBox.parentElement.style.display = "none";
    if (scoreMessage) scoreMessage.style.display = "none";
    return;
  }
  
  // Show score box and message only if there's a result
  if (scoreBox) scoreBox.parentElement.style.display = "block";
  if (scoreMessage) scoreMessage.style.display = "block";
  
  // Display score in the box
  scoreBox.textContent = `${displayScore} / ${totalQuestions}`;
  
  // Show appropriate message based on score
  if (displayScore === 5) {
    scoreMessage.textContent = "Perfect!  Outstanding performance! 🌟";
  } else if (displayScore >= 4) {
    scoreMessage.textContent = "Excellent!  Great job! 🎯";
  } else if (displayScore >= 3) {
    scoreMessage.textContent = "Good!  Keep practicing! 📚";
  } else if (displayScore >= 1) {
    scoreMessage.textContent = "Not bad!  Try again to improve! 🚀";
  } else {
    scoreMessage.textContent = "Keep learning! You can do better! 📖 ";
  }
}


// ============================================
// 5. INITIALIZE - When page loads
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  console.log("Score page loaded");
  console.log("Current user ID:", userId);
  console.log("Total quiz results stored:", quizResults.length);
  
  // Display the latest result card
  displayLatestResult();
  
  // Display current score
  displayScore();
});
