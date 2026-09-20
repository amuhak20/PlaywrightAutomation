import {test, expect} from '@playwright/test'


import { PageObjectsManager } from '../helpers/page-objects-manager'
test.beforeEach(async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com')
})

test('Navigation', async ({ page }) => {
    const pom = new PageObjectsManager(page)
    await pom.NavigateTo.navigateToForms()
    await pom.NavigateTo.navigateToDatePicker()
    await pom.NavigateTo.navigateToTooltip()
    await pom.NavigateTo.navigateToToaster()
    await pom.NavigateTo.navigateToSmartTable() 
})

test('Parametrized Navigation', async ({ page }, testInfo) => {
      const pom = new PageObjectsManager(page)

    await pom.NavigateTo.navigateToForms()
    await pom.formObject.submitUsingGridForm('test@example.com', 'password123', 'Option 2')
    await pom.formObject.submitInlineForm('Jane Doe', 'jane.doe@example.com', false)
    await pom.datePicker.selectDateFromDatePicker(7)
    await pom.datePicker.selectDateRangeFromDatePicker(3, 10)

});
