/**
 * APEX VELOCE | Vehicle Wrap & Custom Studio
 * Animation Engine (animations.js)
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Reveal using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    function activateVisibleElements() {
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= windowHeight + 100) {
          el.classList.add('active');
        }
      });
    }

    // Immediately activate elements in view or near view
    activateVisibleElements();

    if ('IntersectionObserver' in window && revealElements.length > 0) {
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight) {
              entry.target.classList.add('active');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.01, rootMargin: '100px 0px 100px 0px' }
      );

      revealElements.forEach((el) => {
        if (!el.classList.contains('active')) {
          revealObserver.observe(el);
        }
      });
    } else {
      // Fallback: show immediately
      revealElements.forEach((el) => el.classList.add('active'));
    }

    window.addEventListener('scroll', activateVisibleElements, { passive: true });
    window.addEventListener('resize', activateVisibleElements, { passive: true });

    // 2. Animated Stats Counter
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    if ('IntersectionObserver' in window && statNumbers.length > 0) {
      const counterObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target;
              const target = parseInt(el.getAttribute('data-target'), 10) || 0;
              const suffix = el.getAttribute('data-suffix') || '';
              const prefix = el.getAttribute('data-prefix') || '';
              const duration = 2000;
              const startTime = performance.now();

              function updateCount(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out expo
                const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                const current = Math.floor(easeProgress * target);
                el.innerText = `${prefix}${current.toLocaleString()}${suffix}`;

                if (progress < 1) {
                  requestAnimationFrame(updateCount);
                } else {
                  el.innerText = `${prefix}${target.toLocaleString()}${suffix}`;
                }
              }

              requestAnimationFrame(updateCount);
              observer.unobserve(el);
            }
          });
        },
        { threshold: 0.2 }
      );

      statNumbers.forEach((el) => counterObserver.observe(el));
    }
  });
})();
