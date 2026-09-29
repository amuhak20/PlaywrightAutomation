import { test, expect } from "@playwright/test"

test('Input boxes', async ({ page }) => {
    await page.goto('/')
    await page.locator('.sidebar-toggle').click()
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    await page.locator('.sidebar-toggle').click()

    await page.getByTestId('inputEmail1').fill('test@test.com')
    const emailText = await page.getByTestId('inputEmail1').inputValue()
    expect(emailText).toContain('test.com')
    await page.getByTestId('inputEmail1').clear()
    const clearedEmailText = await page.getByTestId('inputEmail1').inputValue()
    await page.screenshot({path:'screenshots/inputboxfail.png'})
    expect(clearedEmailText).toBe('')
})