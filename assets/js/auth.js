/**
 * APEX VELOCE | Vehicle Wrap & Custom Studio
 * Authentication & Client Session Engine (auth.js)
 */

(function () {
  'use strict';

  const USERS_STORAGE_KEY = 'apex_registered_users';
  const SESSION_STORAGE_KEY = 'apex_logged_user';

  // Seed default demo user if not present
  function initUsers() {
    try {
      const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY));
      if (!users || !Array.isArray(users) || users.length === 0) {
        const defaultUsers = [
          {
            name: 'Tamil',
            email: 'tamil@apexveloce.com',
            password: 'password123',
            createdAt: new Date().toISOString()
          }
        ];
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(defaultUsers));
      }
    } catch (e) {
      console.error('Error initializing users storage:', e);
    }
  }

  // Get all registered users
  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem(USERS_STORAGE_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  // Save users list
  function saveUsers(users) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }

  // Get currently logged-in user
  function getCurrentUser() {
    try {
      const session = localStorage.getItem(SESSION_STORAGE_KEY);
      return session ? JSON.parse(session) : null;
    } catch (e) {
      return null;
    }
  }

  // Register a new user
  function register(name, email, password, confirmPassword) {
    const trimmedName = (name || '').trim();
    const trimmedEmail = (email || '').trim().toLowerCase();

    if (!trimmedName) {
      return { success: false, message: 'Please enter your full name.' };
    }
    if (!trimmedEmail || !trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
      return { success: false, message: 'Please enter a valid email address.' };
    }
    if (!password || password.length < 4) {
      return { success: false, message: 'Password must be at least 4 characters.' };
    }
    if (password !== confirmPassword) {
      return { success: false, message: 'Passwords do not match. Please try again.' };
    }

    const users = getUsers();
    const existing = users.find((u) => u.email.toLowerCase() === trimmedEmail);
    if (existing) {
      return { success: false, message: 'An account with this email address already exists. Please log in.' };
    }

    const newUser = {
      name: trimmedName,
      email: trimmedEmail,
      password: password,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);

    // Auto-login newly registered user
    const sessionData = { name: newUser.name, email: newUser.email };
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData));

    updateAuthUI();

    return {
      success: true,
      message: `Welcome, ${newUser.name}! Your VIP account has been created.`,
      user: sessionData
    };
  }

  // Log in an existing user
  function login(email, password) {
    const trimmedEmail = (email || '').trim().toLowerCase();
    if (!trimmedEmail || !password) {
      return { success: false, message: 'Please provide both email and password.' };
    }

    const users = getUsers();
    const user = users.find(
      (u) => u.email.toLowerCase() === trimmedEmail && u.password === password
    );

    if (!user) {
      return { success: false, message: 'Invalid email or password. Please try again.' };
    }

    const sessionData = { name: user.name, email: user.email };
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData));

    updateAuthUI();

    return {
      success: true,
      message: `Welcome back, ${user.name}!`,
      user: sessionData
    };
  }

  // Log out current user
  function logout() {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    updateAuthUI();

    if (window.showApexToast) {
      window.showApexToast('You have been logged out successfully.', 'info');
    }

    // Redirect to home if on a restricted or portal page, otherwise reload
    const currentPath = window.location.pathname.toLowerCase();
    if (currentPath.includes('login.html') || currentPath.includes('register.html')) {
      window.location.href = 'index.html';
    } else {
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 300);
    }
  }

  // Escape HTML helper
  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Update Navbar and Mobile Drawer with User State (Login/Sign Up disabled as per requirement)
  function updateAuthUI() {
    // Header space is reserved for primary conversion CTA (Book Consultation)
    // Re-bind cart buttons if dynamically present

    if (window.ApexCart && typeof window.ApexCart.getCart === 'function') {
      const cartBadges = document.querySelectorAll('.cart-badge');
      const cart = window.ApexCart.getCart();
      const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
      cartBadges.forEach((b) => {
        b.innerText = count;
        b.style.display = count > 0 ? 'inline-flex' : 'none';
      });

      // Bind cart drawer toggle click on newly rendered cart buttons
      const newCartToggles = document.querySelectorAll('.cart-toggle-btn');
      newCartToggles.forEach((btn) => {
        btn.onclick = (e) => {
          e.preventDefault();
          if (window.ApexCart && typeof window.ApexCart.open === 'function') {
            window.ApexCart.open();
          }
        };
      });
    }
  }

  // Initialize on load
  document.addEventListener('DOMContentLoaded', () => {
    initUsers();
    updateAuthUI();
  });

  // Global API
  window.ApexAuth = {
    getUsers,
    getCurrentUser,
    register,
    login,
    logout,
    updateAuthUI
  };
})();
