
export class QuizService {
  // Accept quizId (number) and optional level (number)
  constructor(quizId, level = null) {
    this.quizId = Number(quizId);
    this.level = level !== null ? Number(level) : null;
    this.baseUrl = "http://localhost:3000/quizzes";
  }

  async getAllQuestions() {
    if (!this.quizId) {
      console.error("Quiz ID non défini !");
      return [];
    }

    try {
      // Simpler query-based URL (beginner-friendly):
      // - /quizzes?level=2&quiz=1  or /quizzes?quiz=5
      const url = this.level
        ? `${this.baseUrl}?level=${this.level}&quiz=${this.quizId}`
        : `${this.baseUrl}?quiz=${this.quizId}`;

      const res = await fetch(url);
      if (!res.ok) {
        console.error("Erreur lors du chargement des questions", res.status);
        return [];
      }

      return await res.json();
    } catch (err) {
      console.error("Erreur réseau :", err);
      return [];
    }
  }
}
