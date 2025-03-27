// Email popup functionality
function showEmailPopup() {
  // Create popup elements
  const popup = document.createElement('div');
  popup.className = 'email-popup';
  popup.id = 'emailPopup';
  
  const popupContent = document.createElement('div');
  popupContent.className = 'email-popup-content';
  
  const closeBtn = document.createElement('span');
  closeBtn.className = 'close-popup';
  closeBtn.innerHTML = '&times;';
  closeBtn.onclick = hideEmailPopup;
  
  // Removed the heading element
  
  const emailText = document.createElement('p');
  emailText.className = 'email-address';
  emailText.textContent = 'noahim03@gmail.com';
  
  const copyBtn = document.createElement('button');
  copyBtn.className = 'copy-button';
  copyBtn.textContent = 'Copy to Clipboard';
  copyBtn.onclick = copyEmail;
  
  // Assemble popup (without the heading)
  popupContent.appendChild(closeBtn);
  // popupContent.appendChild(heading); -- removed this line
  popupContent.appendChild(emailText);
  popupContent.appendChild(copyBtn);
  popup.appendChild(popupContent);
  
  // Add to document
  document.body.appendChild(popup);
  
  // Show popup
  popup.style.display = 'flex';
  
  // Close when clicking outside
  popup.addEventListener('click', function(event) {
    if (event.target === popup) {
      hideEmailPopup();
    }
  });
}

function hideEmailPopup() {
  const popup = document.getElementById('emailPopup');
  if (popup) {
    popup.style.display = 'none';
    // Optional: remove from DOM after hiding
    setTimeout(() => {
      if (popup.parentNode) {
        popup.parentNode.removeChild(popup);
      }
    }, 300);
  }
}

function copyEmail() {
  navigator.clipboard.writeText('noahim03@gmail.com')
    .then(() => {
      const copyButton = document.querySelector('.copy-button');
      copyButton.textContent = 'Copied!';
      setTimeout(() => {
        copyButton.textContent = 'Copy to Clipboard';
      }, 2000);
    })
    .catch(err => {
      console.error('Could not copy text: ', err);
    });
}

// Initialize interactive elements
document.addEventListener('DOMContentLoaded', function() {
  // Set up social icon animations
  const socialLinks = document.querySelectorAll('.social-link');
  socialLinks.forEach(link => {
    // Add hover animations if needed
    if (link.getAttribute('aria-label') === 'Email me') {
      link.onclick = function(e) {
        e.preventDefault();
        showEmailPopup();
      };
    }
  });
});