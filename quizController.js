/*
 * - reads URL params (quiz, level)
 * - fetches questions via QuizService
 * - controls UI (show questions, handle answers)
 * - delegates score saving to backend (no score logic here)
 */

import { QuizService } from "../Service/QuizService.js";
import { ScoreService } from "../Service/ScoreService.js";
import { IndexService } from "../Service/IndexService.js";
import { TimerController } from "../controller/TimerController.js";

// -----------------------------
// URL params & auth
// -----------------------------
const urlParams = new URLSearchParams(window.location.search);
const QUIZ_ID = Number(urlParams.get("quiz"));
const LEVEL = Number(urlParams.get("level")) || 0; // fallback to 0 if not provided
const USER_ID = Number(localStorage.getItem("userId"));

// Redirect to login if not connected
if (!USER_ID) {
  localStorage.setItem("redirectAfterLogin", window.location.href);
  window.location.href = "../View/login.html";
}

// -----------------------------
// Services
// -----------------------------
const quizService = new QuizService(QUIZ_ID, LEVEL);
const scoreService = new ScoreService(); // kept for possible use
const indexService = new IndexService(true); // save results locally

// -----------------------------
// DOM elements
// -----------------------------
const questionBox = document.getElementById("questionBox");
const nextBtn = document.getElementById("nextBtn");

// ERROR HANDLING: ensure essential DOM elements exist before continuing
if (!questionBox || !nextBtn) {
  console.error('Required DOM elements missing: questionBox or nextBtn');
  // Stop initialization if elements are missing to avoid runtime errors
  // (Keeps controller simple and prevents uncaught exceptions for students)
  throw new Error('Missing quiz DOM elements');
}

// -----------------------------
// State
// -----------------------------
let questions = [];
let currentIndex = 0;
let selectedAnswer = null;
let userAnswers = [];
let timerStarted = false;

// -----------------------------
// Initialize quiz: fetch questions and start
// -----------------------------
async function initQuiz() {
  try {
    questions = await quizService.getAllQuestions();

    if (!questions || questions.length === 0) {
      questionBox.innerHTML = "<p>No questions found</p>";
      return;
    }

    showQuestion();

    // Start timer once when quiz begins
    if (!timerStarted) {
      timerStarted = true;
      // 180 seconds default (3 minutes)
      new TimerController(180, () => {
        // time up => go to score page with 0
        window.location.href = `../View/score.html?quiz=${QUIZ_ID}&score=0`;
      });
    }
  } catch (err) {
    console.error("Erreur chargement questions :", err);
    questionBox.innerHTML = "<p>Error loading quiz</p>";
  }
}

// -----------------------------
// Render current question and options
// -----------------------------
function showQuestion() {
  const q = questions[currentIndex];
  selectedAnswer = null;
  nextBtn.disabled = true;
  questionBox.innerHTML = "";

  const title = document.createElement("h2");
  title.textContent = q.text;
  questionBox.appendChild(title);

  const options = [q.optiona, q.optionb, q.optionc];
  const optionsContainer = document.createElement("div");
  optionsContainer.className = "options-container";

  options.forEach((text, idx) => {
    if (!text) return;
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = `${String.fromCharCode(65 + idx)}. ${text}`;
    btn.addEventListener("click", () => {
      selectedAnswer = idx;
      nextBtn.disabled = false;
      document.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
    });
    optionsContainer.appendChild(btn);
  });

  questionBox.appendChild(optionsContainer);
}

// -----------------------------
// Send answers to backend and handle result
// Keep controller simple: delegate score calc to backend
// -----------------------------
async function finishQuizAndRedirect() {
  try {
    const url = `http://localhost:3000/quizzes/${LEVEL}/${QUIZ_ID}/finish`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: USER_ID, answers: userAnswers }),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const scoreValue = data.score !== undefined ? data.score : 0;

    // Save for index/history
    const levelName = document.title || `Quiz ${QUIZ_ID}`;
    try {
      // ERROR HANDLING: save might fail (e.g., localStorage full) — handle it gracefully
      indexService.saveQuizResult(levelName, scoreValue, userAnswers.length);
    } catch (err) {
      console.warn('Could not save quiz result locally:', err);
    }

  // Redirect to score page and include LEVEL so score page can display level number
  window.location.href = `../View/score.html?quiz=${QUIZ_ID}&score=${scoreValue}&level=${LEVEL}`;
  } catch (err) {
    console.error("Erreur fin du quiz :", err);
    window.location.href = `../View/score.html?quiz=${QUIZ_ID}&score=0`;
  }
}

// -----------------------------
// Next button handler (advance or finish)
// -----------------------------
nextBtn.addEventListener("click", async () => {
  if (selectedAnswer === null) return;
  userAnswers.push(selectedAnswer);
  currentIndex++;

  if (currentIndex >= questions.length) {
    await finishQuizAndRedirect();
    return;
  }

  showQuestion();
});

// -----------------------------
// Start
// -----------------------------
initQuiz();
