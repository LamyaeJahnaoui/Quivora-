export class ScoreService {
  constructor() {
    this.baseUrl = "http://localhost:3000/scores";
  }

  async saveScore(userId, quizId, points) {
    try {
      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          quizId,
          points,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'enregistrement du score");
      }

      return await response.json();
    } catch (error) {
      console.error("ScoreService error:", error);
      return null;
    }
  }
}
