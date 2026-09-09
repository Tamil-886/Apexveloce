/**
 * APEX VELOCE | Vehicle Wrap & Custom Studio
 * Interactive Pricing, Build Configurator & Financing Engine (pricing.js)
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================================================
    // 1. Dynamic Pricing Category Tabs
    // =========================================================================
    const pricingTabBtns = document.querySelectorAll('.pricing-nav-btn');
    const pricingTabPanes = document.querySelectorAll('.pricing-tab-pane');

    pricingTabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-pricing-tab');
        
        pricingTabBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        pricingTabPanes.forEach((pane) => {
          if (pane.id === `tab-${targetTab}`) {
            pane.classList.add('active');
          } else {
            pane.classList.remove('active');
          }
        });
      });
    });

    // =========================================================================
    // 2. Interactive Real-Time Build Cost Estimator (Calculator 2.0)
    // =========================================================================
    const vehicleOptions = document.querySelectorAll('.choice-card[data-vehicle-type]');
    const serviceOptions = document.querySelectorAll('.choice-card[data-service-type]');
    const addonCheckboxes = document.querySelectorAll('.addon-checkbox');
    const totalPriceDisplay = document.querySelector('.estimator-total .total-price');
    const quoteBreakdown = document.querySelector('.quote-breakdown-text');
    const financingPackageTotal = document.querySelector('#financingPackageTotal');
    const financingMonthlyVal = document.querySelector('#financingMonthlyVal');
    const financingTermBtns = document.querySelectorAll('.financing-term-btn');

    let selectedVehicleMultiplier = 1.0;
    let selectedVehicleName = 'Sports Coupe / Sedan';
    let baseServicePrice = 2800;
    let selectedServiceName = 'Full Satin / Gloss Wrap';
    let addonsTotal = 0;
    let selectedAddonsList = [];
    let currentGrandTotal = 2800;
    let selectedFinancingTerm = 12;

    function calculateTotal() {
      // Base calculation
      const calculatedServicePrice = Math.round(baseServicePrice * selectedVehicleMultiplier);
      currentGrandTotal = calculatedServicePrice + addonsTotal;

      // Update UI
      if (totalPriceDisplay) {
        totalPriceDisplay.innerText = `$${currentGrandTotal.toLocaleString()}`;
      }

      if (quoteBreakdown) {
        const addonsText = selectedAddonsList.length > 0 ? ` + Add-ons (${selectedAddonsList.join(', ')})` : '';
        quoteBreakdown.innerText = `Includes: ${selectedVehicleName} with ${selectedServiceName}${addonsText}.`;
      }

      // Update Financing widget dynamically
      updateFinancingCalculation();
    }

    function updateFinancingCalculation() {
      if (financingPackageTotal) {
        financingPackageTotal.innerText = `$${currentGrandTotal.toLocaleString()}`;
      }

      if (financingMonthlyVal) {
        let monthly = 0;
        if (selectedFinancingTerm === 12) {
          monthly = Math.round(currentGrandTotal / 12);
        } else if (selectedFinancingTerm === 24) {
          monthly = Math.round(currentGrandTotal / 24);
        } else if (selectedFinancingTerm === 36) {
          // 3.9% interest over 36 mo
          monthly = Math.round((currentGrandTotal * 1.039) / 36);
        }
        financingMonthlyVal.innerText = `$${monthly.toLocaleString()} / mo`;
      }
    }

    // A. Vehicle Type Selection
    vehicleOptions.forEach((card) => {
      card.addEventListener('click', () => {
        vehicleOptions.forEach((c) => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedVehicleMultiplier = parseFloat(card.getAttribute('data-multiplier')) || 1.0;
        selectedVehicleName = card.querySelector('span')?.innerText || 'Vehicle';
        calculateTotal();
      });
    });

    // B. Service Selection
    serviceOptions.forEach((card) => {
      card.addEventListener('click', () => {
        serviceOptions.forEach((c) => c.classList.remove('selected'));
        card.classList.add('selected');
        baseServicePrice = parseInt(card.getAttribute('data-price'), 10) || 2800;
        selectedServiceName = card.querySelector('span')?.innerText || 'Service';
        calculateTotal();
      });
    });

    // C. Add-ons Selection
    addonCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', () => {
        addonsTotal = 0;
        selectedAddonsList = [];
        addonCheckboxes.forEach((cb) => {
          if (cb.checked) {
            addonsTotal += parseInt(cb.getAttribute('data-price'), 10) || 0;
            const labelText = cb.closest('label')?.querySelector('span')?.innerText.split('(')[0].trim() || 'Custom Addon';
            selectedAddonsList.push(labelText);
          }
        });
        calculateTotal();
      });
    });

    // D. Financing Term Selector Buttons
    financingTermBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        financingTermBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        selectedFinancingTerm = parseInt(btn.getAttribute('data-term'), 10) || 12;
        updateFinancingCalculation();
      });
    });

    // E. Add Configured Estimate to Cart handler
    const addEstimateToCartBtn = document.querySelector('#addEstimateToCartBtn');
    if (addEstimateToCartBtn) {
      addEstimateToCartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const addonsText = selectedAddonsList.length > 0 ? ` + ${selectedAddonsList.join(', ')}` : '';
        
        if (window.ApexCart) {
          window.ApexCart.addToCart({
            id: 'est-' + Date.now(),
            name: `Bespoke Build: ${selectedServiceName}`,
            price: currentGrandTotal,
            tier: `${selectedVehicleName}${addonsText}`,
            image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=400&q=80'
          });
        }
      });
    }

    // Initial calculation
    calculateTotal();
  });
})();
