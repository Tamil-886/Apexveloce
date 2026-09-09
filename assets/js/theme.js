/**
 * APEX VELOCE | Vehicle Wrap & Custom Studio
 * Theme & Direction Engine (theme.js)
 * Manages Dark Mode / Light Mode and LTR / RTL Direction with localStorage persistence.
 */

(function () {
  'use strict';

  const STORAGE_KEY_THEME = 'apex_veloce_theme';
  const STORAGE_KEY_DIR = 'apex_veloce_direction';
  
  const THEME_DARK = 'dark';
  const THEME_LIGHT = 'light';
  
  const DIR_LTR = 'ltr';
  const DIR_RTL = 'rtl';

  // =========================================================================
  // 1. Theme Management
  // =========================================================================
  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY_THEME);
    if (saved) return saved;
    return THEME_DARK;
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === THEME_DARK) {
      if (document.body) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
      }
    } else {
      if (document.body) {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
      }
    }

    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach((btn) => {
      if (theme === THEME_LIGHT) {
        btn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        btn.setAttribute('title', 'Switch to Dark Mode');
      } else {
        btn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        btn.setAttribute('title', 'Switch to Light Mode');
      }
    });

    localStorage.setItem(STORAGE_KEY_THEME, theme);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || THEME_DARK;
    const next = current === THEME_DARK ? THEME_LIGHT : THEME_DARK;
    applyTheme(next);
  }

  // =========================================================================
  // 2. Direction (LTR / RTL) Management
  // =========================================================================
  function getPreferredDirection() {
    const saved = localStorage.getItem(STORAGE_KEY_DIR);
    if (saved) return saved;
    return DIR_LTR;
  }

  function applyDirection(dir) {
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('data-dir', dir);
    
    if (dir === DIR_RTL) {
      if (document.body) {
        document.body.classList.add('rtl-mode');
        document.body.classList.remove('ltr-mode');
      }
    } else {
      if (document.body) {
        document.body.classList.add('ltr-mode');
        document.body.classList.remove('rtl-mode');
      }
    }

    // Update all LTR/RTL toggle buttons across navbar and drawer
    const dirBtns = document.querySelectorAll('.dir-toggle-btn');
    dirBtns.forEach((btn) => {
      if (dir === DIR_RTL) {
        btn.innerHTML = '<span class="dir-badge">RTL</span> <i class="fa-solid fa-right-left"></i>';
        btn.setAttribute('title', 'Switch to LTR (Left-to-Right)');
        btn.setAttribute('aria-label', 'Switch to LTR (Left-to-Right)');
      } else {
        btn.innerHTML = '<span class="dir-badge">LTR</span> <i class="fa-solid fa-right-left"></i>';
        btn.setAttribute('title', 'Switch to RTL (Right-to-Left)');
        btn.setAttribute('aria-label', 'Switch to RTL (Right-to-Left)');
      }
    });

    localStorage.setItem(STORAGE_KEY_DIR, dir);
  }

  function toggleDirection() {
    const current = document.documentElement.getAttribute('dir') || DIR_LTR;
    const next = current === DIR_LTR ? DIR_RTL : DIR_LTR;
    applyDirection(next);
    if (window.showApexToast) {
      window.showApexToast('Switched layout direction to ' + next.toUpperCase(), 'success');
    }
  }

  // Apply immediately before parse finishes
  const initialTheme = getPreferredTheme();
  const initialDir = getPreferredDirection();
  document.documentElement.setAttribute('data-theme', initialTheme);
  document.documentElement.setAttribute('dir', initialDir);
  document.documentElement.setAttribute('data-dir', initialDir);

  // Bind event listeners on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(initialTheme);
    applyDirection(initialDir);

    // Theme toggle listeners
    document.querySelectorAll('.theme-toggle-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleTheme();
      });
    });

    // Direction toggle listeners
    document.querySelectorAll('.dir-toggle-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleDirection();
      });
    });
  });

  // Expose Global API
  window.ApexTheme = {
    getTheme: () => document.documentElement.getAttribute('data-theme') || THEME_DARK,
    setTheme: applyTheme,
    toggle: toggleTheme
  };

  window.ApexDirection = {
    getDirection: () => document.documentElement.getAttribute('dir') || DIR_LTR,
    setDirection: applyDirection,
    toggle: toggleDirection
  };
})();
