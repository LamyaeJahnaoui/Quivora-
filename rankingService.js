export {getRankingByQuiz};

async function getRankingByQuiz(quizId) {


const response = await fetch(
    `http://localhost:3000/ranking/quiz/${quizId}`
  );

  if (!response.ok) {
    throw new Error('Failed to load ranking');
  }

  return response.json();
}
