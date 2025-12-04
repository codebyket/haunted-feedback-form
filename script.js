/**
 * Encodes form data as URL parameters
 * @param {FormData} formData - The form data to encode
 * @returns {string} URL-encoded parameter string
 */
export function encodeFormData(formData) {
  const params = new URLSearchParams();
  
  // Extract and encode each form field
  const name = formData.get('name');
  const spookyLevel = formData.get('spooky_level');
  const favoriteCreature = formData.get('favorite_creature');
  const message = formData.get('message');
  
  // Add parameters (URLSearchParams handles encoding automatically)
  if (name !== null && name !== undefined) params.append('name', name);
  if (spookyLevel !== null && spookyLevel !== undefined) params.append('spooky_level', spookyLevel);
  if (favoriteCreature !== null && favoriteCreature !== undefined) params.append('favorite_creature', favoriteCreature);
  if (message !== null && message !== undefined) params.append('message', message);
  
  return params.toString();
}

/**
 * Handles form submission
 * @param {Event} event - The form submit event
 */
function handleFormSubmit(event) {
  event.preventDefault();
  
  // Get form data
  const form = event.target;
  const formData = new FormData(form);
  
  // Show submission confirmation
  showSubmissionConfirmation();
  
  // Encode form data as URL parameters
  const params = encodeFormData(formData);
  
  // Redirect to success page after brief delay
  setTimeout(() => {
    window.location.href = `success.html?${params}`;
  }, 1500);
}

/**
 * Displays a confirmation message after form submission
 */
function showSubmissionConfirmation() {
  const form = document.getElementById('feedback-form');
  const confirmation = document.createElement('div');
  confirmation.className = 'submission-confirmation';
  confirmation.innerHTML = '👻 Form Submitted! Summoning spirits... 👻';
  
  form.parentNode.insertBefore(confirmation, form);
  form.style.opacity = '0.5';
  form.style.pointerEvents = 'none';
}

// Attach event listener when DOM is loaded (only in browser environment)
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('feedback-form');
    if (form) {
      form.addEventListener('submit', handleFormSubmit);
      console.log('Form handler attached successfully');
    } else {
      console.error('Form not found!');
    }
  });
}
