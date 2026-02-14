// ===== SIGNUP FORM =====

// Prevent form submission
const signupForm = document.getElementById('signUpForm');
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
  });
}

// Handle signup button click
const signupSubmitBtn = document.getElementById('signupSubmitBtn');
if (signupSubmitBtn) {
  signupSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // Save signup data to localStorage (for now)
    const inputs = signupForm.querySelectorAll('input');
    console.log('Signup submitted');
    // Later: send data to backend
  });
}

// Go back to login when clicking "Login"
const toLogin = document.getElementById('toLogin');
if (toLogin) {
  toLogin.addEventListener('click', () => {
    window.location.href = "./login.html";
  });
}
