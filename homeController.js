import { IndexService } from "../Service/IndexService.js";

// Ici on simule que l'utilisateur n'est pas connecté
const indexService = new IndexService(false); // changer en true si connecté

// ===== MENU PRINCIPAL (toggle) =====
const menuTitle = document.querySelector(".menu-title");
const menuItems = document.querySelectorAll(".menu-item");

if (menuTitle && menuItems.length > 0) {
    menuItems.forEach(item => item.style.display = "none");

    menuTitle.addEventListener("click", () => {
        menuItems.forEach(item => {
            item.style.display =
                item.style.display === "none" ? "block" : "none";
        });
    });
}

//===================== LOGOUT BUTTON ==============================

// Sélection du bouton Logout
const logoutBtn = document.querySelector(".logout-btn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        // Effacer les données de session/localStorage
        localStorage.removeItem("userToken");
        localStorage.removeItem("userId");
        sessionStorage.clear();
        
        // Redirection vers la page de login
        window.location.href = "./login.html";
    });
}

// ===== SUBMENU QUIZ (Levels) =====
let quizItem = null;
if (menuItems.length > 0) {
    menuItems.forEach(item => {
        if (item.textContent.trim().startsWith("Quiz")) quizItem = item;
    });

    const submenu = quizItem ? quizItem.querySelector(".submenu") : null;
    if (submenu) submenu.style.display = "none";

    if (quizItem && submenu) {
        quizItem.addEventListener("click", (e) => {
            e.stopPropagation();
            submenu.style.display = submenu.style.display === "none" ? "block" : "none";
        });
    }

    // ===== CLICK SUR NIVEAUX =====
    const levels = document.querySelectorAll(".level");
        // Add click handlers on levels with error handling
        levels.forEach(level => {
            level.addEventListener("click", async (e) => {
                e.stopPropagation();
                try {
                    // ERROR HANDLING: call may fail or return invalid URL
                    const pageUrl = await indexService.getPageUrl(level.textContent);
                    if (!pageUrl) throw new Error("Page URL not found");
                    window.location.href = pageUrl;
                } catch (err) {
                    // Simple, user-friendly error handling for the frontend
                    console.error("Error navigating to level page:", err);
                    alert("Impossible d'ouvrir la page du niveau. Réessayez plus tard.");
                }
            });
        });

    // ===== CLICK SUR AUTRES MENU ITEMS =====
    // Add click handlers for other menu items with error handling
    menuItems.forEach(item => {
        item.addEventListener("click", async (e) => {
            e.stopPropagation();
            try {
                const name = item.textContent.trim();

                // Ignore Quiz parent item (gère les submenus)
                if (name.startsWith("Quiz")) return;

                // ERROR HANDLING: getPageUrl can throw or return unexpected values
                const pageUrl = await indexService.getPageUrl(name);
                if (!pageUrl) throw new Error("Page URL not found");
                window.location.href = pageUrl;
            } catch (err) {
                console.error("Navigation error:", err);
                alert("Impossible d'ouvrir la page. Vérifiez votre connexion ou réessayez.");
            }
        });
    });
}

// ===== SCROLL DOWN ANIMATION (Optional) =====
const scrollDownBtn = document.querySelector(".scroll-down");
if (scrollDownBtn) {
    scrollDownBtn.addEventListener("click", () => {
        window.scrollBy({
            top: window.innerHeight,
            behavior: "smooth"
        });
    });
}
