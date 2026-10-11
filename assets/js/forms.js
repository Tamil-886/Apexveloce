/**
 * APEX VELOCE | Vehicle Wrap & Custom Studio
 * Forms & Consultation Wizard 2.0 Engine (forms.js)
 */

(function () {
  'use strict';

  // Global Toast Function
  window.showApexToast = function (message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast toast-' + type;
    const icon = type === 'success' ? 'fa-circle-check' : 'fa-triangle-exclamation';
    toast.innerHTML = [
      '<i class="fa-solid ' + icon + '"></i>',
      '<div>',
      '  <strong>' + (type === 'success' ? 'Apex Concierge Notice' : 'Attention Required') + '</strong>',
      '  <p style="margin:0; font-size:0.88rem; color:var(--text-muted);">' + message + '</p>',
      '</div>'
    ].join('');

    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 4500);
  };

  document.addEventListener('DOMContentLoaded', () => {
    // =========================================================================
    // 1. Interactive 4-Step Consultation Wizard
    // =========================================================================
    const wizardForm = document.querySelector('#consultationForm');
    const wizardPanes = document.querySelectorAll('.wizard-pane');
    const stepNodes = document.querySelectorAll('.wizard-step-node');
    const progressLineFill = document.querySelector('.wizard-progress-line-fill');
    
    let currentStep = 1;
    const totalSteps = wizardPanes.length || 4;

    function goToStep(stepNumber) {
      if (stepNumber < 1 || stepNumber > totalSteps) return;
      currentStep = stepNumber;

      // Update panes
      wizardPanes.forEach((pane) => {
        const paneStep = parseInt(pane.getAttribute('data-step') || '1', 10);
        if (paneStep === currentStep) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });

      // Update step nodes
      stepNodes.forEach((node, idx) => {
        const nodeStep = idx + 1;
        if (nodeStep === currentStep) {
          node.classList.add('active');
          node.classList.remove('completed');
        } else if (nodeStep < currentStep) {
          node.classList.remove('active');
          node.classList.add('completed');
        } else {
          node.classList.remove('active');
          node.classList.remove('completed');
        }
      });

      // Update progress line fill (centers from 12.5% to 87.5% across 4 steps)
      if (progressLineFill) {
        const percentage = ((currentStep - 1) / (totalSteps - 1)) * 75;
        progressLineFill.style.width = percentage + '%';
      }

      updateLiveSummary();
    }

    // Step Node Click navigation (only to already accessible/completed steps)
    stepNodes.forEach((node, idx) => {
      node.addEventListener('click', () => {
        const targetStep = idx + 1;
        if (targetStep <= currentStep || validateStep(currentStep)) {
          goToStep(targetStep);
        }
      });
    });

    // Validation Helper Utilities
    function isValidName(val) {
      if (!val || typeof val !== 'string') return false;
      const trimmed = val.trim();
      if (trimmed.length < 2) return false;
      if (/\d/.test(trimmed)) return false; // Strictly reject numbers
      if (!/^[a-zA-Z\u00C0-\u00FF\s'.-]{2,60}$/.test(trimmed)) return false;
      const letters = (trimmed.match(/[a-zA-Z\u00C0-\u00FF]/g) || []).length;
      return letters >= 2;
    }

    function isValidEmail(val) {
      if (!val || typeof val !== 'string') return false;
      const trimmed = val.trim();
      if (trimmed.length < 5 || trimmed.length > 254) return false;
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_\`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
      return emailRegex.test(trimmed);
    }

    function sanitizePhone(val) {
      return (val || '').replace(/[^0-9+\s()\-]/g, '');
    }

    function isValidPhone(val) {
      if (!val || typeof val !== 'string') return false;
      const trimmed = val.trim();
      if (/[a-zA-Z]/.test(trimmed)) return false; // Strictly reject alphabetic characters
      if (!/^[0-9+\s()\-]+$/.test(trimmed)) return false;
      const digits = trimmed.replace(/\D/g, '');
      if (digits.length < 7 || digits.length > 15) return false;
      if ((trimmed.match(/\+/g) || []).length > 1) return false;
      if (trimmed.includes('+') && !trimmed.startsWith('+')) return false;
      return true;
    }

    // Expose helpers globally
    window.isValidName = isValidName;
    window.isValidEmail = isValidEmail;
    window.isValidPhone = isValidPhone;

    // Full Name Restriction: Disallow Numbers
    function attachNameRestriction(input) {
      if (!input || input.dataset.nameRestricted) return;
      input.dataset.nameRestricted = 'true';

      input.addEventListener('keydown', (e) => {
        const allowed = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab', 'Enter', 'Escape', 'Home', 'End'];
        if (allowed.includes(e.key) || e.ctrlKey || e.metaKey) return;
        if (/[0-9]/.test(e.key)) {
          e.preventDefault();
          if (window.showApexToast && !input.dataset.toastShown) {
            input.dataset.toastShown = 'true';
            window.showApexToast('Numbers are not allowed in the Name field.', 'warning');
            setTimeout(() => { delete input.dataset.toastShown; }, 2500);
          }
        }
      });

      input.addEventListener('input', () => {
        const cleaned = input.value.replace(/[0-9]/g, '');
        if (input.value !== cleaned) {
          input.value = cleaned;
          if (window.showApexToast && !input.dataset.toastShown) {
            input.dataset.toastShown = 'true';
            window.showApexToast('Numbers are not allowed in the Name field.', 'warning');
            setTimeout(() => { delete input.dataset.toastShown; }, 2500);
          }
        }
        if (input.value.trim().length > 0) {
          if (isValidName(input.value)) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
          } else {
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
          }
        } else {
          input.classList.remove('is-invalid', 'is-valid');
        }
      });

      input.addEventListener('paste', (e) => {
        e.preventDefault();
        const text = (e.clipboardData || window.clipboardData).getData('text');
        const cleaned = text.replace(/[0-9]/g, '');
        document.execCommand('insertText', false, cleaned);
      });
    }

    // Phone Restriction: Disallow Alphabetic Characters
    function attachPhoneRestriction(input) {
      if (!input || input.dataset.phoneRestricted) return;
      input.dataset.phoneRestricted = 'true';
      input.setAttribute('inputmode', 'tel');

      input.addEventListener('keydown', (e) => {
        const allowed = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab', 'Enter', 'Escape', 'Home', 'End'];
        if (allowed.includes(e.key) || e.ctrlKey || e.metaKey) return;
        if (/[a-zA-Z]/.test(e.key)) {
          e.preventDefault();
          if (window.showApexToast && !input.dataset.toastShown) {
            input.dataset.toastShown = 'true';
            window.showApexToast('Letters are not allowed in the Phone field.', 'warning');
            setTimeout(() => { delete input.dataset.toastShown; }, 2500);
          }
          return;
        }
        if (!/[0-9+\s()\-]/i.test(e.key)) {
          e.preventDefault();
        }
      });

      input.addEventListener('input', () => {
        const original = input.value;
        const cleaned = sanitizePhone(original);
        if (original !== cleaned) {
          input.value = cleaned;
          if (/[a-zA-Z]/.test(original) && window.showApexToast && !input.dataset.toastShown) {
            input.dataset.toastShown = 'true';
            window.showApexToast('Letters are not allowed in the Phone field.', 'warning');
            setTimeout(() => { delete input.dataset.toastShown; }, 2500);
          }
        }
        if (input.value.trim().length > 0) {
          if (isValidPhone(input.value)) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
          } else {
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
          }
        } else {
          input.classList.remove('is-invalid', 'is-valid');
        }
      });

      input.addEventListener('paste', (e) => {
        e.preventDefault();
        const text = (e.clipboardData || window.clipboardData).getData('text');
        const cleaned = sanitizePhone(text);
        document.execCommand('insertText', false, cleaned);
      });
    }

    // Email Live Validation Feedback
    function attachEmailValidation(input) {
      if (!input || input.dataset.emailValidated) return;
      input.dataset.emailValidated = 'true';
      input.addEventListener('input', () => {
        const val = input.value.trim();
        if (val.length > 0) {
          if (isValidEmail(val)) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
          } else {
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
          }
        } else {
          input.classList.remove('is-invalid', 'is-valid');
        }
      });
    }

    // Attach to form inputs on page
    document.querySelectorAll('input[name*="name"], input[id*="name"], input[id*="Name"]').forEach(attachNameRestriction);
    document.querySelectorAll('input[type="tel"], input[name*="phone"], input[id*="phone"], input[id*="Phone"]').forEach(attachPhoneRestriction);
    document.querySelectorAll('input[type="email"], input[name*="email"], input[id*="email"]').forEach(attachEmailValidation);

    // Step Validation Function
    function validateStep(step) {
      if (!wizardForm) return true;

      if (step === 1) {
        const nameInput = wizardForm.querySelector('[name="client_name"]');
        const emailInput = wizardForm.querySelector('[name="client_email"]');
        const phoneInput = wizardForm.querySelector('[name="client_phone"]');
        const name = nameInput?.value.trim();
        const email = emailInput?.value.trim();
        const phone = phoneInput?.value.trim();

        if (!name) {
          window.showApexToast('Please enter your full name.', 'error');
          nameInput?.focus();
          return false;
        }
        if (!isValidName(name)) {
          window.showApexToast('Please enter a valid full name (minimum 2 letters, numbers not allowed).', 'error');
          nameInput?.focus();
          return false;
        }

        if (!email) {
          window.showApexToast('Please enter your email address.', 'error');
          emailInput?.focus();
          return false;
        }
        if (!isValidEmail(email)) {
          window.showApexToast('Please enter a valid email address (e.g. client@domain.com).', 'error');
          emailInput?.focus();
          return false;
        }

        if (!phone) {
          window.showApexToast('Please enter your contact phone number.', 'error');
          phoneInput?.focus();
          return false;
        }
        if (!isValidPhone(phone)) {
          window.showApexToast('Please enter a valid phone number without letters (7-15 digits).', 'error');
          phoneInput?.focus();
          return false;
        }
      } else if (step === 2) {
        const make = wizardForm.querySelector('[name="vehicle_make"]')?.value.trim();
        const model = wizardForm.querySelector('[name="vehicle_model"]')?.value.trim();
        if (!make || !model) {
          window.showApexToast('Please specify vehicle Make and Model.', 'error');
          return false;
        }
      }
      return true;
    }

    // Next / Back buttons
    document.querySelectorAll('[data-wizard-next]').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (validateStep(currentStep)) {
          goToStep(currentStep + 1);
        }
      });
    });

    document.querySelectorAll('[data-wizard-prev]').forEach((btn) => {
      btn.addEventListener('click', () => {
        goToStep(currentStep - 1);
      });
    });

    // =========================================================================
    // 2. Interactive Discipline Cards (Multi-Select)
    // =========================================================================
    const disciplineCards = document.querySelectorAll('.discipline-card');
    disciplineCards.forEach((card) => {
      card.addEventListener('click', () => {
        card.classList.toggle('selected');
        const checkbox = card.querySelector('input[type="checkbox"]');
        if (checkbox) {
          checkbox.checked = card.classList.contains('selected');
        }
        updateLiveSummary();
      });
    });

    // =========================================================================
    // 3. Interactive Budget Tier Cards (Single-Select)
    // =========================================================================
    const budgetCards = document.querySelectorAll('.budget-tier-card');
    budgetCards.forEach((card) => {
      card.addEventListener('click', () => {
        budgetCards.forEach((c) => c.classList.remove('selected'));
        card.classList.add('selected');
        const radio = card.querySelector('input[type="radio"]');
        if (radio) {
          radio.checked = true;
        }
        updateLiveSummary();
      });
    });

    // =========================================================================
    // 4. Live Estimate & Summary Panel Engine
    // =========================================================================
    const summaryClient = document.querySelector('#summaryClient');
    const summaryVehicle = document.querySelector('#summaryVehicle');
    const summaryDisciplines = document.querySelector('#summaryDisciplines');
    const summaryBudget = document.querySelector('#summaryBudget');
    const summaryTimeline = document.querySelector('#summaryTimeline');

    function updateLiveSummary() {
      if (!wizardForm) return;

      // Client
      const name = wizardForm.querySelector('[name="client_name"]')?.value.trim();
      if (summaryClient) {
        summaryClient.textContent = name || 'VIP Client (Unspecified)';
      }

      // Vehicle
      const make = wizardForm.querySelector('[name="vehicle_make"]')?.value.trim();
      const model = wizardForm.querySelector('[name="vehicle_model"]')?.value.trim();
      const year = wizardForm.querySelector('[name="vehicle_year"]')?.value.trim();
      if (summaryVehicle) {
        if (make || model) {
          summaryVehicle.textContent = (year ? year + ' ' : '') + (make || '') + ' ' + (model || '').trim();
        } else {
          summaryVehicle.textContent = 'Awaiting Vehicle Info';
        }
      }

      // Selected Disciplines
      const selectedDisciplines = [];
      document.querySelectorAll('.discipline-card.selected').forEach((card) => {
        const title = card.getAttribute('data-discipline') || card.querySelector('h5')?.textContent.trim();
        if (title) selectedDisciplines.push(title);
      });

      if (summaryDisciplines) {
        if (selectedDisciplines.length > 0) {
          summaryDisciplines.innerHTML = selectedDisciplines
            .map((d) => '<span class="summary-chip">' + d + '</span>')
            .join('');
        } else {
          summaryDisciplines.innerHTML = '<span style="color:var(--text-dim); font-size:0.85rem;">None Selected</span>';
        }
      }

      // Budget
      const activeBudgetCard = document.querySelector('.budget-tier-card.selected');
      if (summaryBudget) {
        if (activeBudgetCard) {
          const budgetTier = activeBudgetCard.getAttribute('data-tier') || activeBudgetCard.querySelector('h5')?.textContent.trim();
          const budgetVal = activeBudgetCard.querySelector('.budget-tier-price')?.textContent.trim();
          summaryBudget.textContent = budgetVal + ' (' + budgetTier + ')';
        } else {
          summaryBudget.textContent = '$3,000 - $6,000 (Signature)';
        }
      }

      // Timeline estimation
      if (summaryTimeline) {
        const count = selectedDisciplines.length;
        if (count >= 4) {
          summaryTimeline.textContent = '7 - 10 Studio Days';
        } else if (count >= 2) {
          summaryTimeline.textContent = '4 - 6 Studio Days';
        } else if (count === 1) {
          summaryTimeline.textContent = '2 - 3 Studio Days';
        } else {
          summaryTimeline.textContent = '3 - 5 Studio Days (Estimated)';
        }
      }
    }

    // Input listeners for live updates
    if (wizardForm) {
      ['input', 'change'].forEach((evt) => {
        wizardForm.addEventListener(evt, updateLiveSummary);
      });
    }

    // =========================================================================
    // 5. File Upload Dropzone Preview & Remove
    // =========================================================================
    const dropzone = document.querySelector('.file-dropzone');
    const fileInput = document.querySelector('.file-dropzone-input');
    const previewContainer = document.querySelector('.upload-preview-container');

    if (dropzone && fileInput) {
      dropzone.addEventListener('click', (e) => {
        if (e.target !== fileInput) fileInput.click();
      });

      dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      });

      ['dragleave', 'dragend'].forEach((type) => {
        dropzone.addEventListener(type, () => dropzone.classList.remove('dragover'));
      });

      dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) {
          handleFiles(e.dataTransfer.files);
        }
      });

      fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
          handleFiles(e.target.files);
        }
      });

      function handleFiles(files) {
        if (!previewContainer) return;
        Array.from(files).slice(0, 6).forEach((file) => {
          if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
              const wrap = document.createElement('div');
              wrap.className = 'upload-thumb-wrap';
              wrap.innerHTML = [
                '<img src="' + event.target.result + '" alt="' + file.name + '" title="' + file.name + '">',
                '<button type="button" class="upload-thumb-remove" title="Remove photo">&times;</button>'
              ].join('');
              wrap.querySelector('.upload-thumb-remove').addEventListener('click', (e) => {
                e.stopPropagation();
                wrap.remove();
              });
              previewContainer.appendChild(wrap);
            };
            reader.readAsDataURL(file);
          }
        });
        window.showApexToast(files.length + ' vehicle image(s) attached to consultation brief.', 'success');
      }
    }

    // =========================================================================
    // 6. Consultation Wizard Form Submission
    // =========================================================================
    if (wizardForm) {
      wizardForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = wizardForm.querySelector('[name="client_name"]');
        const emailInput = wizardForm.querySelector('[name="client_email"]');
        const phoneInput = wizardForm.querySelector('[name="client_phone"]');
        const name = nameInput?.value.trim();
        const email = emailInput?.value.trim();
        const phone = phoneInput?.value.trim();
        const make = wizardForm.querySelector('[name="vehicle_make"]')?.value.trim();
        const model = wizardForm.querySelector('[name="vehicle_model"]')?.value.trim();
        const year = wizardForm.querySelector('[name="vehicle_year"]')?.value.trim();
        const notes = wizardForm.querySelector('[name="project_notes"]')?.value.trim();
        const preferredDate = wizardForm.querySelector('[name="preferred_date"]')?.value;

        if (!name || !isValidName(name)) {
          window.showApexToast('Please enter a valid full name (minimum 2 letters, numbers not allowed).', 'error');
          if (typeof goToStep === 'function') goToStep(1);
          nameInput?.focus();
          return;
        }

        if (!email || !isValidEmail(email)) {
          window.showApexToast('Please enter a valid email address (e.g. client@domain.com).', 'error');
          if (typeof goToStep === 'function') goToStep(1);
          emailInput?.focus();
          return;
        }

        if (!phone || !isValidPhone(phone)) {
          window.showApexToast('Please enter a valid phone number without letters (7-15 digits).', 'error');
          if (typeof goToStep === 'function') goToStep(1);
          phoneInput?.focus();
          return;
        }

        if (!make || !model) {
          window.showApexToast('Please specify vehicle Make and Model.', 'error');
          if (typeof goToStep === 'function') goToStep(2);
          return;
        }

        const selectedDisciplines = [];
        document.querySelectorAll('.discipline-card.selected').forEach((card) => {
          const title = card.getAttribute('data-discipline') || card.querySelector('h5')?.textContent.trim();
          if (title) selectedDisciplines.push(title);
        });

        const activeBudgetCard = document.querySelector('.budget-tier-card.selected');
        const budget = activeBudgetCard ? activeBudgetCard.querySelector('.budget-tier-price')?.textContent.trim() : '$3,000 - $6,000';

        const ticketId = 'APEX-VIP-' + Math.floor(1000 + Math.random() * 9000);

        const newEnquiry = {
          id: ticketId,
          client: name,
          email: email,
          phone: phone,
          vehicle: ((year ? year + ' ' : '') + make + ' ' + model).trim(),
          disciplines: selectedDisciplines.length > 0 ? selectedDisciplines.join(', ') : 'Bespoke Custom Wrap',
          budget: budget,
          targetDate: preferredDate || 'Flexible',
          notes: notes || 'None',
          dateSubmitted: new Date().toISOString(),
          status: 'VIP Review'
        };

        const existingEnquiries = JSON.parse(localStorage.getItem('apex_enquiries') || '[]');
        existingEnquiries.unshift(newEnquiry);
        localStorage.setItem('apex_enquiries', JSON.stringify(existingEnquiries));

        // Sweet notification
        window.showApexToast('Consultation Request ' + ticketId + ' confirmed! Senior Master Stylist assigned. We will contact you within 60 minutes.', 'success');

        // Reset wizard
        wizardForm.reset();
        wizardForm.querySelectorAll('.is-valid, .is-invalid').forEach((el) => el.classList.remove('is-valid', 'is-invalid'));
        disciplineCards.forEach((c) => c.classList.remove('selected'));
        budgetCards.forEach((c, idx) => {
          if (idx === 1) c.classList.add('selected');
          else c.classList.remove('selected');
        });
        if (previewContainer) previewContainer.innerHTML = '';
        goToStep(1);
      });
    }

    // =========================================================================
    // 7. Cleanroom Bay Visit Slot Selector
    // =========================================================================
    document.querySelectorAll('.bay-slot-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.bay-slot-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const slot = btn.getAttribute('data-slot') || btn.textContent.trim();
        window.showApexToast('Cleanroom Bay Tour Slot selected: ' + slot, 'success');
      });
    });

    // =========================================================================
    // 8. Instant Callback Trigger Modal/Action
    // =========================================================================
    document.querySelectorAll('[data-instant-callback]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const clientPhone = prompt('Enter your phone or WhatsApp number for an immediate 60-second callback:');
        if (clientPhone && clientPhone.trim()) {
          if (!isValidPhone(clientPhone)) {
            window.showApexToast('Please enter a valid numeric phone number without letters (7-15 digits).', 'error');
            return;
          }
          window.showApexToast('Callback request queued for ' + clientPhone + '. An Apex specialist is dialing...', 'success');
        }
      });
    });

    // =========================================================================
    // 9. Quick Newsletter Subscription
    // =========================================================================
    const subscribeForms = document.querySelectorAll('.subscribe-form, .footer-newsletter-form');
    subscribeForms.forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = form.querySelector('input[type="email"], .footer-newsletter-input');
        const val = emailInput ? emailInput.value.trim() : '';
        if (!isValidEmail(val)) {
          window.showApexToast('Please enter a valid email address (e.g. client@domain.com).', 'error');
          if (emailInput) emailInput.focus();
          return;
        }
        window.showApexToast('Subscribed to VIP Studio announcements & private build releases!', 'success');
        form.reset();
      });
    });

    // Initialize summary once on load
    updateLiveSummary();
  });
})();
