/**
 * Property-based tests for form submission
 * Feature: haunted-feedback-form, Property 4: Valid form submission redirect
 * Validates: Requirements 2.1
 */

import { test } from 'node:test';
import assert from 'node:assert';
import fc from 'fast-check';
import { encodeFormData } from './script.js';

/**
 * Property 4: Valid form submission redirect
 * For any form data where all required fields are non-empty,
 * submitting the form should result in navigation to the result page
 * with URL parameters present.
 * 
 * This test verifies the core logic: that valid form data produces
 * a proper redirect URL with all parameters preserved.
 */
test('Property 4: Valid form submission redirect - all required fields present should redirect with params', () => {
    fc.assert(
      fc.property(
        // Generate random non-empty strings for required fields
        fc.string({ minLength: 1, maxLength: 100 }),  // name
        fc.constantFrom('Not spooky', 'A little spooky', 'Very spooky', 'Terrifying'),  // spooky_level
        fc.string({ maxLength: 100 }),  // favorite_creature (optional, can be empty)
        fc.string({ minLength: 1, maxLength: 500 }),  // message
        (name, spookyLevel, favoriteCreature, message) => {
          // Create a mock FormData object
          const formData = new Map();
          formData.set('name', name);
          formData.set('spooky_level', spookyLevel);
          formData.set('favorite_creature', favoriteCreature);
          formData.set('message', message);
          
          // Create a FormData-like object with get method
          const mockFormData = {
            get(key) {
              return formData.get(key);
            }
          };
          
          // Encode the form data
          const encodedParams = encodeFormData(mockFormData);
          
          // Construct the redirect URL (simulating what the handler does)
          const redirectUrl = `result.html?${encodedParams}`;
          
          // Verify redirect URL structure
          assert.ok(redirectUrl.includes('result.html'), 'Should redirect to result.html');
          assert.ok(redirectUrl.includes('?'), 'URL should contain query parameters');
          
          // Verify all required parameters are present and correct in URL
          const urlParams = new URLSearchParams(encodedParams);
          assert.strictEqual(urlParams.get('name'), name, 'Name parameter should match');
          assert.strictEqual(urlParams.get('spooky_level'), spookyLevel, 'Spooky level parameter should match');
          assert.strictEqual(urlParams.get('message'), message, 'Message parameter should match');
          
          // Optional field should be present (even if empty)
          assert.ok(urlParams.has('favorite_creature'), 'Favorite creature parameter should be present');
          assert.strictEqual(urlParams.get('favorite_creature'), favoriteCreature, 'Favorite creature should match');
        }
      ),
      { numRuns: 100 }
    );
});
