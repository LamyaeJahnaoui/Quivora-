// ScoreDashboardController.js
// Simple controller: fetches current user's scores and renders them as blue rectangles

async function fetchUserScores(userId) {
  try {
    const res = await fetch(`http://localhost:3000/scores/user/${userId}`);
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.error('Failed to load user scores', err);
    return [];
  }
}

function createScoreCard(score) {
  const card = document.createElement('div');
  card.className = 'score-card';

  const quiz = score.quiz || {};
  const levelName = (quiz.level && (quiz.level.name || `Level ${quiz.level.id}`)) || (score.level || 'Unknown');
  const quizLabel = quiz.quizNumber ? `Quiz ${quiz.quizNumber}` : `Quiz ${quiz.id || ''}`;

  card.innerHTML = `
    <div class="card-header">
      <div class="card-level">${levelName}</div>
      <div class="card-quiz">${quizLabel}</div>
    </div>
    <div class="card-body">
      <div class="card-score">${score.points} pts</div>
      <div class="card-meta">${new Date(score.createdAt).toLocaleString()}</div>
    </div>
  `;

  return card;
}

document.addEventListener('DOMContentLoaded', async () => {
  const userId = localStorage.getItem('userId');
  const list = document.getElementById('scoresList');

  if (!userId) {
    list.innerHTML = '<p class="no-result">Vous devez être connecté pour voir vos scores.</p>';
    return;
  }

  list.innerHTML = '<p class="loading">Chargement...</p>';

  const scores = await fetchUserScores(userId);
  list.innerHTML = '';

  if (!scores || scores.length === 0) {
    list.innerHTML = '<p class="no-result">Aucun quiz passé pour le moment.</p>';
    return;
  }

  // Render each score (scores returned are already for this user)
  scores.forEach(s => {
    const card = createScoreCard(s);
    list.appendChild(card);
  });
});

export {};
