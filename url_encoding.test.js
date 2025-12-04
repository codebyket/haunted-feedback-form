import { test } from 'node:test';
import assert from 'node:assert';
import * as fc from 'fast-check';
import { encodeFormData } from './script.js';

/**
 * Feature: haunted-feedback-form, Property 1: Form data round-trip preservation
 * Validates: Requirements 2.3, 2.4, 3.1
 * 
 * For any valid form data (name, spooky_level, favorite_creature, message),
 * encoding the data as URL parameters and then decoding those parameters
 * should produce equivalent form data with all field values preserved.
 */
test('Property 1: Form data round-trip preservation', async () => {
  await fc.assert(
    fc.asyncProperty(
      // Generate arbitrary form data
      fc.record({
        name: fc.string({ minLength: 1 }),
        spooky_level: fc.constantFrom(
          'Not spooky',
          'A little spooky',
          'Very spooky',
          'Terrifying'
        ),
        favorite_creature: fc.option(fc.string(), { nil: null }),
        message: fc.string({ minLength: 1 })
      }),
      async (formData) => {
        // Create FormData object
        const form = new FormData();
        form.append('name', formData.name);
        form.append('spooky_level', formData.spooky_level);
        if (formData.favorite_creature !== null) {
          form.append('favorite_creature', formData.favorite_creature);
        }
        form.append('message', formData.message);
        
        // Encode the form data
        const encoded = encodeFormData(form);
        
        // Decode by parsing the URL parameters (URLSearchParams handles decoding automatically)
        const params = new URLSearchParams(encoded);
        const decoded = {
          name: params.get('name'),
          spooky_level: params.get('spooky_level'),
          favorite_creature: params.get('favorite_creature'),
          message: params.get('message')
        };
        
        // Verify all fields are preserved
        assert.strictEqual(decoded.name, formData.name, 'Name should be preserved');
        assert.strictEqual(decoded.spooky_level, formData.spooky_level, 'Spooky level should be preserved');
        assert.strictEqual(decoded.favorite_creature, formData.favorite_creature, 'Favorite creature should be preserved');
        assert.strictEqual(decoded.message, formData.message, 'Message should be preserved');
      }
    ),
    { numRuns: 100 }
  );
});
