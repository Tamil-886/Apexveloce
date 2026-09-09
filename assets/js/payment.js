/**
 * APEX VELOCE | Vehicle Wrap & Custom Studio
 * Payment & Checkout Engine (payment.js)
 */

(function () {
  'use strict';

  const CART_STORAGE_KEY = 'apex_studio_cart';
  const RECENT_ORDER_KEY = 'apex_recent_order';
  const ORDER_HISTORY_KEY = 'apex_order_history';

  // Valid Studio Promo Codes
  const PROMO_CODES = {
    'APEXVIP10': { type: 'percent', value: 0.10, label: 'VIP Client 10% Off' },
    'STUDIO500': { type: 'flat', value: 500, label: 'SEMA Launch $500 Off' },
    'FIRSTWRAP': { type: 'percent', value: 0.15, label: 'First Build 15% Off' },
    'XPELSHIELD': { type: 'flat', value: 250, label: 'XPEL Armor Credit $250 Off' }
  };

  let appliedCoupon = null;

  // Helper to load cart from localStorage
  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  // Calculate Subtotal & Totals
  function calculateTotals(cart) {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    let discount = 0;

    if (appliedCoupon) {
      if (appliedCoupon.type === 'percent') {
        discount = Math.round(subtotal * appliedCoupon.value);
      } else if (appliedCoupon.type === 'flat') {
        discount = Math.min(subtotal, appliedCoupon.value);
      }
    }

    const total = Math.max(0, subtotal - discount);
    return { subtotal, discount, total };
  }

  // Render Order Summary
  function renderOrderSummary() {
    const itemsList = document.querySelector('#checkoutItemsList');
    const subtotalEl = document.querySelector('#checkoutSubtotal');
    const discountRow = document.querySelector('#checkoutDiscountRow');
    const discountValEl = document.querySelector('#checkoutDiscountVal');
    const totalEl = document.querySelector('#checkoutTotalAmount');
    const btnAmountEl = document.querySelector('#payBtnAmount');
    const emptyState = document.querySelector('#checkoutEmptyState');
    const mainForm = document.querySelector('#paymentForm');

    const cart = getCart();

    if (cart.length === 0) {
      if (itemsList) itemsList.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      if (mainForm) mainForm.style.opacity = '0.5';
      if (subtotalEl) subtotalEl.innerText = '$0';
      if (totalEl) totalEl.innerText = '$0';
      if (btnAmountEl) btnAmountEl.innerText = '$0';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (mainForm) mainForm.style.opacity = '1';

    if (itemsList) {
      itemsList.innerHTML = '';
      cart.forEach((item) => {
        const itemTotal = item.price * (item.quantity || 1);
        const row = document.createElement('div');
        row.className = 'checkout-item-row';
        row.innerHTML = `
          <div class="checkout-item-img">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="checkout-item-info">
            <h5>${item.name}</h5>
            <div class="d-flex align-center gap-2">
              <span class="badge badge-primary" style="font-size:0.65rem; padding:0.15rem 0.4rem;">${item.tier}</span>
              <span style="font-size:0.8rem; color:var(--text-muted);">Qty: ${item.quantity || 1}</span>
            </div>
          </div>
          <div class="checkout-item-price">$${itemTotal.toLocaleString()}</div>
        `;
        itemsList.appendChild(row);
      });
    }

    const { subtotal, discount, total } = calculateTotals(cart);

    if (subtotalEl) subtotalEl.innerText = `$${subtotal.toLocaleString()}`;

    if (discountRow && discountValEl) {
      if (discount > 0) {
        discountRow.style.display = 'flex';
        discountValEl.innerText = `-$${discount.toLocaleString()}`;
      } else {
        discountRow.style.display = 'none';
      }
    }

    if (totalEl) totalEl.innerText = `$${total.toLocaleString()}`;
    if (btnAmountEl) btnAmountEl.innerText = `$${total.toLocaleString()}`;
  }

  // Pre-fill Logged in User info
  function prefillUserInfo() {
    if (window.ApexAuth && typeof window.ApexAuth.getCurrentUser === 'function') {
      const user = window.ApexAuth.getCurrentUser();
      if (user) {
        const nameInput = document.querySelector('#custName');
        const emailInput = document.querySelector('#custEmail');
        if (nameInput && !nameInput.value) nameInput.value = user.name || '';
        if (emailInput && !emailInput.value) emailInput.value = user.email || '';
      }
    }
  }

  // Coupon Application
  function initCouponEngine() {
    const couponInput = document.querySelector('#couponCodeInput');
    const applyBtn = document.querySelector('#applyCouponBtn');
    const couponMsg = document.querySelector('#couponMessage');

    if (!applyBtn || !couponInput) return;

    applyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const code = couponInput.value.trim().toUpperCase();

      if (!code) {
        showCouponMsg('Please enter a valid coupon code.', 'error');
        return;
      }

      const cart = getCart();
      if (cart.length === 0) {
        showCouponMsg('Cart is empty. Add services before applying coupons.', 'error');
        return;
      }

      if (PROMO_CODES[code]) {
        appliedCoupon = { code, ...PROMO_CODES[code] };
        showCouponMsg(`✓ ${appliedCoupon.label} applied!`, 'success');
        couponInput.disabled = true;
        applyBtn.innerText = 'Applied';
        applyBtn.classList.replace('btn-secondary', 'btn-primary');
        renderOrderSummary();
      } else {
        showCouponMsg('Invalid coupon code. Try APEXVIP10 or STUDIO500.', 'error');
      }
    });

    function showCouponMsg(msg, type) {
      if (!couponMsg) return;
      couponMsg.innerText = msg;
      couponMsg.style.display = 'block';
      couponMsg.style.color = type === 'success' ? 'var(--emerald)' : 'var(--primary)';
    }
  }

  // Payment Method Tabs Switcher
  function initPaymentMethodSwitcher() {
    const methodBtns = document.querySelectorAll('.payment-method-btn');
    const panels = document.querySelectorAll('.payment-method-panel');

    methodBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        methodBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const selectedMethod = btn.getAttribute('data-method');
        panels.forEach((p) => {
          if (p.getAttribute('data-method') === selectedMethod) {
            p.classList.add('active');
          } else {
            p.classList.remove('active');
          }
        });

        // Update submit button text
        const submitBtnText = document.querySelector('#paySubmitBtnText');
        if (submitBtnText) {
          if (selectedMethod === 'studio') {
            submitBtnText.innerText = 'Reserve Cleanroom Bay & Pay at Studio';
          } else {
            submitBtnText.innerText = 'Authorize & Complete Payment';
          }
        }
      });
    });

    // Bank Pills selection for Net Banking
    const bankPills = document.querySelectorAll('.bank-pill');
    const bankSelect = document.querySelector('#netbankSelect');

    bankPills.forEach((pill) => {
      pill.addEventListener('click', () => {
        bankPills.forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');
        const bankName = pill.getAttribute('data-bank');
        if (bankSelect) bankSelect.value = bankName;
      });
    });

    if (bankSelect) {
      bankSelect.addEventListener('change', () => {
        bankPills.forEach((p) => {
          if (p.getAttribute('data-bank') === bankSelect.value) {
            p.classList.add('active');
          } else {
            p.classList.remove('active');
          }
        });
      });
    }
  }

  // Credit Card Input Formatters
  function initCardFormatters() {
    const cardNumInput = document.querySelector('#cardNum');
    const cardExpInput = document.querySelector('#cardExp');
    const cardCvvInput = document.querySelector('#cardCvv');

    if (cardNumInput) {
      cardNumInput.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\D/g, '');
        if (val.length > 16) val = val.substring(0, 16);
        const formatted = val.match(/.{1,4}/g)?.join(' ') || val;
        e.target.value = formatted;
      });
    }

    if (cardExpInput) {
      cardExpInput.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\D/g, '');
        if (val.length > 4) val = val.substring(0, 4);
        if (val.length >= 2) {
          e.target.value = val.substring(0, 2) + '/' + val.substring(2, 4);
        } else {
          e.target.value = val;
        }
      });
    }

    if (cardCvvInput) {
      cardCvvInput.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\D/g, '');
        if (val.length > 4) val = val.substring(0, 4);
        e.target.value = val;
      });
    }
  }

  // Form Submission & Order Finalization
  function initPaymentSubmission() {
    const form = document.querySelector('#paymentForm');
    const submitBtn = document.querySelector('#paySubmitBtn');
    const alertBox = document.querySelector('#paymentAlert');

    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const cart = getCart();
      if (cart.length === 0) {
        showAlert('Your cart is empty. Please add services before checking out.', 'error');
        return;
      }

      // Customer fields
      const name = document.querySelector('#custName')?.value.trim();
      const email = document.querySelector('#custEmail')?.value.trim();
      const phone = document.querySelector('#custPhone')?.value.trim();
      const vehicle = document.querySelector('#custVehicle')?.value.trim() || 'Custom Supercar';
      const slotDate = document.querySelector('#slotDate')?.value || new Date().toISOString().split('T')[0];
      const slotTime = document.querySelector('#slotTime')?.value || 'Morning Bay (9:00 AM)';
      const notes = document.querySelector('#custNotes')?.value.trim() || 'No special instructions.';

      if (!name) {
        showAlert('Please enter your full name.', 'error');
        document.querySelector('#custName')?.focus();
        return;
      }

      if (!email || !email.includes('@')) {
        showAlert('Please enter a valid email address.', 'error');
        document.querySelector('#custEmail')?.focus();
        return;
      }

      if (!phone || phone.length < 8) {
        showAlert('Please enter a valid contact phone number.', 'error');
        document.querySelector('#custPhone')?.focus();
        return;
      }

      // Active Payment Method Validation
      const activeMethodBtn = document.querySelector('.payment-method-btn.active');
      const method = activeMethodBtn ? activeMethodBtn.getAttribute('data-method') : 'card';

      let paymentDetails = { method };

      if (method === 'upi') {
        const upiId = document.querySelector('#upiIdInput')?.value.trim();
        if (!upiId || !upiId.includes('@')) {
          showAlert('Please enter a valid UPI Virtual Payment Address (e.g. user@oksbi).', 'error');
          document.querySelector('#upiIdInput')?.focus();
          return;
        }
        paymentDetails.identifier = upiId;
        paymentDetails.methodLabel = 'UPI Transfer (' + upiId + ')';
      } else if (method === 'card') {
        const cardNum = document.querySelector('#cardNum')?.value.replace(/\s/g, '');
        const cardHolder = document.querySelector('#cardHolder')?.value.trim();
        const cardExp = document.querySelector('#cardExp')?.value.trim();
        const cardCvv = document.querySelector('#cardCvv')?.value.trim();

        if (!cardNum || cardNum.length < 15) {
          showAlert('Please enter a valid 16-digit card number.', 'error');
          document.querySelector('#cardNum')?.focus();
          return;
        }
        if (!cardHolder) {
          showAlert('Please enter the cardholder name.', 'error');
          document.querySelector('#cardHolder')?.focus();
          return;
        }
        if (!cardExp || !cardExp.includes('/') || cardExp.length < 5) {
          showAlert('Please enter a valid expiry date (MM/YY).', 'error');
          document.querySelector('#cardExp')?.focus();
          return;
        }
        if (!cardCvv || cardCvv.length < 3) {
          showAlert('Please enter a valid 3 or 4-digit CVV.', 'error');
          document.querySelector('#cardCvv')?.focus();
          return;
        }

        paymentDetails.identifier = '•••• •••• •••• ' + cardNum.slice(-4);
        paymentDetails.cardHolder = cardHolder;
        paymentDetails.methodLabel = 'Credit/Debit Card (•••• ' + cardNum.slice(-4) + ')';
      } else if (method === 'netbanking') {
        const bank = document.querySelector('#netbankSelect')?.value;
        if (!bank) {
          showAlert('Please select your preferred Net Banking provider.', 'error');
          return;
        }
        paymentDetails.identifier = bank;
        paymentDetails.methodLabel = 'Net Banking (' + bank + ')';
      } else if (method === 'studio') {
        paymentDetails.identifier = 'Pay on Cleanroom Handover';
        paymentDetails.methodLabel = 'Pay at Studio (On Vehicle Drop-off)';
      }

      // Calculate final pricing
      const { subtotal, discount, total } = calculateTotals(cart);

      // Loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Securing Cleanroom Reservation...</span> <i class="fa-solid fa-circle-notch fa-spin"></i>`;
      }

      // Generate Order ID
      const orderId = 'APX-' + new Date().getFullYear() + '-' + Math.floor(10000 + Math.random() * 90000);
      const orderDate = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      const orderObject = {
        orderId,
        orderDate,
        customer: { name, email, phone, vehicle, notes },
        appointment: { slotDate, slotTime },
        payment: paymentDetails,
        pricing: { subtotal, discount, total, couponCode: appliedCoupon ? appliedCoupon.code : null },
        items: cart,
        status: 'CONFIRMED • CLEANROOM SLOT ALLOCATED'
      };

      // Save order to localStorage
      try {
        localStorage.setItem(RECENT_ORDER_KEY, JSON.stringify(orderObject));

        const history = JSON.parse(localStorage.getItem(ORDER_HISTORY_KEY)) || [];
        history.unshift(orderObject);
        localStorage.setItem(ORDER_HISTORY_KEY, JSON.stringify(history));

        // Clear cart
        localStorage.removeItem(CART_STORAGE_KEY);
      } catch (err) {
        console.error('Error saving order state:', err);
      }

      // Update badges
      const badges = document.querySelectorAll('.cart-badge');
      badges.forEach((b) => {
        b.innerText = '0';
        b.style.display = 'none';
      });

      // Simulate instantaneous cleanroom reservation & redirect
      setTimeout(() => {
        window.location.href = 'payment-success.html';
      }, 900);
    });

    function showAlert(msg, type) {
      if (!alertBox) return;
      alertBox.style.display = 'block';
      alertBox.innerText = msg;
      if (type === 'error') {
        alertBox.style.background = 'rgba(255, 42, 84, 0.15)';
        alertBox.style.border = '1px solid var(--primary)';
        alertBox.style.color = '#FFA4B4';
      } else {
        alertBox.style.background = 'rgba(16, 185, 129, 0.15)';
        alertBox.style.border = '1px solid var(--emerald)';
        alertBox.style.color = '#A7F3D0';
      }

      alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // DOM Init
  document.addEventListener('DOMContentLoaded', () => {
    renderOrderSummary();
    prefillUserInfo();
    initCouponEngine();
    initPaymentMethodSwitcher();
    initCardFormatters();
    initPaymentSubmission();
  });
})();
