/**
 * Handles the "View Message" button click
 * Redirects to result page with URL parameters preserved
 */
function handleViewMessage() {
  // Get current URL parameters
  const params = window.location.search;
  
  // Redirect to result page with parameters
  window.location.href = `result.html${params}`;
}

// Attach event listener when DOM is loaded
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const viewButton = document.getElementById('view-message-btn');
    if (viewButton) {
      viewButton.addEventListener('click', handleViewMessage);
    }
  });
}

// Export for testing
export { handleViewMessage };
