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

  // Update Navbar and Mobile Drawer with User State
  function updateAuthUI() {
    const user = getCurrentUser();
    const desktopAuthContainer = document.querySelector('.nav-auth-group');
    const drawerAuthContainer = document.querySelector('.drawer-auth-group');

    // 1. Desktop Navbar Update
    if (desktopAuthContainer) {
      if (user) {
        desktopAuthContainer.innerHTML = `
          <div class="user-dropdown-wrap" id="userDropdownWrap">
            <button type="button" class="user-profile-btn" id="userProfileBtn" aria-expanded="false" aria-label="User Account Menu">
              <i class="fa-solid fa-circle-user"></i>
              <span class="user-display-name">${escapeHtml(user.name)}</span>
              <i class="fa-solid fa-chevron-down dropdown-caret"></i>
            </button>
            <div class="user-dropdown-menu" id="userDropdownMenu">
              <div class="user-dropdown-header">
                <div class="user-dd-name">${escapeHtml(user.name)}</div>
                <div class="user-dd-email">${escapeHtml(user.email)}</div>
              </div>
              <div class="user-dropdown-divider"></div>
              <a href="services.html" class="user-dropdown-item"><i class="fa-solid fa-layer-group"></i> Browse Services</a>
              <a href="pricing.html" class="user-dropdown-item"><i class="fa-solid fa-calculator"></i> Build Estimator</a>
              <a href="payment.html" class="user-dropdown-item"><i class="fa-solid fa-credit-card"></i> Studio Checkout</a>
              <a href="contact.html" class="user-dropdown-item"><i class="fa-solid fa-calendar-check"></i> Book Consultation</a>
              <div class="user-dropdown-divider"></div>
              <button type="button" class="user-dropdown-item logout-btn" id="headerLogoutBtn">
                <i class="fa-solid fa-arrow-right-from-bracket"></i> Logout
              </button>
            </div>
          </div>
        `;
      } else {
        desktopAuthContainer.innerHTML = `
          <a href="register.html" class="btn btn-primary btn-sm nav-signup-btn">
            <span>Register</span> <i class="fa-solid fa-user-plus"></i>
          </a>
        `;
      }
    }

    // 2. Mobile Drawer Update
    if (drawerAuthContainer) {
      if (user) {
        drawerAuthContainer.innerHTML = `
          <div class="drawer-user-card mb-2">
            <i class="fa-solid fa-circle-user"></i>
            <div class="drawer-user-info">
              <div class="drawer-user-name">${escapeHtml(user.name)}</div>
              <div class="drawer-user-email">${escapeHtml(user.email)}</div>
            </div>
          </div>
          <div class="d-flex gap-2 mb-2">
            <button type="button" class="btn btn-secondary cart-toggle-btn" style="flex:1; width:auto; border-radius:var(--radius-sm); font-size:0.9rem;">
              <i class="fa-solid fa-cart-shopping"></i> <span>Cart</span>
              <span class="cart-badge" style="display:none; position:static; margin-left:0.4rem;">0</span>
            </button>
            <button type="button" class="btn btn-secondary logout-btn" id="drawerLogoutBtn" style="flex:1; width:auto; font-size:0.9rem; border-color:rgba(255,42,84,0.4); color:var(--primary);">
              <i class="fa-solid fa-arrow-right-from-bracket"></i> <span>Logout</span>
            </button>
          </div>
          <a href="contact.html" class="btn btn-primary" style="width:100%;"><span>Book Consultation</span> <i class="fa-solid fa-arrow-right"></i></a>
        `;
      } else {
        drawerAuthContainer.innerHTML = `
          <div class="mb-2">
            <button type="button" class="btn btn-secondary cart-toggle-btn" style="width:100%; border-radius:var(--radius-sm); font-size:0.9rem;">
              <i class="fa-solid fa-cart-shopping"></i> <span>View Cart</span>
              <span class="cart-badge" style="display:none; position:static; margin-left:0.4rem;">0</span>
            </button>
          </div>
          <a href="register.html" class="btn btn-primary mb-2"><span>Register VIP</span> <i class="fa-solid fa-user-plus"></i></a>
          <a href="contact.html" class="btn btn-secondary" style="border-color:var(--primary); color:var(--primary);"><span>Book Consultation</span> <i class="fa-solid fa-arrow-right"></i></a>
        `;
      }
    }

    // Re-bind cart buttons that might have been dynamically inserted
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

    // Bind dropdown click toggle
    const profileBtn = document.querySelector('#userProfileBtn');
    const dropdownMenu = document.querySelector('#userDropdownMenu');
    if (profileBtn && dropdownMenu) {
      profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('show');
        profileBtn.setAttribute('aria-expanded', dropdownMenu.classList.contains('show'));
      });

      document.addEventListener('click', (e) => {
        if (!e.target.closest('#userDropdownWrap')) {
          dropdownMenu.classList.remove('show');
          profileBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // Bind logout buttons
    const headerLogout = document.querySelector('#headerLogoutBtn');
    if (headerLogout) {
      headerLogout.addEventListener('click', (e) => {
        e.preventDefault();
        logout();
      });
    }

    const drawerLogout = document.querySelector('#drawerLogoutBtn');
    if (drawerLogout) {
      drawerLogout.addEventListener('click', (e) => {
        e.preventDefault();
        logout();
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
