import {test, expect} from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com/');
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Dialog').click();
})

test('Auto waiting', async ({ page }) => {
    const dialogWithDelay = page.locator('nb-card', {hasText: 'Open Dialog With Delay'})
    await dialogWithDelay.getByRole('button', {name:'3 seconds'}).click()

    const dialog = page.locator('nb-card', { hasText: 'Friendly reminder' })
    //await dialog.getByRole('button', {name:'OK'}).click()

    const dialogBox = page.locator('nb-dialog-container')

     //wait for the locator

    //await dialogBox.waitFor()
    //await page.waitForSelector('nb-dialog-container', { state: 'visible' })

    //wait for API response
    //await page.waitForResponse("**/delay/3")

    //Wait for load stage(Not recommended for real tests, only for demo purposes)
    await page.waitForLoadState('networkidle')

    //Hard wait(Don't use it in real tests, only for demo purposes)
    //await page.waitForTimeout(3500)


    const headerTexts = await page.locator('nb-card-header').allTextContents()
    await expect(headerTexts).toContain('Friendly reminder')
    await dialog.getByRole('button', {name:'OK'}).click()
})

test.afterEach(async ({ page }) => {
    await page.close()
})

