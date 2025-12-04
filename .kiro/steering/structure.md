# Project Structure

## File Organization

### Root Level Files

- **index.html**: Main form page where users input their feedback
  - Contains form with 4 fields: name, spooky level, favorite creature, message
  - Includes form validation (HTML5 required attributes)
  - Links to shared stylesheet and form handler script

- **success.html**: Success confirmation page
  - Displays submission confirmation message
  - Provides button to view the generated spooky message
  - Passes URL parameters through to result page

- **result.html**: Result page displaying the generated spooky message
  - Extracts URL parameters on load
  - Displays personalized spooky message
  - Provides link back to form

- **style.css**: Shared stylesheet for both pages
  - Dark theme with black and purple gradients
  - Neon green and purple text colors
  - Glowing effects and atmospheric styling
  - Responsive layout for mobile and desktop

- **script.js**: Form submission handler
  - Prevents default form submission
  - Encodes form data as URL parameters
  - Redirects to success page with data

- **success.js**: Success page handler
  - Extracts URL parameters from success page
  - Redirects to result page when user clicks button

- **README.md**: Project documentation

### .kiro Directory

Kiro-specific files for demonstration and AI assistance:

- **.kiro/specs/haunted-feedback-form/**: Spec files
  - `requirements.md`: User stories and acceptance criteria
  - `design.md`: Architecture, components, correctness properties
  - `tasks.md`: Implementation plan and task breakdown

- **.kiro/steering/**: AI assistant guidelines
  - `product.md`: Product overview and purpose
  - `tech.md`: Technology stack and common commands
  - `structure.md`: This file - project organization
  - `spooky_style.md`: Tone and style guidelines (to be created)

- **.kiro/hooks/**: Kiro hooks for automation
  - `generate_message.js`: Message generation logic (to be created)

## Architecture Pattern

**Client-side only, three-page flow:**

1. User fills form on `index.html`
2. Form handler encodes data as URL parameters
3. Browser redirects to `success.html?name=...&spooky_level=...`
4. Success page displays confirmation
5. User clicks button to view message
6. Browser redirects to `result.html?name=...&spooky_level=...`
7. Result page decodes parameters and generates spooky message
8. Message displayed to user

## Data Flow

```
Form Input → URL Encoding → URL Parameters → URL Decoding → Message Generation → Display
```

All processing happens in the browser - no server-side logic required.

## Conventions

- Use semantic HTML5 elements
- Keep JavaScript vanilla (no frameworks)
- Maintain spooky theme consistency across all pages
- Use `encodeURIComponent()` / `decodeURIComponent()` for URL parameter handling
- Include ghost emoji (👻) in generated messages
- Default to "a mysterious unknown being" when favorite creature is empty
