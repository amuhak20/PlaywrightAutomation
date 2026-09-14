import { test, expect } from "@playwright/test"

test.beforeEach(async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com/')
})

test.describe('UI Components', () => {

    test.beforeEach(async ({ page }) => {
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    })


test('Input boxes', async ({ page }) => {
    await page.getByTestId('inputEmail1').fill('test@test.com')
    const emailText = await page.getByTestId('inputEmail1').inputValue()
    expect(emailText).toContain('test.com')
    await page.getByTestId('inputEmail1').clear()
    const clearedEmailText = await page.getByTestId('inputEmail1').inputValue()
    expect(clearedEmailText).toBe('')
})

test('radio buttons', async ({ page }) => {
    const firstRadioButton = page.getByRole('radio', { name: 'Option 1' })
    await firstRadioButton.check({ force: true })
    await expect(firstRadioButton).toBeChecked()
    const isFirstRadioButtonChecked = await firstRadioButton.isChecked()
    expect(isFirstRadioButtonChecked).toBeTruthy()

    const secondRadioButton = page.getByRole('radio', { name: 'Option 2' })
    await secondRadioButton.check({ force: true })
    await expect(firstRadioButton).not.toBeChecked()
    const isFirstRadioButtonUnChecked = await firstRadioButton.isChecked()
    expect(isFirstRadioButtonUnChecked).toBeFalsy()
})
})

test('checkboxes', async ({ page }) => {
await page.getByText('Modal & Overlays').click()
await page.getByText('Toastr').click()
// Use the Locator for assertions: .check() returns void, so don't assign its result
const checkbox = page.getByRole('checkbox', { name: 'Hide on click' })
await checkbox.check({ force: true })
await expect(checkbox).toBeChecked()

const checkboxCount = page.getByRole('checkbox')
console.log(`Total checkboxes on the page: ${await checkboxCount.count()}`)
    

    // iterate by index to get a Locator for each checkbox (Locator.nth returns a Locator)
    const total = await checkboxCount.count()
    for (let  i = 0; i < total; i++) {
        const chkbx = checkboxCount.nth(i)
        await chkbx.uncheck({ force: true })
        await expect(chkbx).not.toBeChecked()
    }

})

test('Dropdowns and Lists', async ({ page }) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

    // Standard dropdown selection
    await page.locator('.form-group', { hasText: 'Toast type:' }).getByRole('combobox').selectOption('info')
    const selectedOption = await page.locator('.form-group', { hasText: 'Toast type:' }).getByRole('combobox').inputValue()
    expect(selectedOption).toBe('info')
    expect(page.getByRole('combobox')).toHaveValue('info')

    // Custom dropdown selection
    await page.locator('.form-group', { hasText: 'Position:' }).locator('nb-select').click()
    // select the option by visible text
    await page.locator('nb-option', { hasText: 'top-right' }).click()

    // Verify the selected value is displayed in the nb-select's button
    const selectButton = page.locator('.form-group', { hasText: 'Position:' }).locator('nb-select .select-button')
    console.log(`Selected position: ${await selectButton.textContent()}`)
    await expect(selectButton).toHaveText('top-right')

        // Iterate through all options in the standard combobox and log their text
        const options = await page.locator('.form-group', { hasText: 'Toast type:' }).getByRole('combobox').locator('option').allTextContents()
        const optionCount = options.length
        console.log(`Total options in the dropdown: ${optionCount}`)
        for (let i = 0; i < optionCount; i++) {
            const text = options[i]
            console.log(text.toString())
        }

        for (const option of options) {
            const text = option.toString()
            console.log("For Each loop: " +text)
        }
})
test('Tooltips', async ({ page }) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()

const hoverText = await page.getByRole('button', { name: 'Left' }).hover()
const tooltipText = await page.getByRole('tooltip').textContent()
console.log(tooltipText)
expect(tooltipText).toEqual('This is a tooltip')

})

test('dialog boxes', async ({ page }) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    page.on('dialog', async dialog => {
        expect (dialog.message()).toContain('Are you sure you want to delete?')
        console.log(`Dialog message: ${dialog.message()}`)
        await dialog.accept()
    })

    await page.locator('tr', {hasText: 'mdo@gmail.com'}).locator('.nb-trash').click()

})

test('Web Tables', async ({ page }) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    //Select row by visible text and edit the age value
    const tableRow = page.getByRole('row', {name: 'twitter@outlook.com'})
    await tableRow.locator('.nb-edit').click()
    await tableRow.getByPlaceholder('Age').fill('25')
    await tableRow.locator('.nb-checkmark').click()
    await expect(tableRow.locator('td').last()).toHaveText('25')

    //Select row by index and edit the age value
    const tableRowByIndex = page.getByRole('row').filter({ has: page.getByRole('cell').nth(1).getByText('10') })
    const rowByIdex = page.getByRole('row', {name: '10'})
    await tableRowByIndex.locator('.nb-edit').click()
    await rowByIdex.getByPlaceholder('E-mail').fill('test@test.com')
    await rowByIdex.locator('.nb-checkmark').click()
    await expect(tableRowByIndex.locator('td').nth(5)).toHaveText('test@test.com')

    //Iterate all rows and verify data
    const ages = ["20", "30", "40", "150"]

    for (const age of ages) {
        console.log(`Verifying age: ${age}`)
        await page.getByPlaceholder('Age').fill(age)

        if (age == "150") {
           await expect(page.locator('tbody')).toContainText('No data found')
        } else {
            const rows = await page.locator('tbody').all()
            for (const row of rows) {
                await expect(row.locator('td').last()).toHaveText(age)
            }
        }
    }

})
test.afterEach(async ({ page }) => {
    await page.close()
})