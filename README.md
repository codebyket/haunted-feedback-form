# 👻 Haunted Feedback Form

A spooky-themed web application that collects user feedback through an interactive form and displays a ghost-like, atmospheric response message. Built to demonstrate Kiro's capabilities in a hackathon setting.

## Purpose

The Haunted Feedback Form showcases:
- **Kiro Specs**: Structured requirements, design, and implementation planning
- **Kiro Hooks**: Automated message generation logic
- **Kiro Steering**: AI assistance guidelines for consistent tone and style
- **Client-side simplicity**: No backend or database required

## Features

- 🎃 Interactive feedback form with themed inputs
  - Name (required)
  - Spooky level selector (required)
  - Favorite creature (optional)
  - Message textarea (required)
- 👻 Personalized spooky message generation
- 🌙 Dark atmospheric visual theme with neon green/purple colors
- ✨ Glowing text effects and gradient backgrounds
- 📱 Responsive design for mobile and desktop

## Running Locally

### Option 1: Open Directly in Browser

Simply open `index.html` in your web browser. This works for basic functionality.

### Option 2: Use a Local HTTP Server (Recommended)

For full functionality and to avoid CORS issues:

**Using Python 3:**
```bash
python -m http.server 8000
```

**Using Node.js:**
```bash
npx http-server
```

**Using PHP:**
```bash
php -S localhost:8000
```

Then navigate to `http://localhost:8000` in your browser.

## How It Works

1. User fills out the feedback form on `index.html`
2. Form handler (`script.js`) encodes data as URL parameters
3. Browser redirects to `success.html` with the encoded data
4. Success page displays confirmation message
5. User clicks button to view their spooky message
6. Browser redirects to `result.html` with the parameters
7. Result page decodes parameters and generates a spooky message
8. Personalized message is displayed with atmospheric formatting

All processing happens client-side - no server required!

## Kiro Features Used

### 1. Specs (.kiro/specs/haunted-feedback-form/)

The project uses Kiro's spec-driven development workflow:

- **requirements.md**: User stories and acceptance criteria following EARS patterns
- **design.md**: Architecture, components, data models, and correctness properties
- **tasks.md**: Implementation plan with numbered, actionable coding tasks

### 2. Hooks (.kiro/hooks/)

- **generate_message.js**: Automated message generation logic that creates personalized spooky responses based on form input

### 3. Steering (.kiro/steering/)

AI assistance guidelines that ensure consistency:

- **product.md**: Product overview and purpose
- **tech.md**: Technology stack and common commands
- **structure.md**: Project organization and conventions
- **spooky_style.md**: Tone and style guidelines for atmospheric content

## Testing

The project uses property-based testing with **fast-check** to verify correctness properties.

### Install Dependencies

```bash
npm install
```

### Run Tests

```bash
npm test
```

### Property-Based Tests

The test suite includes property-based tests for:

1. **Form data round-trip preservation**: Encoding and decoding URL parameters preserves all data
2. **Message content completeness**: Generated messages contain all required elements
3. **Valid form submission redirect**: Valid forms redirect to result page with parameters

Each property test runs 100 iterations with randomly generated inputs to ensure correctness across a wide range of scenarios.

## Deployment

Deploy the static files to any hosting service:

### GitHub Pages

1. Push your code to a GitHub repository
2. Go to Settings → Pages
3. Select your branch and root directory
4. Your site will be live at `https://username.github.io/repo-name/`

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

Or drag and drop your project folder into the Netlify web interface.

### Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Any Static Host

Simply upload all files to your web server. No build process required!

## Technology Stack

- **HTML5**: Semantic structure for form and result pages
- **CSS3**: Dark spooky theme with gradients and glowing effects
- **Vanilla JavaScript (ES6)**: Form handling and URL parameter processing
- **fast-check**: Property-based testing library

No frameworks, no build tools - just pure web standards.

## Project Structure

```
/
├── index.html                    # Form page
├── success.html                  # Success confirmation page
├── success.js                    # Success page logic
├── result.html                   # Result display page
├── result.js                     # Result page logic
├── style.css                     # Shared spooky stylesheet
├── script.js                     # Form handler
├── .kiro/
│   ├── specs/
│   │   └── haunted-feedback-form/
│   │       ├── requirements.md   # User stories and acceptance criteria
│   │       ├── design.md         # Architecture and correctness properties
│   │       └── tasks.md          # Implementation plan
│   ├── steering/
│   │   ├── product.md            # Product overview
│   │   ├── tech.md               # Technology stack
│   │   ├── structure.md          # Project organization
│   │   └── spooky_style.md       # Tone and style guidelines
│   └── hooks/
│       └── generate_message.js   # Message generation logic
├── *_test.js                     # Property-based tests
├── package.json                  # Dependencies
└── README.md                     # This file
```

## Browser Compatibility

Targets modern browsers:
- Chrome
- Firefox
- Safari
- Edge

Uses standard HTML5 and ES6 features - no polyfills required.

## Contributing

This project was created for the Kiroween hackathon to demonstrate Kiro's spec-driven development features. Feel free to fork and modify for your own spooky projects!

## License

MIT

---

*From beyond the veil, we welcome your feedback... 👻*
