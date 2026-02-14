import { IndexService } from "../Service/indexService.js";

// Initialize service
const indexService = new IndexService(false); // false = user not logged in

// ===================== LOGIN/SIGNUP BUTTONS ==============================
const loginBtn = document.querySelector(".login-btn");
const signupBtn = document.querySelector(".signup-btn");

// Login button - go to login page
if (loginBtn) {
    loginBtn.addEventListener("click", () => {
        window.location.href = "./login.html";
    });
}

// Signup button - go to signup page
if (signupBtn) {
    signupBtn.addEventListener("click", () => {
        window.location.href = "./signup.html";
    });
}

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

    // ===== SUBMENU QUIZ (Levels) =====
    let quizItem = null;
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

    // ===== CLICK ON LEVELS =====
    const levels = document.querySelectorAll(".level");

    levels.forEach(level => {
        level.addEventListener("click", async (e) => {
            e.stopPropagation();
            const pageUrl = await indexService.getPageUrl(level.textContent);
            window.location.href = pageUrl;
        });
    });

    // ===== CLICK ON MENU ITEMS =====
    menuItems.forEach(item => {
        item.addEventListener("click", async (e) => {
            e.stopPropagation();
            const name = item.textContent.trim();

            // Ignore Quiz parent item (handles submenus)
            if (name.startsWith("Quiz")) return;

            const pageUrl = await indexService.getPageUrl(name);
            window.location.href = pageUrl;
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
