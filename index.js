/* // ============================
// MENU PRINCIPAL (toggle)
// ============================

const menuTitle = document.querySelector(".menu-title");
const menuItems = document.querySelectorAll(".menu-item");

// cacher le menu au chargement
menuItems.forEach(item => {
    item.style.display = "none";
});

// toggle menu au clic
menuTitle.addEventListener("click", () => {
    menuItems.forEach(item => {
        item.style.display =
            item.style.display === "none" ? "block" : "none";
    });
});


// ============================
// SUBMENU QUIZ (Levels)
// ============================

let quizItem = null;

// trouver le menu Quiz
menuItems.forEach(item => {
    if (item.textContent.trim().startsWith("Quiz")) {
        quizItem = item;
    }
});

const submenu = quizItem ? quizItem.querySelector(".submenu") : null;

// cacher les levels au départ
if (submenu) {
    submenu.style.display = "none";
}

// toggle levels
if (quizItem && submenu) {
    quizItem.addEventListener("click", (e) => {
        e.stopPropagation();
        submenu.style.display =
            submenu.style.display === "none" ? "block" : "none";
    });
}


// ============================
// LEVEL CLICK
// ============================

const levels = document.querySelectorAll(".level");

levels.forEach(level => {
    level.addEventListener("click", (e) => {
        e.stopPropagation();
        alert(level.textContent + " selected");
    });
});
 */



// ============================================
// QUIZ APP - NAVIGATION & MENU CONTROLLER
// ============================================

// This file controls:
// 1. Menu toggle (show/hide)
// 2. Level submenu (show/hide)
// 3. Navigation to pages
// 4. Logout functionality


// ============================================
// 1. MENU TOGGLE - Show/Hide Menu Items
// ============================================

// Get the menu button and all menu items
const menuTitle = document.querySelector(".menu-title");
const menuItems = document.querySelectorAll(".menu-item");

// Hide all menu items when page loads
menuItems.forEach(item => item.style.display = "none");

// When user clicks menu button, toggle show/hide
menuTitle.addEventListener("click", () => {
    menuItems.forEach(item => {
        // If item is hidden, show it. If shown, hide it.
        item.style.display = item.style.display === "none" ? "block" : "none";
    });
});


// ============================================
// 2. LOGOUT BUTTON - Clear Data & Go to Login
// ============================================

const logoutBtn = document.querySelector(".logout-btn");

// When user clicks logout
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        // Step 1: Clear saved user information
        localStorage.removeItem("userToken");    // Remove saved token
        localStorage.removeItem("userId");       // Remove saved user ID
        sessionStorage.clear();                  // Clear all session data
        
        // Step 2: Send user back to login page
        window.location.href = "./login.html";
    });
}


// ============================================
// 3. QUIZ SUBMENU - Show/Hide Level Options
// ============================================

// Find the "Quiz" menu item
let quizItem = null;
menuItems.forEach(item => {
    if (item.textContent.trim().startsWith("Quiz")) {
        quizItem = item;
    }
});

// Get the submenu (Level 1, 2, 3 options) under Quiz
const submenu = quizItem ? quizItem.querySelector(".submenu") : null;

// Hide levels when page loads
if (submenu) submenu.style.display = "none";

// When user clicks Quiz, toggle show/hide levels
if (quizItem && submenu) {
    quizItem.addEventListener("click", (e) => {
        e.stopPropagation();  // Don't trigger other clicks
        submenu.style.display = submenu.style.display === "none" ? "block" : "none";
    });
}


// ============================================
// 4. NAVIGATION MAP - Where Each Menu Item Goes
// ============================================

// This is a simple lookup table
// Key (left) = menu item text (lowercase)
// Value (right) = HTML file to open
const pageMap = {
    "home": "./home.html",
    "accueil": "./home.html",
    "quiz": null,              // Quiz doesn't navigate, just shows levels
    "level 1": "./level1.html",
    "level 2": "./level2.html",
    "level 3": "./level3.html",
    "score": "./score.html",
    "ranking": "./ranking.html",
    "contact": "./contact.html"
};


// ============================================
// 5. CLICK ON LEVELS (Level 1, 2, 3)
// ============================================

const levels = document.querySelectorAll(".level");

levels.forEach(level => {
    level.addEventListener("click", (e) => {
        e.stopPropagation();  // Don't trigger other clicks
        
        // Get the level name (e.g., "Level 1") and convert to lowercase
        const levelName = level.textContent.trim().toLowerCase();
        
        // Find the URL from our map
        const url = pageMap[levelName];
        
        // If URL exists, go to that page
        if (url) {
            window.location.href = url;
        }
    });
});


// ============================================
// 6. CLICK ON MENU ITEMS (Home, Score, Ranking, etc)
// ============================================

menuItems.forEach(item => {
    item.addEventListener("click", (e) => {
        e.stopPropagation();  // Don't trigger other clicks
        
        // Get menu item name and convert to lowercase
        const name = item.textContent.trim().toLowerCase();
        
        // Don't navigate if it's the Quiz menu (it only shows levels)
        if (name.startsWith("quiz")) return;
        
        // Find the URL from our map
        const url = pageMap[name];
        
        // If URL exists, go to that page
        if (url) {
            window.location.href = url;
        }
    });
});
