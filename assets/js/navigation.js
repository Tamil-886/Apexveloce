/**
 * APEX VELOCE | Vehicle Wrap & Custom Studio
 * Navigation Module (navigation.js)
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.site-header');
    const mobileToggle = document.querySelector('.mobile-toggle-btn');
    const mobileDrawer = document.querySelector('.mobile-drawer');
    const drawerClose = document.querySelector('.drawer-close-btn');
    const drawerBackdrop = document.querySelector('.drawer-backdrop');

    // 1. Sticky Header Scroll Effect
    function handleScroll() {
      if (!header) return;
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 2. Mobile Drawer Controls
    function openDrawer() {
      if (mobileDrawer) mobileDrawer.classList.add('open');
      if (drawerBackdrop) drawerBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      if (mobileDrawer) mobileDrawer.classList.remove('open');
      if (drawerBackdrop) drawerBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    }

    if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('open')) {
        closeDrawer();
      }
    });

    // 3. Highlight Active Navigation Links based on current pathname
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .drawer-link');
    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (!href) return;
      const linkPath = href.split('/').pop();
      if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
        link.classList.add('active');
      } else if (currentPath.includes('admin') && href.includes('admin')) {
        // Admin active check
        if (linkPath === currentPath) link.classList.add('active');
      }
    });
  });
})();
