// aboutScript.js - JavaScript for About page functionality

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize question modal functionality
  initQuestionModal();
});

// Question modal functionality
function initQuestionModal() {
  // Get modal elements
  const messageBtn = document.querySelector('.message-button');
  if (!messageBtn) return; // Safety check
  
  // Create and append the modal to the document
  createQuestionModal();
  
  // Get created modal elements
  const modal = document.getElementById('questionModal');
  const closeBtn = document.querySelector('.close-modal');
  const textarea = document.getElementById('questionText');
  const charCount = document.getElementById('charCount');
  const submitBtn = document.getElementById('submitQuestion');
  const submitStatus = document.getElementById('submitStatus');
  
  // Open modal when button is clicked
  messageBtn.addEventListener('click', function() {
    modal.style.display = 'block';
    textarea.focus();
  });
  
  // Close modal when X is clicked
  closeBtn.addEventListener('click', function() {
    closeModalAndReset(modal, textarea, charCount, submitStatus);
  });
  
  // Close modal when clicking outside
  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      closeModalAndReset(modal, textarea, charCount, submitStatus);
    }
  });
  
  // Update character count
  textarea.addEventListener('input', function() {
    const count = this.value.length;
    charCount.textContent = count;
    
    // Visual indicator when approaching limit
    if (count >= 250) {
      charCount.classList.add('near-limit');
    } else {
      charCount.classList.remove('near-limit');
    }
  });
  
  // Submit question
  submitBtn.addEventListener('click', function () {
    if (textarea.value.trim() === '') {
      submitStatus.textContent = 'Please enter a question.';
      submitStatus.className = 'submit-status error';
      return;
    }

    const questionData = {
      question: textarea.value,
      timestamp: new Date().toISOString(),
    };

    saveQuestionToDataFile(questionData, function (success) {
      if (success) {
        // Show the success screen
        const modalContent = document.querySelector('.modal-content');
        const successScreen = document.getElementById('successScreen');
        modalContent.style.display = 'none';
        successScreen.style.display = 'flex';

        // Reset the modal after 2 seconds
        setTimeout(() => {
          closeModalAndReset(modal, textarea, charCount, submitStatus);
          modalContent.style.display = 'block';
          successScreen.style.display = 'none';
        }, 2000);
      } else {
        submitStatus.textContent = 'Error saving question. Please try again.';
        submitStatus.className = 'submit-status error';
      }
    });
  });
}

// Function to save question to data.txt file
function saveQuestionToDataFile(questionData, callback) {
  fetch('/api/save-question', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(questionData),
  })
    .then((response) => response.json())
    .then((data) => {
      callback(data.success);
    })
    .catch((error) => {
      console.error('Error:', error);
      callback(false);
    });
}

// Create question modal
function createQuestionModal() {
  const modalHTML = `
    <div id="questionModal" class="question-modal">
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <h3>Ask Your Question</h3>
        <div class="textarea-container">
          <textarea id="questionText" maxlength="300" placeholder="Type your question here..."></textarea>
          <div class="character-counter"><span id="charCount">0</span>/300</div>
        </div>
        <div class="modal-buttons">
          <button id="submitQuestion" class="submit-button">Submit</button>
        </div>
        <div id="submitStatus" class="submit-status"></div>
      </div>
      <div id="successScreen" class="success-screen">
        <div class="checkmark-container">
          <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
            <path class="checkmark-check" fill="none" d="M14 27l7 7 16-16"/>
          </svg>
          <p class="success-message">Question Submitted Successfully!</p>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Close modal and reset form
function closeModalAndReset(modal, textarea, charCount, submitStatus) {
  modal.style.display = 'none';
  textarea.value = '';
  charCount.textContent = '0';
  charCount.classList.remove('near-limit');
  submitStatus.textContent = '';
  submitStatus.className = 'submit-status';
}