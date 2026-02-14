// rankingController.js
import { getRankingByQuiz } from '../Service/rankingService.js';
import { IndexService } from '../Service/IndexService.js';

const indexService = new IndexService(true);

async function loadRanking() {
  // Get quizId from URL parameter (optional - for quiz-specific ranking)
  const urlParams = new URLSearchParams(window.location.search);
  const quizId = urlParams.get('quiz') || localStorage.getItem('quizId');

  try {
    if (quizId) {
      // Load ranking for specific quiz
      const ranking = await getRankingByQuiz(quizId);
      renderRanking(ranking);
    } else {
      // Load global ranking (all quizzes)
      const response = await fetch('http://localhost:3000/ranking');
      if (!response.ok) {
        throw new Error('Failed to load ranking');
      }
      const ranking = await response.json();
      renderRanking(ranking);
    }
  } catch (err) {
    console.error('Error loading ranking:', err);
    document.getElementById('rankingList').innerHTML = '<li class="error">Failed to load ranking</li>';
  }
}

function renderRanking(data) {
  const list = document.getElementById('rankingList');
  list.innerHTML = '';

  if (!data || data.length === 0) {
    list.innerHTML = '<li class="error">No ranking data available</li>';
    return;
  }

  data.forEach((user, index) => {
    const li = document.createElement('li');

    li.className = 'rank';
    if (index === 0) li.classList.add('first');
    if (index === 1) li.classList.add('second');
    if (index === 2) li.classList.add('third');

    li.innerHTML = `
      <span class="position">${index + 1}</span>
      <span class="name">${user.nom || user.email || 'Unknown'}</span>
      <span class="score">${user.totalPoints || user.points || 0} pts</span>
    `;

    list.appendChild(li);
  });
}

// start when file loads
loadRanking();
