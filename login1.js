/* const loginForm = document.getElementById('loginForm');
const signUpForm = document.getElementById('signUpForm');
const messagePanel = document.getElementById('messagePanel');
const messageTitle = document.getElementById('messageTitle');
const messageText = document.getElementById('messageText');

const TRANSITION_TIME = 600;

document.getElementById('toSignUp').onclick = () => {
  // Fade texte
  messagePanel.classList.add('fade-text');

  // Slide forms
  loginForm.style.transform = 'translateX(100%)';
  signUpForm.style.transform = 'translateX(0)';
  signUpForm.classList.add('active');
  loginForm.classList.remove('active');

  // Changer texte après fade
  setTimeout(() => {
    messageTitle.textContent = "WELCOME!";
    messageText.textContent = "Create your account and start your journey with us";
    messagePanel.classList.remove('fade-text');
  }, 300);
};

document.getElementById('toLogin').onclick = () => {
  messagePanel.classList.add('fade-text');

  loginForm.style.transform = 'translateX(0)';
  signUpForm.style.transform = 'translateX(100%)';
  loginForm.classList.add('active');
  signUpForm.classList.remove('active');

  setTimeout(() => {
    messageTitle.textContent = "WELCOME BACK!";
    messageText.textContent = "Enter your personal details and start your journey with us";
    messagePanel.classList.remove('fade-text');
  }, 300);
};
 */







// ======== DESIGN SLIDE ========
const loginForm = document.getElementById('loginForm');
const signUpForm = document.getElementById('signUpForm');
const messagePanel = document.getElementById('messagePanel');
const messageTitle = document.getElementById('messageTitle');
const messageText = document.getElementById('messageText');

// Check URL hash to determine which form to show
if (window.location.hash === '#signup') {
  // Show signup form
  messageTitle.textContent = "WELCOME!";
  messageText.textContent = "Create your account and start your journey with us";
  loginForm.style.transform = 'translateX(100%)';
  signUpForm.style.transform = 'translateX(0)';
  signUpForm.classList.add('active');
  loginForm.classList.remove('active');
} else {
  // Show login form (default)
  messageTitle.textContent = "WELCOME BACK!";
  messageText.textContent = "Enter your personal details and start your journey with us";
  loginForm.style.transform = 'translateX(0)';
  signUpForm.style.transform = 'translateX(100%)';
  loginForm.classList.add('active');
  signUpForm.classList.remove('active');
}

document.getElementById('toSignUp').onclick = () => {
  messagePanel.classList.add('fade-text');
  loginForm.style.transform = 'translateX(100%)';
  signUpForm.style.transform = 'translateX(0)';
  signUpForm.classList.add('active');
  loginForm.classList.remove('active');

  setTimeout(() => {
    messageTitle.textContent = "WELCOME!";
    messageText.textContent = "Create your account and start your journey with us";
    messagePanel.classList.remove('fade-text');
  }, 300);
};

document.getElementById('toLogin').onclick = () => {
  messagePanel.classList.add('fade-text');
  loginForm.style.transform = 'translateX(0)';
  signUpForm.style.transform = 'translateX(100%)';
  loginForm.classList.add('active');
  signUpForm.classList.remove('active');

  setTimeout(() => {
    messageTitle.textContent = "WELCOME BACK!";
    messageText.textContent = "Enter your personal details and start your journey with us";
    messagePanel.classList.remove('fade-text');
  }, 300);
};


// ======== FONCTIONNEL ========

// Signup
signUpForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Récupérer les champs (dans  HTML, les inputs sont dans l'ordre)
  const username = signUpForm.querySelectorAll('input')[0].value;
  const email = signUpForm.querySelectorAll('input')[1].value;
  const password = signUpForm.querySelectorAll('input')[2].value;

  try {
    const res = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nom: username, email, password })
    });
    const data = await res.json();

    // Afficher le message dans messagePanel
    messageText.textContent = data.message;
    messageText.style.color = data.success ? 'green' : 'red';
    messagePanel.style.display = 'block';

    // Faire disparaître après 3 secondes
    setTimeout(() => {
      messagePanel.style.display = 'none';
    }, 3000);

    // Si signup réussi, passer au login
    if (data.success) {
      document.getElementById('toLogin').click();
    }

  } catch (err) {
    //console.error(err);

    //messageText.textContent = "Signup failed. Please try again.";
    //messageText.style.color = 'red';
   // messagePanel.style.display = 'block';
    //setTimeout(() => {
    //  messagePanel.style.display = 'none';
    //}, 3000);
  }
});

// Login
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = loginForm.querySelectorAll('input')[0].value;
  const password = loginForm.querySelectorAll('input')[1].value;

  try {
    const res = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    // Afficher message
    messageText.textContent = data.message;
    messageText.style.color = data.success ? 'green' : 'red';
    messagePanel.style.display = 'block';
    setTimeout(() => {
      messagePanel.style.display = 'none';
    }, 3000);

    //if (data.success) {
      // TODO : rediriger vers la page du quiz
      //window.location.href = '../../index.html';
      //console.log('Login réussi', data);

      
    //}
  //  if (data.success) {
   // Stocke l'ID utilisateur renvoyé par le backend
   //localStorage.setItem("userId", data.user.id); // <-- IMPORTANT : utiliser data.user.id

    // Récupère où l'utilisateur voulait aller
    //const redirectUrl = localStorage.getItem("redirectAfterLogin") || "../View/levels.html";
    //localStorage.removeItem("redirectAfterLogin");

    // Redirige vers la page souhaitée
    //window.location.href = redirectUrl;
//}
if (data.success) {
  // Stocke l'ID utilisateur
  localStorage.setItem("userId", data.user.id);

  // Récupère la page où l'utilisateur était avant login
  const redirectUrl = localStorage.getItem("redirectAfterLogin") || "./index.html"; //takes time to redirect  ??
  localStorage.removeItem("redirectAfterLogin");

  // Redirige vers cette page
  window.location.href = redirectUrl;
}


  } catch (err) {
    console.error(err);

    messageText.textContent = "Login failed. Please try again.";
    messageText.style.color = 'red';
    messagePanel.style.display = 'block';
    setTimeout(() => {
      messagePanel.style.display = 'none';
    }, 3000);
  }
});

/* // ======== FONCTIONNEL ========

// Signup
signUpForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Récupérer les champs (dans  HTML, les inputs sont dans l'ordre)
  const username = signUpForm.querySelectorAll('input')[0].value;
  const email = signUpForm.querySelectorAll('input')[1].value;
  const password = signUpForm.querySelectorAll('input')[2].value;

  try {
    const res = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nom: username, email, password })
    });
    const data = await res.json();

    alert(data.message); // simple notification
    if (data.success) {
      // après signup réussi, basculer vers login
      document.getElementById('toLogin').click();
    }
  } catch (err) {
    console.error(err);
    alert('Erreur lors de la création du compte');
  }
});

// Login
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = loginForm.querySelectorAll('input')[0].value;
  const password = loginForm.querySelectorAll('input')[1].value;

  try {
    const res = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    alert(data.message); // simple notification
    if (data.success) {
      // TODO : rediriger vers la page du quiz
      window.location.href = '../../index.html'; 
      console.log('Login réussi', data);
    }
  } catch (err) {
    console.error(err);
    alert('Erreur lors de la connexion');
  }
});
 */
