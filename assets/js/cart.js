/**
 * APEX VELOCE | Vehicle Wrap & Custom Studio
 * Shopping Cart & Service Booking Engine (cart.js)
 */

(function () {
  'use strict';

  const CART_STORAGE_KEY = 'apex_studio_cart';

  // Helper to load cart from localStorage
  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  // Helper to save cart to localStorage
  function saveCart(cart) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartBadges();
    renderCartDrawer();
  }

  // Update all cart count badges on page
  function updateCartBadges() {
    const cart = getCart();
    const totalCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const badges = document.querySelectorAll('.cart-badge');

    badges.forEach((badge) => {
      badge.innerText = totalCount;
      if (totalCount > 0) {
        badge.classList.remove('d-none');
        badge.style.display = 'inline-flex';
        badge.classList.add('badge-bounce');
        setTimeout(() => badge.classList.remove('badge-bounce'), 400);
      } else {
        badge.style.display = 'none';
      }
    });
  }

  // Add Item to Cart
  function addToCart(item) {
    let cart = getCart();
    const existingIndex = cart.findIndex((i) => i.id === item.id);

    if (existingIndex > -1) {
      cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
    } else {
      cart.push({
        id: item.id || 'srv-' + Date.now(),
        name: item.name || 'Custom Studio Service',
        price: parseInt(item.price, 10) || 1200,
        image: item.image || 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=400&q=80',
        tier: item.tier || 'Standard Package',
        quantity: 1
      });
    }

    saveCart(cart);

    if (window.showApexToast) {
      window.showApexToast(`Added "${item.name}" to your studio cart!`, 'success');
    }

    openCartDrawer();
  }

  // Remove Item from Cart
  function removeFromCart(id) {
    let cart = getCart();
    cart = cart.filter((item) => item.id !== id);
    saveCart(cart);

    if (window.showApexToast) {
      window.showApexToast('Item removed from studio cart.', 'error');
    }
  }

  // Update Quantity
  function updateQuantity(id, change) {
    let cart = getCart();
    const item = cart.find((i) => i.id === id);
    if (!item) return;

    item.quantity = (item.quantity || 1) + change;
    if (item.quantity <= 0) {
      removeFromCart(id);
      return;
    }

    saveCart(cart);
  }

  // Render Cart Drawer HTML
  function renderCartDrawer() {
    const drawerList = document.querySelector('#cartDrawerItems');
    const subtotalEl = document.querySelector('#cartDrawerSubtotal');
    const totalEl = document.querySelector('#cartDrawerTotal');
    const emptyState = document.querySelector('#cartDrawerEmpty');
    const footerEl = document.querySelector('#cartDrawerFooter');

    if (!drawerList) return;

    const cart = getCart();

    if (cart.length === 0) {
      drawerList.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      if (footerEl) footerEl.style.display = 'none';
      if (subtotalEl) subtotalEl.innerText = '$0';
      if (totalEl) totalEl.innerText = '$0';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (footerEl) footerEl.style.display = 'block';

    let subtotal = 0;
    drawerList.innerHTML = '';

    cart.forEach((item) => {
      const itemTotal = item.price * (item.quantity || 1);
      subtotal += itemTotal;

      const itemEl = document.createElement('div');
      itemEl.className = 'cart-item';
      itemEl.innerHTML = `
        <div class="cart-item-img">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
          <div class="d-flex justify-between align-center mb-1">
            <h5 class="cart-item-title">${item.name}</h5>
            <button class="cart-item-remove" data-id="${item.id}" title="Remove Service">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
          <span class="badge badge-primary mb-2" style="font-size:0.68rem; padding:0.2rem 0.5rem;">${item.tier}</span>
          <div class="d-flex justify-between align-center">
            <div class="cart-qty-control">
              <button class="qty-btn qty-minus" data-id="${item.id}">-</button>
              <span class="qty-val">${item.quantity || 1}</span>
              <button class="qty-btn qty-plus" data-id="${item.id}">+</button>
            </div>
            <span class="cart-item-price">$${itemTotal.toLocaleString()}</span>
          </div>
        </div>
      `;
      drawerList.appendChild(itemEl);
    });

    if (subtotalEl) subtotalEl.innerText = `$${subtotal.toLocaleString()}`;
    if (totalEl) totalEl.innerText = `$${subtotal.toLocaleString()}`;

    // Bind item buttons
    drawerList.querySelectorAll('.cart-item-remove').forEach((btn) => {
      btn.addEventListener('click', () => {
        removeFromCart(btn.getAttribute('data-id'));
      });
    });

    drawerList.querySelectorAll('.qty-minus').forEach((btn) => {
      btn.addEventListener('click', () => {
        updateQuantity(btn.getAttribute('data-id'), -1);
      });
    });

    drawerList.querySelectorAll('.qty-plus').forEach((btn) => {
      btn.addEventListener('click', () => {
        updateQuantity(btn.getAttribute('data-id'), 1);
      });
    });
  }

  // Open & Close Cart Drawer
  function openCartDrawer() {
    const drawer = document.querySelector('#cartDrawer');
    const backdrop = document.querySelector('#cartBackdrop');
    if (drawer) drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    renderCartDrawer();
  }

  function closeCartDrawer() {
    const drawer = document.querySelector('#cartDrawer');
    const backdrop = document.querySelector('#cartBackdrop');
    if (drawer) drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    updateCartBadges();
    renderCartDrawer();

    // Toggle drawer buttons
    const cartToggles = document.querySelectorAll('.cart-toggle-btn');
    cartToggles.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openCartDrawer();
      });
    });

    // Robust multi-selector close bindings
    const closeSelectors = '#cartDrawerClose, #cartBackdrop, #cartContinueShopping, #cartContinueCustomizing, .cart-continue-btn, [data-cart-close]';
    
    document.querySelectorAll(closeSelectors).forEach((btn) => {
      btn.addEventListener('click', (e) => {
        if (btn.tagName.toLowerCase() === 'button') {
          e.preventDefault();
        }
        closeCartDrawer();
      });
    });

    // Global document event delegation for cart closing
    document.addEventListener('click', (e) => {
      const closeTarget = e.target.closest(closeSelectors);
      if (closeTarget) {
        if (closeTarget.tagName.toLowerCase() === 'button') {
          e.preventDefault();
        }
        closeCartDrawer();
      }
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeCartDrawer();
    });

    // Bind all "Add to Cart" triggers
    document.addEventListener('click', (e) => {
      const target = e.target.closest('[data-add-cart]');
      if (target) {
        e.preventDefault();
        const id = target.getAttribute('data-id') || 'srv-' + Date.now();
        const name = target.getAttribute('data-name') || 'Vehicle Custom Service';
        const price = target.getAttribute('data-price') || 2800;
        const image = target.getAttribute('data-image') || 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=400&q=80';
        const tier = target.getAttribute('data-tier') || 'Standard Tier';

        addToCart({ id, name, price, image, tier });
      }
    });
  });

  // Global API
  window.ApexCart = {
    getCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    open: openCartDrawer,
    close: closeCartDrawer
  };
})();
