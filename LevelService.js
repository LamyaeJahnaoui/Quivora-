// src/Service/LevelService.js
export class LevelService {
  constructor() {
    this.baseUrl = "http://localhost:3000/quizzes"; // backend quizzes
  }

  // URL front-end pour redirection
  getQuizUrl(level, quizId) {
    return `quiz.html?level=${level}&quiz=${quizId}`;
  }

  // Récupérer quiz depuis backend
  async getQuizInfo(level, quizId) {
    try {
      const res = await fetch(`${this.baseUrl}?level=${level}&quizId=${quizId}`);
      if (!res.ok) throw new Error("Failed to fetch quiz info");
      return await res.json();
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
