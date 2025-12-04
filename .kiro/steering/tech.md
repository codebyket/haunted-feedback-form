# Technology Stack

## Core Technologies

- **HTML5**: Structure for form and result pages
- **CSS3**: Styling with dark spooky theme, gradients, and glowing effects
- **Vanilla JavaScript (ES6)**: Form handling, URL parameter processing, message generation
- **No frameworks or build tools**: Pure web standards for simplicity

## Browser Compatibility

- Target modern browsers: Chrome, Firefox, Safari, Edge
- Uses standard HTML5 and ES6 features
- No polyfills required

## Testing

- **fast-check**: Property-based testing library for JavaScript
- Minimum 100 iterations per property test
- Focus on correctness properties defined in design document

## Project Structure

```
/
├── index.html          # Form page
├── result.html         # Result display page
├── style.css           # Shared spooky stylesheet
├── script.js           # Form handler
├── .kiro/
│   ├── specs/          # Spec files defining requirements and design
│   ├── steering/       # Guidelines for AI assistance
│   └── hooks/          # Message generation logic
└── README.md           # Project documentation
```

## Common Commands

### Running Locally

Open `index.html` in a web browser directly, or use a simple HTTP server:

```bash
# Python 3
python -m http.server 8000

# Node.js (if http-server is installed)
npx http-server

# PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000`

### Testing

Run property-based tests (once implemented):

```bash
npm test
```

### Deployment

Deploy static files to any hosting service:
- GitHub Pages
- Netlify
- Vercel
- Any static file host

No build process required - just upload the files.
