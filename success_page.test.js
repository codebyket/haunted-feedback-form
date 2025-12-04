/**
 * Property-based tests for success page parameter preservation
 * Feature: haunted-feedback-form, Property 5: Success page parameter preservation
 * Validates: Requirements 2.5.4
 */

import { test } from 'node:test';
import assert from 'node:assert';
import fc from 'fast-check';

/**
 * Property 5: Success page parameter preservation
 * For any URL parameters received by the success page,
 * clicking the button to view the message should redirect to the result page
 * with all parameters preserved.
 */
test('Property 5: Success page parameter preservation - all parameters should be preserved when redirecting to result page', async () => {
  await fc.assert(
    fc.asyncProperty(
      // Generate random form data that would be in URL parameters
      fc.record({
        name: fc.string({ minLength: 1, maxLength: 100 }),
        spooky_level: fc.constantFrom('Not spooky', 'A little spooky', 'Very spooky', 'Terrifying'),
        favorite_creature: fc.string({ maxLength: 100 }),
        message: fc.string({ minLength: 1, maxLength: 500 })
      }),
      async (formData) => {
        // Create URL parameters from form data
        const params = new URLSearchParams();
        params.set('name', formData.name);
        params.set('spooky_level', formData.spooky_level);
        params.set('favorite_creature', formData.favorite_creature);
        params.set('message', formData.message);
        
        const queryString = params.toString();
        
        // Create a mock window.location object
        let redirectUrl = null;
        const mockWindow = {
          location: {
            search: `?${queryString}`,
            href: `http://localhost/success.html?${queryString}`,
            toString() {
              return this.href;
            }
          }
        };
        
        // Override href setter to capture redirects
        Object.defineProperty(mockWindow.location, 'href', {
          get() {
            return redirectUrl || `http://localhost/success.html?${queryString}`;
          },
          set(value) {
            redirectUrl = value;
          }
        });
        
        // Set global window for the module
        global.window = mockWindow;
        
        // Import the success.js module (fresh import for each test)
        const modulePath = `./success.js?${Date.now()}-${Math.random()}`;
        const { handleViewMessage } = await import(modulePath);
        
        // Call the handler to simulate button click
        handleViewMessage();
        
        // Verify redirect occurred
        assert.ok(redirectUrl !== null, 'Should redirect to result page');
        assert.ok(redirectUrl.includes('result.html'), 'Should redirect to result.html');
        
        // Extract parameters from redirect URL
        const redirectUrlObj = new URL(redirectUrl, 'http://localhost');
        const redirectParams = redirectUrlObj.searchParams;
        
        // Verify all parameters are preserved
        assert.strictEqual(
          redirectParams.get('name'),
          formData.name,
          'Name parameter should be preserved'
        );
        assert.strictEqual(
          redirectParams.get('spooky_level'),
          formData.spooky_level,
          'Spooky level parameter should be preserved'
        );
        assert.strictEqual(
          redirectParams.get('favorite_creature'),
          formData.favorite_creature,
          'Favorite creature parameter should be preserved'
        );
        assert.strictEqual(
          redirectParams.get('message'),
          formData.message,
          'Message parameter should be preserved'
        );
        
        // Cleanup
        delete global.window;
      }
    ),
    { numRuns: 100 }
  );
});
