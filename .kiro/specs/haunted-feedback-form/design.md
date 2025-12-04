# Design Document

## Overview

The Haunted Feedback Form is a client-side web application consisting of three HTML pages connected through URL parameter passing. The application uses vanilla JavaScript for form handling and message generation, with CSS providing the spooky atmospheric theme. No backend or database is required, making it lightweight and easy to deploy.

The application flow is linear: user fills form → form submits → success page confirms → result page displays spooky message.

## Architecture

### High-Level Architecture

```
┌─────────────────┐
│   index.html    │
│  (Form Page)    │
└────────┬────────┘
         │
         │ User submits form
         ▼
┌─────────────────┐
│   script.js     │
│ (Form Handler)  │
└────────┬────────┘
         │
         │ Encodes data as URL params
         ▼
┌─────────────────┐
│  success.html   │
│ (Success Page)  │
└────────┬────────┘
         │
         │ User clicks to view message
         ▼
┌─────────────────┐
│  result.html    │
│ (Result Page)   │
└────────┬────────┘
         │
         │ Decodes URL params
         ▼
┌─────────────────┐
│generate_message │
│  (Kiro Hook)    │
└────────┬────────┘
         │
         │ Returns formatted message
         ▼
┌─────────────────┐
│  Display to     │
│     User        │
└─────────────────┘
```

### Technology Stack

- **HTML5**: Structure for form and result pages
- **CSS3**: Styling with dark spooky theme
- **Vanilla JavaScript**: Form handling, URL parameter processing, message generation
- **Kiro Features**: Specs, hooks, and steering files for demonstration

### Design Principles

1. **Simplicity**: No frameworks, no build process, no backend
2. **Client-side only**: All processing happens in the browser
3. **Progressive enhancement**: Works with basic HTML form submission as fallback
4. **Atmospheric consistency**: Spooky theme maintained throughout

## Components and Interfaces

### 1. Form Page (index.html)

**Purpose**: Collect user input through a themed feedback form

**Structure**:
- HTML form element with four input fields
- Submit button
- Link to shared stylesheet

**Form Fields**:
```javascript
{
  name: string (required),
  spooky_level: string (required, one of 4 options),
  favorite_creature: string (optional),
  message: string (required)
}
```

**Validation**:
- HTML5 `required` attribute on name, spooky_level, and message fields
- Browser native validation messages

### 2. Form Handler (script.js)

**Purpose**: Process form submission and redirect with data

**Functions**:

```javascript
// Handles form submission event
function handleFormSubmit(event)
  Input: FormEvent
  Output: void (redirects to result.html)
  
// Encodes form data as URL parameters
function encodeFormData(formData)
  Input: FormData object
  Output: URLSearchParams string
```

**Behavior**:
- Prevents default form submission
- Extracts form field values
- Encodes values as URL parameters
- Redirects to result.html with parameters

### 3. Success Page (success.html)

**Purpose**: Confirm form submission and provide transition to result page

**Structure**:
- Container for confirmation message
- Button or link to view the spooky message
- Link to shared stylesheet

**Functions**:

```javascript
// Extracts URL parameters to pass to result page
function getURLParameters()
  Input: window.location.search
  Output: URLSearchParams string
  
// Redirects to result page with parameters
function viewMessage()
  Input: void
  Output: void (redirects to result.html)
```

**Behavior**:
- Displays confirmation message: "Your spooky feedback has been submitted!"
- Maintains spooky theme consistency
- Provides clear call-to-action to view the generated message
- Passes URL parameters through to result page

### 4. Result Page (result.html)

**Purpose**: Display the generated spooky message

**Structure**:
- Container for displaying the spooky message
- Link to shared stylesheet
- Inline or linked script for URL parameter extraction

**Functions**:

```javascript
// Extracts URL parameters on page load
function getURLParameters()
  Input: window.location.search
  Output: Object with form field values
  
// Displays the generated message
function displayMessage(formData)
  Input: Form data object
  Output: void (updates DOM)
```

### 5. Message Generator (generate_message.js)

**Purpose**: Generate personalized spooky message from form data

**Interface**:

```javascript
function generateMessage(formData)
  Input: {
    name: string,
    spooky_level: string,
    favorite_creature: string | undefined,
    message: string
  }
  Output: string (formatted spooky message)
```

**Logic**:
- Substitutes "a mysterious unknown being" if favorite_creature is empty
- Formats message with ghost emoji and atmospheric language
- Includes all user inputs in the response

### 6. Stylesheet (style.css)

**Purpose**: Provide consistent spooky visual theme

