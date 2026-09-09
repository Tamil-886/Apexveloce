/**
 * APEX VELOCE | Vehicle Wrap & Custom Studio
 * Main Global Application Entry (main.js)
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    // 1. Interactive Before / After Image Comparison Slider
    const beforeAfterWrappers = document.querySelectorAll('.before-after-wrapper, .before-after-container');
    beforeAfterWrappers.forEach((wrapper) => {
      const slider = wrapper.classList.contains('before-after-container') ? wrapper : wrapper.querySelector('.before-after-container');
      if (!slider) return;

      const afterImg = slider.querySelector('.after-img');
      const handle = slider.querySelector('.slider-handle');
      const statusPill = wrapper.querySelector('.ba-split-val');
      const presetBtns = wrapper.querySelectorAll('.ba-preset-btn');
      if (!afterImg || !handle) return;

      let isDragging = false;

      function setSliderPosition(pos, isAnimated = false) {
        if (pos < 0) pos = 0;
        if (pos > 100) pos = 100;

        if (isAnimated) {
          afterImg.classList.add('animating');
          handle.classList.add('animating');
          setTimeout(() => {
            afterImg.classList.remove('animating');
            handle.classList.remove('animating');
          }, 450);
        } else {
          afterImg.classList.remove('animating');
          handle.classList.remove('animating');
        }

        afterImg.style.clipPath = `polygon(0 0, ${pos}% 0, ${pos}% 100%, 0 100%)`;
        handle.style.left = `${pos}%`;

        if (statusPill) {
          statusPill.innerText = `${Math.round(pos)}%`;
        }

        presetBtns.forEach((btn) => {
          const p = parseInt(btn.getAttribute('data-ba-preset'), 10);
          if (Math.abs(p - pos) < 3) {
            btn.classList.add('active');
          } else {
            btn.classList.remove('active');
          }
        });
      }

      function updateSlider(xPos) {
        const rect = slider.getBoundingClientRect();
        const pos = ((xPos - rect.left) / rect.width) * 100;
        setSliderPosition(pos, false);
      }

      // Presets
      presetBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const targetPos = parseInt(btn.getAttribute('data-ba-preset'), 10) || 50;
          setSliderPosition(targetPos, true);
        });
      });

      // Mouse Events
      slider.addEventListener('mousedown', (e) => {
        isDragging = true;
        handle.classList.add('dragging');
        updateSlider(e.clientX);
      });

      window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        updateSlider(e.clientX);
      });

      window.addEventListener('mouseup', () => {
        if (isDragging) {
          isDragging = false;
          handle.classList.remove('dragging');
        }
      });

      // Touch Events (Mobile/Tablet)
      slider.addEventListener('touchstart', (e) => {
        isDragging = true;
        handle.classList.add('dragging');
        if (e.touches[0]) updateSlider(e.touches[0].clientX);
      }, { passive: true });

      window.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        if (e.touches[0]) updateSlider(e.touches[0].clientX);
      }, { passive: true });

      window.addEventListener('touchend', () => {
        if (isDragging) {
          isDragging = false;
          handle.classList.remove('dragging');
        }
      });
    });

    // 2. Current Year in Footer
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach((el) => {
      el.innerText = currentYear;
    });

    // 3. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });

    // 4. Interactive Swatch Lab Filtering
    const swatchFilterBtns = document.querySelectorAll('.swatch-filter-btn');
    const swatchCards = document.querySelectorAll('.swatch-card');

    if (swatchFilterBtns.length > 0 && swatchCards.length > 0) {
      swatchFilterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          swatchFilterBtns.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');

          const filter = btn.getAttribute('data-swatch-filter');

          swatchCards.forEach((card) => {
            const category = card.getAttribute('data-swatch-category');
            if (filter === 'all' || category === filter) {
              card.style.display = 'flex';
              card.style.opacity = '0';
              card.style.transform = 'scale(0.96)';
              setTimeout(() => {
                card.style.transition = 'all 0.35s ease';
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
              }, 40);
            } else {
              card.style.display = 'none';
            }
          });
        });
      });
    }

    // 5. Interactive FAQ Accordion
    const faqHeaders = document.querySelectorAll('.faq-header');
    faqHeaders.forEach((header) => {
      header.addEventListener('click', () => {
        const item = header.closest('.faq-item');
        const body = item.querySelector('.faq-body');
        const isActive = item.classList.contains('active');

        // Close other items
        document.querySelectorAll('.faq-item').forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherBody = otherItem.querySelector('.faq-body');
            if (otherBody) otherBody.style.maxHeight = null;
          }
        });

        if (isActive) {
          item.classList.remove('active');
          body.style.maxHeight = null;
        } else {
          item.classList.add('active');
          body.style.maxHeight = body.scrollHeight + 'px';
        }
      });
    });

    // Auto-open first FAQ item
    const firstFaq = document.querySelector('.faq-item');
    if (firstFaq) {
      firstFaq.classList.add('active');
      const firstBody = firstFaq.querySelector('.faq-body');
      if (firstBody) firstBody.style.maxHeight = firstBody.scrollHeight + 'px';
    }

    // 6. Supercar Image Glider Engine (Multi-Slide, 3D Tilt, Auto-Glider & Swipe Physics)
    const heroGliders = document.querySelectorAll('.hero-glider-wrapper');
    heroGliders.forEach((wrapper) => {
      const card = wrapper.querySelector('.hero-glider-card');
      const track = wrapper.querySelector('.hero-glider-track');
      if (!card || !track) return;

      const slides = track.querySelectorAll('.hero-glider-slide');
      const prevBtn = wrapper.querySelector('.hero-glider-nav.prev');
      const nextBtn = wrapper.querySelector('.hero-glider-nav.next');
      const dots = wrapper.querySelectorAll('.hero-glider-dot');
      const currentLabel = wrapper.querySelector('#gliderCurrent');
      const totalLabel = wrapper.querySelector('#gliderTotal');
      const floatingBadges = wrapper.querySelectorAll('.floating-badge, .floating-badge-pill');

      let currentIndex = 0;
      const totalSlides = slides.length;
      let autoPlayTimer = null;
      let isDragging = false;
      let startX = 0;
      let currentTranslate = 0;
      let prevTranslate = 0;
      let animationID = 0;

      if (totalLabel) {
        totalLabel.innerText = totalSlides < 10 ? `0${totalSlides}` : totalSlides;
      }

      function updateGlider(index, animate = true) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        currentIndex = index;

        track.style.transition = animate ? 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)' : 'none';
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        slides.forEach((s, idx) => {
          if (idx === currentIndex) {
            s.classList.add('active');
          } else {
            s.classList.remove('active');
          }
        });

        dots.forEach((dot, idx) => {
          if (idx === currentIndex) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });

        if (currentLabel) {
          currentLabel.innerText = currentIndex + 1 < 10 ? `0${currentIndex + 1}` : currentIndex + 1;
        }

        prevTranslate = -currentIndex * card.offsetWidth;
        currentTranslate = prevTranslate;
      }

      function nextSlide() {
        updateGlider(currentIndex + 1);
      }

      function prevSlide() {
        updateGlider(currentIndex - 1);
      }

      if (nextBtn) nextBtn.addEventListener('click', (e) => { e.preventDefault(); nextSlide(); });
      if (prevBtn) prevBtn.addEventListener('click', (e) => { e.preventDefault(); prevSlide(); });

      dots.forEach((dot) => {
        dot.addEventListener('click', (e) => {
          e.preventDefault();
          const targetIndex = parseInt(dot.getAttribute('data-slide'), 10) || 0;
          updateGlider(targetIndex);
        });
      });

      // Auto-Play Glider
      function startAutoPlay() {
        stopAutoPlay();
        autoPlayTimer = setInterval(nextSlide, 4500);
      }

      function stopAutoPlay() {
        if (autoPlayTimer) {
          clearInterval(autoPlayTimer);
          autoPlayTimer = null;
        }
      }

      wrapper.addEventListener('mouseenter', stopAutoPlay);
      wrapper.addEventListener('mouseleave', startAutoPlay);
      wrapper.addEventListener('touchstart', stopAutoPlay, { passive: true });
      wrapper.addEventListener('touchend', startAutoPlay);

      startAutoPlay();

      // Touch & Mouse Drag Swipe
      function getPositionX(e) {
        return e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
      }

      function dragStart(e) {
        if (e.type === 'mousedown' && e.button !== 0) return;
        isDragging = true;
        startX = getPositionX(e);
        animationID = requestAnimationFrame(animation);
        card.style.cursor = 'grabbing';
      }

      function dragMove(e) {
        if (!isDragging) return;
        const currentX = getPositionX(e);
        const diff = currentX - startX;
        currentTranslate = prevTranslate + diff;
      }

      function animation() {
        if (isDragging) {
          track.style.transition = 'none';
          track.style.transform = `translateX(${currentTranslate}px)`;
          requestAnimationFrame(animation);
        }
      }

      function dragEnd() {
        if (!isDragging) return;
        isDragging = false;
        cancelAnimationFrame(animationID);
        card.style.cursor = 'grab';

        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -50) {
          nextSlide();
        } else if (movedBy > 50) {
          prevSlide();
        } else {
          updateGlider(currentIndex);
        }
      }

      card.addEventListener('mousedown', dragStart);
      window.addEventListener('mousemove', dragMove);
      window.addEventListener('mouseup', dragEnd);

      card.addEventListener('touchstart', dragStart, { passive: true });
      card.addEventListener('touchmove', dragMove, { passive: true });
      card.addEventListener('touchend', dragEnd);

      // 3D Perspective Tilt on Mouse Movement
      wrapper.addEventListener('mousemove', (e) => {
        if (window.innerWidth < 992) return;
        const rect = wrapper.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const rotateX = -(y / (rect.height / 2)) * 8;
        const rotateY = (x / (rect.width / 2)) * 8;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;

        floatingBadges.forEach((badge, i) => {
          const depth = (i + 1) * 6 + 15;
          const shiftX = (x / (rect.width / 2)) * depth;
          const shiftY = (y / (rect.height / 2)) * depth;
          badge.style.transform = `translate3d(${shiftX}px, ${shiftY}px, ${depth}px)`;
        });
      });

      wrapper.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        floatingBadges.forEach((badge) => {
          badge.style.transform = '';
        });
      });
    });
  });
})();
