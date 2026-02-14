
// // src/controller/LevelController.js
// import { LevelService } from "../Service/LevelService.js";
// import { TimerController } from "../controller/TimerController.js";

// const service = new LevelService();

// // Modal
// const modal = document.getElementById("quizModal");
// const startBtn = document.querySelector(".start-btn");
// const cancelBtn = document.querySelector(".cancel-btn");

// let currentLevel = null;
// let currentQuizId = null;
// let quizUrl = ""; // URL du quiz dynamique

// // Cliquer sur une carte de quiz
// document.querySelectorAll(".quiz-card").forEach(card => {
//   card.addEventListener("click", () => {
//     currentLevel = card.dataset.level;
//     currentQuizId = card.dataset.quiz;

//     // Générer l’URL avec le service
//     quizUrl = service.getQuizUrl(currentLevel, currentQuizId);

//     // Affiche le modal
//     modal.style.display = "flex";
//   });
// });

// // Annuler modal
// cancelBtn.addEventListener("click", () => {
//   modal.style.display = "none";
// });





// //---------------------------code fct---------------
// // // Démarrer quiz
// startBtn.addEventListener("click", () => {
//   const userLoggedIn = localStorage.getItem("userId"); // ID utilisateur ou token

//   if (!userLoggedIn) {
//     // Stocke la page actuelle pour y revenir après login
//     localStorage.setItem("redirectAfterLogin", window.location.href);

//     // Redirige vers la page login
//     window.location.href = "../View/login.html";
//     return;
//   }

//   // Si connecté → démarrer le quiz
//   modal.style.display = "none";
//   window.location.href = quizUrl;
// });


// ===== BOUTON START QUIZ =====


// ==============================
// le code au dessus est la version qui marche tres bien 
// ==============================


import { LevelService } from "../Service/LevelService.js";
import { TimerController } from "../controller/TimerController.js";

const service = new LevelService();

// ==============================
// DOM
// ==============================
const modal = document.getElementById("quizModal");
const startBtn = document.querySelector(".start-btn");
const cancelBtn = document.querySelector(".cancel-btn");

// ==============================
// STATE
// ==============================
let currentLevel = null;
let currentQuizId = null;
let quizUrl = null;

// ==============================
// CLICK SUR UNE CARTE DE QUIZ
// ==============================
document.querySelectorAll(".quiz-card").forEach(card => {
  card.addEventListener("click", () => {
    currentLevel = card.dataset.level;
    currentQuizId = card.dataset.quiz;

    // Générer l’URL du quiz
    // ERROR HANDLING: the service may fail or return undefined in some cases
    try {
      quizUrl = service.getQuizUrl(currentLevel, currentQuizId);
      if (!quizUrl) throw new Error('Invalid quiz URL');
    } catch (err) {
      console.error('Error generating quiz URL:', err);
      alert('Impossible de démarrer le quiz pour le moment.');
      return; // abort showing modal
    }

    // Ouvrir le modal
    modal.style.display = "flex";
  });
});

// ==============================
// ANNULER MODAL
// ==============================
cancelBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// ==============================
// START QUIZ
// ==============================
startBtn.addEventListener("click", () => {
  const userId = localStorage.getItem("userId");

  // 🔒 Sécurité : utilisateur non connecté
  if (!userId) {
    localStorage.setItem("redirectAfterLogin", window.location.href);
    window.location.href = "../View/login.html";
    return;
  }

  // Fermer le modal
  modal.style.display = "none";

  // ✅ Sauvegarder les infos du quiz pour le timer / score
  localStorage.setItem("currentQuizId", currentQuizId);

  // ✅ Démarrer le timer AU MOMENT DU START
  // ERROR HANDLING: TimerController should be robust; catch unexpected errors
  try {
    new TimerController(async () => {
    const quizId = localStorage.getItem("currentQuizId");

    // ⛔ Temps écoulé → quiz terminé
    window.location.href = `../View/score.html?quiz=${quizId}&score=0`;
    });
  } catch (err) {
    console.error('Timer error:', err);
    // Still proceed to quiz page — timer is optional
  }

  // Redirection vers la page quiz
  window.location.href = quizUrl;
});

// Expose logout to global so header buttons can call it
window.logout = function () {
  try {
    localStorage.removeItem('userId');
  } catch (err) {
    console.warn('Could not remove userId from localStorage', err);
  }
  // Redirect to home (same folder)
  window.location.href = './home.html';
};
