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

      // Update progress line fill
      if (progressLineFill) {
        const percentage = ((currentStep - 1) / (totalSteps - 1)) * 90;
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

    // Step Validation Function
    function validateStep(step) {
      if (!wizardForm) return true;

      if (step === 1) {
        const name = wizardForm.querySelector('[name="client_name"]')?.value.trim();
        const email = wizardForm.querySelector('[name="client_email"]')?.value.trim();
        const phone = wizardForm.querySelector('[name="client_phone"]')?.value.trim();
        if (!name || !email || !phone) {
          window.showApexToast('Please complete your Name, Email, and Phone number.', 'error');
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

        const name = wizardForm.querySelector('[name="client_name"]')?.value.trim();
        const email = wizardForm.querySelector('[name="client_email"]')?.value.trim();
        const phone = wizardForm.querySelector('[name="client_phone"]')?.value.trim();
        const make = wizardForm.querySelector('[name="vehicle_make"]')?.value.trim();
        const model = wizardForm.querySelector('[name="vehicle_model"]')?.value.trim();
        const year = wizardForm.querySelector('[name="vehicle_year"]')?.value.trim();
        const notes = wizardForm.querySelector('[name="project_notes"]')?.value.trim();
        const preferredDate = wizardForm.querySelector('[name="preferred_date"]')?.value;

        if (!name || !email || !phone || !make || !model) {
          window.showApexToast('Please complete all required fields across the steps.', 'error');
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
          window.showApexToast('Callback request queued for ' + clientPhone + '. An Apex specialist is dialing...', 'success');
        }
      });
    });

    // =========================================================================
    // 9. Quick Newsletter Subscription
    // =========================================================================
    const subscribeForms = document.querySelectorAll('.subscribe-form');
    subscribeForms.forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput && emailInput.value.trim()) {
          window.showApexToast('Subscribed to VIP Studio announcements & private build releases!', 'success');
          form.reset();
        }
      });
    });

    // Initialize summary once on load
    updateLiveSummary();
  });
})();
