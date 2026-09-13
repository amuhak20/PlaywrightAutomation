import {test} from '@playwright/test';

test('first test', async ({ page }) => {
  await page.goto('https://playground.bondaracademy.com/pages/iot-dashboard');
  await page.getByText('Playground').click();
});