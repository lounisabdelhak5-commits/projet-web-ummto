const API_BASE = SafeStorage.getItem('apiBase') || (
  window.location.origin.includes('localhost') || window.location.origin.includes('127.0.0.1')
    ? '' : 'https://lntech-backend.onrender.com'
);

function apiPost(path, data) {
  return fetch(API_BASE + '/api' + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(r => r.json()).catch(() => null);
}

if (!SafeStorage.getItem('users')) {
  SafeStorage.setItem('users', JSON.stringify([
    { name: "Utilisateur Test", email: "test@lntech.dz", password: "Password1" }
  ]));
}

async function handleRegister(event) {
  event.preventDefault();
  
  const nameInput = document.getElementById('reg-name');
  const emailInput = document.getElementById('reg-email');
  const passwordInput = document.getElementById('reg-password');
  
  const errorMsg = document.getElementById('reg-error');
  errorMsg.textContent = '';
  
  const nameRegex = /^[a-zA-ZÀ-ÿ\s\-']{2,50}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^.{6,}$/;
  
  if (!nameRegex.test(nameInput.value.trim())) {
    errorMsg.textContent = "Nom invalide (minimum 2 caractères).";
    return;
  }
  
  if (!emailRegex.test(emailInput.value)) {
    errorMsg.textContent = "Adresse email invalide.";
    return;
  }
  
  if (!passwordRegex.test(passwordInput.value)) {
    errorMsg.textContent = "Le mot de passe doit contenir au moins 6 caractères.";
    return;
  }
  
  const result = await apiPost('/auth/register', {
    name: nameInput.value.trim(),
    email: emailInput.value,
    password: passwordInput.value
  });
  
  if (result && result.token) {
    SafeStorage.setItem('authToken', result.token);
    SafeStorage.setItem('currentUser', JSON.stringify(result.user));
    window.location.href = '../index.html';
    return;
  }
  
  if (result && result.error) {
    errorMsg.textContent = result.error;
    return;
  }
  
  const users = JSON.parse(SafeStorage.getItem('users') || '[]');
  const userExists = users.some(u => u.email === emailInput.value);
  if (userExists) {
    errorMsg.textContent = "Un utilisateur avec cet email existe déjà.";
    return;
  }
  users.push({ name: nameInput.value.trim(), email: emailInput.value, password: passwordInput.value });
  SafeStorage.setItem('users', JSON.stringify(users));
  SafeStorage.setItem('currentUser', JSON.stringify({ name: nameInput.value.trim(), email: emailInput.value }));
  window.location.href = '../index.html';
}

async function handleLogin(event) {
  event.preventDefault();
  
  const emailInput = document.getElementById('login-email');
  const passwordInput = document.getElementById('login-password');
  const errorMsg = document.getElementById('login-error');
  
  errorMsg.textContent = '';
  
  const result = await apiPost('/auth/login', {
    email: emailInput.value,
    password: passwordInput.value
  });
  
  if (result && result.token) {
    SafeStorage.setItem('authToken', result.token);
    SafeStorage.setItem('currentUser', JSON.stringify(result.user));
    const params = new URLSearchParams(window.location.search);
    window.location.href = params.get('redirect') || '../index.html';
    return;
  }
  
  if (result && result.error) {
    errorMsg.textContent = result.error;
    return;
  }
  
  const users = JSON.parse(SafeStorage.getItem('users') || '[]');
  const user = users.find(u => u.email === emailInput.value && u.password === passwordInput.value);
  if (user) {
    SafeStorage.setItem('currentUser', JSON.stringify({ name: user.name, email: user.email }));
    const params = new URLSearchParams(window.location.search);
    window.location.href = params.get('redirect') || '../index.html';
  } else {
    errorMsg.textContent = "Email ou mot de passe incorrect.";
  }
}

function logout() {
  SafeStorage.removeItem('currentUser');
  SafeStorage.removeItem('authToken');
  window.location.href = 'index.html';
}

function updateAuthUI() {
  const currentUser = JSON.parse(SafeStorage.getItem('currentUser'));
  const authLinks = document.getElementById('auth-links');
  const userGreeting = document.getElementById('user-greeting');
  
  if (currentUser) {
    if (authLinks) authLinks.style.display = 'none';
    if (userGreeting) {
      userGreeting.style.display = 'flex';
      userGreeting.innerHTML = `
        <span class="auth-greeting">Salut, ${currentUser.name}</span>
        <button onclick="logout()" class="btn btn-outline auth-logout-btn">Déconnexion</button>
      `;
    }
  } else {
    if (authLinks) authLinks.style.display = 'flex';
    if (userGreeting) userGreeting.style.display = 'none';
  }
}

function getAuthToken() {
  return SafeStorage.getItem('authToken');
}

document.addEventListener('DOMContentLoaded', () => {
  const regForm = document.getElementById('register-form');
  if (regForm) regForm.addEventListener('submit', handleRegister);
  
  const loginForm = document.getElementById('login-form');
  if (loginForm) loginForm.addEventListener('submit', handleLogin);
  
  updateAuthUI();
});
