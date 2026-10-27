import { test, expect } from '@playwright/test';

test.describe('practice tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://qaplayground.com/practice');
    });
    test('should have the correct title', async ({ page }) => {
        await expect(page).toHaveTitle('Practice Elements | QA Playground – Selenium, Playwright & Cypress');
    });

    test('input fields test', async ({ page }) => {
        //navigate to the input fields section
        await page.getByText('Input Fields').click();
        //Type movie name in the input field
        await page.getByTestId('input-movie-name').fill('Inception');
        await page.getByRole('button', { name: 'Submit' }).click();
        //Verify the output
        await expect(page.getByTestId('result-s01')).toContainText('Inception');

        //Append Text & Press Tab
        const movieInput = page.getByTestId('input-append');

        await movieInput.click();
        await movieInput.pressSequentially(' - End Game');
        await movieInput.press('Tab');
        await expect(page.getByTestId('result-s02')).toContainText('End Game');

        //Read value from input field
        const inputValue = await page.locator('#readValueInput').inputValue();
        await page.getByRole('button', { name: 'Read Value' }).click();
        await expect(page.getByTestId('result-s03')).toContainText(inputValue);

        //Clear value from input field
        await page.getByRole('button', { name: 'Clear' }).click();
        await expect(page.getByTestId('result-s04')).toContainText('Field cleared ✓');

        //Verify if input field is disabled
        const isInputDisabled = await page.getByTestId('input-disabled').isDisabled();
        expect(isInputDisabled).toBeTruthy();
        await expect(page.getByTestId('result-s05')).toContainText('Input is disabled — typing is blocked');

        //Verify input field is readonly
        const isInputReadonly = await page.getByTestId('input-readonly').isEditable();
        expect(isInputReadonly).toBeFalsy();
    });

    test('Buttons test', async ({ page }) => {
        //navigate to the buttons section
        await page.getByTestId('new-practice-card-buttons').click();

        //Naviate to Home Page
        await page.getByRole('button', { name: 'Go To Home' }).click();
        await expect(page.getByTestId('result-s01')).toContainText('Navigated to Home Page');

        //Find co ordinates of the button
        await page.getByRole('button', { name: 'Find Location' }).click();
        const buttonCoordinates = await page.getByTestId('result-s02').textContent();
        expect(buttonCoordinates).toContain('X: ');

        //Find color of the button
        await page.getByRole('button', { name: 'Find my color?' }).click();
        const buttonColor = await page.getByTestId('result-s03').evaluate(element => getComputedStyle(element).backgroundColor);
        expect(buttonColor).toBeDefined();

        //Get my size of the button
        await page.getByRole('button', { name: 'Do you know my size?' }).click();
        const buttonSize = await page.getByTestId('result-s04').boundingBox();
        expect(buttonSize).toBeDefined();

        //Verify if button is disabled
        const isButtonDisabled = await page.locator('#disabledBtn').isDisabled();
        expect(isButtonDisabled).toBeTruthy();
        await expect(page.getByTestId('result-s05')).toContainText('Button is disabled — no action fires');

        //Click and hold the button
        const clickAndHoldButton = page.getByRole('button', { name: 'Click and Hold!' });
        await clickAndHoldButton.click({ delay: 1500 });
        await clickAndHoldButton.hover();
        await page.mouse.down();
        await page.waitForTimeout(1500);
        await page.mouse.up();
        await expect(page.getByTestId('result-s06')).toContainText('Held for 1.5s');

        //Double click the button
        const doubleClickButton = page.getByRole('button', { name: 'Double Click Me' });
        await doubleClickButton.dblclick();
        await expect(page.getByTestId('result-s07')).toContainText('Double clicked!');

        //Right Click button
        await page.getByRole('button', { name: 'Right Click Me' }).click({ button: 'right' });
        await expect(page.getByTestId('result-s08')).toContainText('Context menu triggered!');
    })

});