/**
 * Haunted Feedback Form - Message Generator
 * 
 * Generates a personalized spooky message based on user form input.
 * This hook demonstrates Kiro's capability to process structured data
 * and generate themed content.
 * 
 * Requirements: 3.2, 3.3, 3.5, 5.4
 */

/**
 * Generates a spooky message from form data
 * 
 * @param {Object} formData - The form submission data
 * @param {string} formData.name - User's name (required)
 * @param {string} formData.spooky_level - Selected spookiness level (required)
 * @param {string} [formData.favorite_creature] - User's favorite creature (optional)
 * @param {string} formData.message - User's feedback message (required)
 * @returns {string} A formatted spooky message with ghost emoji and atmospheric language
 */
function generateMessage(formData) {
  const { name, spooky_level, favorite_creature, message } = formData;
  
  // Handle empty favorite_creature by substituting default text
  const creature = favorite_creature && favorite_creature.trim() 
    ? favorite_creature.trim() 
    : "a mysterious unknown being";
  
  // Map spooky levels to atmospheric descriptions
  const spookyDescriptions = {
    "Not spooky": "gentle whispers from the other side",
    "A little spooky": "soft echoes through the haunted halls",
    "Very spooky": "chilling presence in the moonlit shadows",
    "Terrifying": "bone-chilling manifestation from beyond the veil"
  };
  
  const atmosphericLevel = spookyDescriptions[spooky_level] || "mysterious energy";
  
  // Generate the spooky message
  const spookyMessage = `
👻 Greetings, ${name}...

From beyond the ethereal realm, we sense your ${atmosphericLevel}. 
The spirits have taken note of your affinity for ${creature}, 
a creature that dwells in the shadows between worlds.

Your words echo through the haunted corridors:
"${message}"

The ghostly presence acknowledges your message and drifts back into the mist, 
leaving only this whispered response lingering in the air...

May the spirits watch over you. 👻
  `.trim();
  
  return spookyMessage;
}

// Export for use in both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { generateMessage };
}

// ES module export for modern environments
export { generateMessage };
