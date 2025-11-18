// Modify showAlert to return a Promise
function showAlert(type, message, callback) {
 return new Promise((resolve) => {
  // Your existing showAlert logic here
  // When user confirms, call both callback and resolve
  const confirmHandler = () => {
   if (callback) callback();
   resolve();
  };
  
  // Your existing modal/alert logic that calls confirmHandler
 });
}

// Usage
await showAlert('confirm', `Process wallet funding:\nAmount: ₦${amount}`, () => {
 console.log({ amount });
});
console.log('no time'); // This will run AFTER user confirms





  function showAlert(kind, message, okFunction = null, showCancel = false) {
   // Validate kind parameter
   const validKinds = ['info', 'success', 'warning', 'confirm', 'follow'];
   if (!validKinds.includes(kind)) {
    console.error('Invalid alert kind. Must be one of: info, success, warning, confirm, follow');
    return;
   }
   
   // Create alert overlay
   const alertOverlay = document.createElement('div');
   alertOverlay.className = 'alert-overlay';
   
   // Create alert box
   const alertBox = document.createElement('div');
   alertBox.className = `alert-box alert-${kind}`;
   
   // Set alert content based on kind
   let title, iconClass, showCancelBtn;
   
   switch (kind) {
    case 'info':
     title = 'Information';
     iconClass = 'fas fa-info';
     showCancelBtn = false;
     break;
    case 'success':
     title = 'Success';
     iconClass = 'fas fa-check';
     showCancelBtn = false;
     break;
    case 'warning':
     title = 'Warning';
     iconClass = 'fas fa-exclamation-triangle';
     // For warning type, we can optionally show cancel button
     showCancelBtn = showCancel || false;
     break;
    case 'confirm':
     title = 'Confirmation';
     iconClass = 'fas fa-question';
     showCancelBtn = true;
     break;
    case 'follow':
     title = 'Action Required';
     iconClass = 'fas fa-exclamation';
     showCancelBtn = false;
     break;
   }
   
   // Build alert HTML
   alertBox.innerHTML = `
        <div class="alert-header">
          <div class="alert-icon">
            <i class="${iconClass}"></i>
          </div>
          <div class="alert-title">${title}</div>
        </div>
        <div class="alert-body">
          <div class="alert-message">${message}</div>
        </div>
        <div class="alert-footer">
          ${showCancelBtn ? '<button class="alert-btn alert-btn-cancel">Cancel</button>' : ''}
          <button class="alert-btn alert-btn-ok">${kind === 'follow' ? 'Continue' : 'OK'}</button>
        </div>
      `;
   
   // Add to overlay
   alertOverlay.appendChild(alertBox);
   
   // Add to alert container
   const alertContainer = document.getElementById('alertContainer');
   alertContainer.appendChild(alertOverlay);
   
   // Set up event listeners
   const okButton = alertBox.querySelector('.alert-btn-ok');
   const cancelButton = alertBox.querySelector('.alert-btn-cancel');
   
   // OK button handler
   okButton.addEventListener('click', function() {
    if (okFunction && typeof okFunction === 'function') {
     okFunction();
    }
    closeAlert(alertOverlay);
   });
   
   // Cancel button handler
   if (cancelButton) {
    cancelButton.addEventListener('click', function() {
     closeAlert(alertOverlay);
    });
   }
   
   // Close on overlay click (outside the alert box)
   alertOverlay.addEventListener('click', function(e) {
    if (e.target === alertOverlay) {
     closeAlert(alertOverlay);
    }
   });
   
   // Close on Escape key
   const escapeHandler = function(e) {
    if (e.key === 'Escape') {
     closeAlert(alertOverlay);
     document.removeEventListener('keydown', escapeHandler);
    }
   };
   document.addEventListener('keydown', escapeHandler);
   
   // Clean up event listener when alert is closed
   alertOverlay.addEventListener('close', function() {
    document.removeEventListener('keydown', escapeHandler);
   });
  }
