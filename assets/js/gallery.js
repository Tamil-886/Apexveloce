/**
 * APEX VELOCE | Vehicle Wrap & Custom Studio
 * Advanced Interactive 10-Project Showcase Gallery & 4K Dossier Engine (gallery.js)
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = Array.from(document.querySelectorAll('.gallery-card, .gallery-item'));
    const searchInput = document.querySelector('#gallerySearchInput');
    const resultsCountEl = document.querySelector('#galleryResultsCount');

    // 1. Calculate and update badge counts on filter buttons
    function updateFilterCounts() {
      filterBtns.forEach((btn) => {
        const filterVal = btn.getAttribute('data-filter');
        let count = 0;
        if (filterVal === 'all') {
          count = galleryItems.length;
        } else {
          count = galleryItems.filter((item) => item.getAttribute('data-category') === filterVal).length;
        }

        const countBadge = btn.querySelector('.filter-count');
        if (countBadge) {
          countBadge.innerText = count;
        } else {
          const span = document.createElement('span');
          span.className = 'filter-count';
          span.innerText = count;
          btn.appendChild(span);
        }
      });
    }

    if (galleryItems.length > 0) {
      updateFilterCounts();
    }

    // 2. Active Filter & Search State
    let activeFilter = 'all';
    let searchQuery = '';

    function filterGallery() {
      let visibleCount = 0;
      const normalizedQuery = searchQuery.trim().toLowerCase();

      galleryItems.forEach((item) => {
        const category = item.getAttribute('data-category') || '';
        const title = (item.getAttribute('data-title') || item.querySelector('.gallery-card-title')?.innerText || '').toLowerCase();
        const vehicle = (item.getAttribute('data-vehicle') || item.querySelector('.gallery-vehicle-name')?.innerText || '').toLowerCase();
        const service = (item.getAttribute('data-service') || '').toLowerCase();
        const desc = (item.getAttribute('data-desc') || '').toLowerCase();
        const spec = (item.getAttribute('data-spec') || '').toLowerCase();

        const matchesCategory = activeFilter === 'all' || category === activeFilter;
        const matchesSearch = !normalizedQuery || 
                              title.includes(normalizedQuery) || 
                              vehicle.includes(normalizedQuery) || 
                              service.includes(normalizedQuery) || 
                              desc.includes(normalizedQuery) || 
                              spec.includes(normalizedQuery);

        if (matchesCategory && matchesSearch) {
          item.style.display = 'flex';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0) scale(1)';
          }, 30);
          visibleCount++;
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(15px) scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 250);
        }
      });

      if (resultsCountEl) {
        resultsCountEl.innerText = `Showing ${visibleCount} of ${galleryItems.length} builds`;
      }
    }

    // Filter Button Click Handlers
    if (filterBtns.length > 0) {
      filterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          filterBtns.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
          activeFilter = btn.getAttribute('data-filter') || 'all';
          filterGallery();
        });
      });
    }

    // Search Input Handler
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        filterGallery();
      });
    }

    // 3. Upgraded 4K Lightbox Dossier Modal
    const lightbox = document.querySelector('.lightbox-modal');
    const lightboxImg = document.querySelector('#lightboxMainImg') || document.querySelector('.lightbox-img-wrap img');
    const lightboxTitle = document.querySelector('#lightboxMainTitle') || document.querySelector('.lightbox-title');
    const lightboxDesc = document.querySelector('#lightboxMainDesc') || document.querySelector('.lightbox-desc');
    const lightboxCategory = document.querySelector('#lightboxCategoryTag') || document.querySelector('.lightbox-category');
    const lightboxVehicle = document.querySelector('#lightboxVehicleModel');
    const lightboxCounter = document.querySelector('#lightboxBuildCounter') || document.querySelector('.lightbox-counter');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-nav-btn.prev');
    const lightboxNext = document.querySelector('.lightbox-nav-btn.next');
    const lightboxInquireBtn = document.querySelector('#lightboxInquireBtn');
    const lightboxCompletedList = document.querySelector('#lightboxCompletedList');

    // Lightbox Meta Elements
    const metaFilm = document.querySelector('#lightboxMetaFilm');
    const metaCoverage = document.querySelector('#lightboxMetaCoverage');
    const metaTime = document.querySelector('#lightboxMetaTime');
    const metaWarranty = document.querySelector('#lightboxMetaWarranty');

    let currentVisibleIndex = 0;
    let currentFilteredList = [];

    function getVisibleItems() {
      return galleryItems.filter((item) => item.style.display !== 'none');
    }

    function openLightboxForIndex(index) {
      currentFilteredList = getVisibleItems();
      if (currentFilteredList.length === 0) currentFilteredList = galleryItems;

      if (index < 0) index = currentFilteredList.length - 1;
      if (index >= currentFilteredList.length) index = 0;
      currentVisibleIndex = index;

      const item = currentFilteredList[currentVisibleIndex];
      if (!item) return;

      const img = item.querySelector('.gallery-media img') || item.querySelector('img');
      const title = item.getAttribute('data-title') || 'Custom Supercar Build';
      const vehicle = item.getAttribute('data-vehicle') || 'Bespoke Automotive Build';
      const desc = item.getAttribute('data-desc') || 'Crafted with precision in the Apex Veloce Cleanroom Studio.';
      const category = item.getAttribute('data-category-name') || item.getAttribute('data-category') || 'Vehicle Wrap';

      const film = item.getAttribute('data-spec-film') || 'Premium Cast Vinyl / XPEL Armor';
      const coverage = item.getAttribute('data-spec-coverage') || 'Complete Seamless Wrap';
      const time = item.getAttribute('data-spec-time') || '4-5 Days Turnaround';
      const warranty = item.getAttribute('data-spec-warranty') || '5-Year Studio Warranty';

      let completedWorkArray = [];
      try {
        const rawCompleted = item.getAttribute('data-completed');
        if (rawCompleted) {
          completedWorkArray = JSON.parse(decodeURIComponent(rawCompleted));
        }
      } catch (err) {
        completedWorkArray = [];
      }

      if (lightboxImg && img) {
        lightboxImg.style.opacity = '0';
        setTimeout(() => {
          lightboxImg.src = img.src;
          lightboxImg.alt = title;
          lightboxImg.style.opacity = '1';
        }, 120);
      }

      if (lightboxTitle) lightboxTitle.innerText = title;
      if (lightboxVehicle) lightboxVehicle.innerHTML = `<i class="fa-solid fa-car-side"></i> ${vehicle}`;
      if (lightboxDesc) lightboxDesc.innerText = desc;
      if (lightboxCategory) lightboxCategory.innerText = category.toUpperCase();
      if (lightboxCounter) lightboxCounter.innerText = `BUILD ${currentVisibleIndex + 1} OF ${currentFilteredList.length}`;

      if (metaFilm) metaFilm.innerText = film;
      if (metaCoverage) metaCoverage.innerText = coverage;
      if (metaTime) metaTime.innerText = time;
      if (metaWarranty) metaWarranty.innerText = warranty;

      if (lightboxInquireBtn) {
        lightboxInquireBtn.href = `contact.html?project=${encodeURIComponent(title)}`;
      }

      if (lightboxCompletedList) {
        if (completedWorkArray.length > 0) {
          lightboxCompletedList.innerHTML = completedWorkArray.map(w => `<li>${w}</li>`).join('');
          lightboxCompletedList.parentElement.style.display = 'block';
        } else {
          lightboxCompletedList.parentElement.style.display = 'none';
        }
      }

      if (lightbox) {
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }

    function closeLightbox() {
      if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    }

    // Attach click triggers to gallery cards and action buttons
    galleryItems.forEach((item) => {
      // Trigger when clicking image area or view project button
      const media = item.querySelector('.gallery-media');
      const viewBtn = item.querySelector('.view-project-btn');

      if (media) {
        media.addEventListener('click', (e) => {
          const visibleItems = getVisibleItems();
          const index = visibleItems.indexOf(item);
          openLightboxForIndex(index !== -1 ? index : 0);
        });
      }

      if (viewBtn) {
        viewBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const visibleItems = getVisibleItems();
          const index = visibleItems.indexOf(item);
          openLightboxForIndex(index !== -1 ? index : 0);
        });
      }
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightboxForIndex(currentVisibleIndex - 1);
    });
    if (lightboxNext) lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightboxForIndex(currentVisibleIndex + 1);
    });

    if (lightbox) {
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
          closeLightbox();
        }
      });
    }

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      if (!lightbox || !lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        openLightboxForIndex(currentVisibleIndex - 1);
      } else if (e.key === 'ArrowRight') {
        openLightboxForIndex(currentVisibleIndex + 1);
      }
    });

  });
})();
