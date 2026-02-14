// indexService.js
export class IndexService {
    constructor(isLoggedIn = false) {
        this.isLoggedIn = isLoggedIn; // false = pas loggé, true = connecté
    }

    // Retourne l'URL complète du fichier HTML
    async getPageUrl(menuName) {
        const name = menuName.trim().toLowerCase();

        switch (name) {
            case "home":
            case "accueil":
                // If logged in, go to home.html, otherwise go to home.html
                return "./home.html";
            case "quiz":
            case "level 1":
                return "./level1.html";
            case "level 2":
                return "./level2.html";
            case "level 3":
                return "./level3.html";
            case "score":
                if (!this.isLoggedIn) return "./login.html"; // login obligatoire
                return "./score.html";
            case "ranking":
                if (!this.isLoggedIn) return "./login.html"; // login obligatoire
                return "./ranking.html";
            case "contact":
                return "./contact.html";
            default:
                return this.isLoggedIn ? "./index.html" : "./home.html";
        }
    }

    // Get latest quiz result from localStorage
    getLatestQuizResult() {
        try {
            const results = JSON.parse(localStorage.getItem("quizResults") || "[]");
            if (results.length === 0) {
                return null;
            }
            // Return the last result (most recent)
            return results[results.length - 1];
        } catch (error) {
            console.error("Error getting quiz results:", error);
            return null;
        }
    }

    // Save quiz result to localStorage
    saveQuizResult(levelName, score, totalQuestions, timestamp = new Date().toISOString()) {
        try {
            const results = JSON.parse(localStorage.getItem("quizResults") || "[]");

            // Attach userId when available so score page can filter by user
            const userId = localStorage.getItem('userId') || null;

            results.push({
                userId: userId, // stored as string (or null if anonymous)
                level: levelName,
                score: score,
                totalQuestions: totalQuestions,
                percentage: (score / totalQuestions * 100).toFixed(2),
                timestamp: timestamp
            });
            localStorage.setItem("quizResults", JSON.stringify(results));
            return true;
        } catch (error) {
            console.error("Error saving quiz result:", error);
            return false;
        }
    }
}
