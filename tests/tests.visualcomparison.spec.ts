import {test, expect} from '@playwright/test';

test.describe('Visual Comparison Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://qaplayground.com/practice');
    });

    test('compare images', async ({ page }) => {
        // Take a screenshot of the element to compare
        const element = page.getByTestId('new-practice-card-input-fields');
        const screenshot = await element.screenshot({ path: 'screenshots/input-fields.png' });

    });

    test('compare inuput field image'   , async ({ page }) => {
        // Take a screenshot of the element to compare
const element = page.getByTestId('new-practice-card-input-fields');
        const screenshot = await element.screenshot({ path: 'screenshots/input-fields.png' });
expect(screenshot).toMatchSnapshot('screenshots/input-fields.png');
    });
});