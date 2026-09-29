import {test} from '@playwright/test';

test('first test', async ({ page }) => {
  await page.goto('/');
  await page.getByText('Playground').click();
});