**Color Scheme**:
- Background: Black (#000000) and dark purple (#1a0033, #2d0052)
- Text: Neon green (#00ff41, #39ff14) and purple (#b19cd9, #9d4edd)
- Accents: Ghostly white (#f0f0f0) for highlights

**Key Styles**:
- Dark gradient backgrounds
- Glowing text effects for headings
- Themed form inputs with hover states
- Responsive layout for mobile and desktop

## Data Models

### FormData

```javascript
{
  name: string,           // User's name (required)
  spooky_level: string,   // One of: "Not spooky", "A little spooky", 
                          //         "Very spooky", "Terrifying" (required)
  favorite_creature: string | null,  // Optional creature name
  message: string         // User's feedback message (required)
}
```

### URLParameters

```
?name=<encoded_name>&spooky_level=<encoded_level>&favorite_creature=<encoded_creature>&message=<encoded_message>
```

All values are URL-encoded using `encodeURIComponent()` to handle special characters.

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property 1: Form data round-trip preservation

*For any* valid form data (name, spooky_level, favorite_creature, message), encoding the data as URL parameters and then decoding those parameters should produce equivalent form data with all field values preserved.

**Validates: Requirements 2.3, 2.4, 3.1**

### Property 2: Required field validation

*For any* form submission attempt where one or more required fields (name, spooky_level, message) are empty, the form should prevent submission and the user should remain on the form page.

**Validates: Requirements 2.2**

### Property 3: Message content completeness

*For any* form data, the generated spooky message should contain the user's name, the selected spooky level, the favorite creature (or default text), the original message, and a ghost emoji.

**Validates: Requirements 3.2, 3.5, 5.4**

### Property 4: Valid form submission redirect

*For any* form data where all required fields are non-empty, submitting the form should result in navigation to the success page with URL parameters present.

**Validates: Requirements 2.1**

### Property 5: Success page parameter preservation

*For any* URL parameters received by the success page, clicking the button to view the message should redirect to the result page with all parameters preserved.

**Validates: Requirements 2.5.4**

## Error Handling

### Form Validation Errors

**Scenario**: User attempts to submit form with empty required fields

**Handling**:
- Browser native HTML5 validation prevents submission
- Browser displays validation message for first invalid field
- Form remains in current state
- No navigation occurs

### URL Parameter Errors

**Scenario**: User navigates directly to result.html without parameters

**Handling**:
- Check for presence of required URL parameters
- If missing, display friendly error message: "No feedback data found. Please fill out the form first."
- Provide link back to index.html

**Scenario**: URL parameters contain malformed data

**Handling**:
- Use try-catch around URL parameter decoding
- If decoding fails, display error message and link to form
- Log error to console for debugging

### Special Characters

**Scenario**: User enters special characters or emoji in form fields

**Handling**:
- Use `encodeURIComponent()` for URL encoding
- Use `decodeURIComponent()` for URL decoding
- Preserve all characters including emoji, quotes, and special symbols

## Testing Strategy

### Unit Testing

The application will use a minimal unit testing approach focused on core logic:

**Form Handler Tests**:
- Test that `encodeFormData()` correctly encodes simple form data
- Test that special characters are properly encoded
- Test that empty optional fields are handled

**URL Parameter Tests**:
- Test that `getURLParameters()` correctly decodes simple parameters
- Test that special characters are properly decoded
- Test that missing parameters are detected

**Message Generator Tests**:
- Test that `generateMessage()` includes all required elements with sample data
- Test that default creature text is used when favorite_creature is empty
- Test that ghost emoji is present in output

### Property-Based Testing

The application will use property-based testing to verify correctness properties across many randomly generated inputs. We will use **fast-check** (for JavaScript) as the property-based testing library.

**Configuration**:
- Each property test should run a minimum of 100 iterations
- Each test must be tagged with a comment referencing the design document property

**Property Test 1: Form data round-trip preservation**
```javascript
// Feature: haunted-feedback-form, Property 1: Form data round-trip preservation
```
- Generate random form data objects with various string inputs
- Encode as URL parameters, then decode
- Verify all fields match original values
- Test with special characters, emoji, long strings, empty optional fields

**Property Test 2: Required field validation**
```javascript
// Feature: haunted-feedback-form, Property 2: Required field validation
```
- Generate form data with various combinations of empty required fields
- Attempt form submission
- Verify submission is prevented
- Verify user remains on form page

**Property Test 3: Message content completeness**
```javascript
// Feature: haunted-feedback-form, Property 3: Message content completeness
```
- Generate random form data
- Generate spooky message
- Verify message contains: name, spooky level, creature/default, original message, ghost emoji
- Test with various input lengths and character types

**Property Test 4: Valid form submission redirect**
```javascript
// Feature: haunted-feedback-form, Property 4: Valid form submission redirect
```
- Generate random valid form data (all required fields non-empty)
- Submit form
- Verify navigation to success.html occurs
- Verify URL contains parameters

**Property Test 5: Success page parameter preservation**
```javascript
// Feature: haunted-feedback-form, Property 5: Success page parameter preservation
```
- Generate random URL parameters
- Load success page with those parameters
- Click button to view message
- Verify navigation to result.html with all parameters preserved

### Integration Testing

Since this is a simple client-side application, integration testing will be minimal:

- Manual testing of complete user flow: form fill → submit → view result
- Cross-browser testing (Chrome, Firefox, Safari)
- Mobile responsiveness testing

### Testing Approach

1. Implement core functionality first
2. Write property-based tests for each correctness property
3. Write unit tests for edge cases discovered during development
4. Perform manual integration testing
5. Fix any issues discovered by tests

## Implementation Notes

### Browser Compatibility

- Target modern browsers (Chrome, Firefox, Safari, Edge)
- Use standard HTML5 and ES6 features
- No polyfills needed for this simple application

### Deployment

- Static files only - can be hosted on any web server
- No build process required
- Can be deployed to GitHub Pages, Netlify, Vercel, or any static host

### Performance

- Minimal JavaScript execution
- No external dependencies
- Fast page loads (< 100ms)
- No network requests after initial page load

### Accessibility

- Semantic HTML elements
- Form labels associated with inputs
- Sufficient color contrast for readability
- Keyboard navigation support

### Future Enhancements

Potential improvements outside the current scope:
- Local storage to persist form data
- Multiple spooky message templates
- Animation effects for message reveal
- Sound effects
- Social sharing functionality
