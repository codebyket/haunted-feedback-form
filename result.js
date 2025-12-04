/**
 * Extracts and decodes URL parameters from the current page
 * @returns {Object|null} Object with form field values, or null if parameters are missing
 */
export function getURLParameters() {
  const searchParams = new URLSearchParams(window.location.search);
  
  // Check if required parameters are present
  const name = searchParams.get('name');
  const spookyLevel = searchParams.get('spooky_level');
  const message = searchParams.get('message');
  
  // Handle missing required parameters gracefully
  if (!name || !spookyLevel || !message) {
    return null;
  }
  
  // Return all parameters (URLSearchParams handles decoding automatically)
  return {
    name: name,
    spooky_level: spookyLevel,
    favorite_creature: searchParams.get('favorite_creature') || null,
    message: message
  };
}

/**
 * Displays the generated spooky message or error message
 * @param {string} message - The message to display
 */
function displayMessage(message) {
  const container = document.getElementById('message-container');
  if (container) {
    container.textContent = message;
  }
}

// Initialize result page when DOM is loaded (only in browser environment)
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', async () => {
    // Get URL parameters
    const formData = getURLParameters();
    
    // Check for missing parameters
    if (!formData) {
      displayMessage('No feedback data found. Please fill out the form first.');
      return;
    }
    
    try {
      // Import and call generateMessage with form data
      const { generateMessage } = await import('./.kiro/hooks/generate_message.js');
      const spookyMessage = generateMessage(formData);
      
      // Display generated message
      displayMessage(spookyMessage);
    } catch (error) {
      console.error('Error generating message:', error);
      displayMessage('An error occurred while generating your spooky message. Please try again.');
    }
  });
}
