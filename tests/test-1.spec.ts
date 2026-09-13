import { test, expect } from '@playwright/test';

/**
 * tests/test-1.spec.ts
 *
 * End-to-end Playwright test for the "Form Layouts" page on
 * playground.bondaracademy.com. The test drives the UI to fill a
 * simple form, toggle the custom checkbox, and submit it.
 */

/**
 * Verifies the form submission flow for the "Form Layouts" example.
 *
 * Steps:
 * 1. Navigate to the dialog page and open the Forms > Form Layouts view.
 * 2. Fill the "Jane Doe" textbox and the email placeholder field.
 * 3. Click the visible custom "Remember me" checkbox inside the form.
 * 4. Submit the form and (optionally) assert expected results.
 */
test('form layouts: fill and submit', async ({ page }) => {
  // Navigate to the dialog page that contains the Forms links
  await page.goto('https://playground.bondaracademy.com/pages/modal-overlays/dialog');

  // Open the Forms section and then the Form Layouts example
  await page.getByRole('link', { name: 'Forms' }).click();
  await page.getByRole('link', { name: 'Form Layouts' }).click();

  // Fill the visible "Jane Doe" textbox (example name field)
  await page.getByRole('textbox', { name: 'Jane Doe' }).fill('Teste');

  // Locate the specific form by text content and fill the email placeholder
  await page.locator('form').filter({ hasText: 'Remember meSubmit' }).getByPlaceholder('Email').fill('test@test.com');

  // Click the visible custom checkbox associated with the "Remember me" label
  // (scoped to the specific form to avoid strict-mode multiple-match errors)
  await page
    .locator('form')
    .filter({ hasText: 'Remember meSubmit' })
    .locator('label:has-text("Remember me") .custom-checkbox')
    .click();

  // Submit the form using the button inside the same form scope
  await page.locator('form').filter({ hasText: 'Remember meSubmit' }).getByRole('button').click();

  // Optional: add assertions here, e.g. expect a success message or navigation
});