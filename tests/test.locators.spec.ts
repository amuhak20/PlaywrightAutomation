import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://playground.bondaracademy.com/pages/iot-dashboard');
  await page.getByText('Forms').click();
  await page.getByText('Form Layouts').click();
})


test('locator Strategy', async ({ page }) => {
  //1. by Tag Name
  page.locator('input')

  //2. by ID
  page.locator('#inputEmail1')

  //3. by Class Name
  page.locator('.input-full-width')

  //4. by Attribute
  page.locator("[placeholder='Email']")

  //5. by Attribute with value
  page.locator("[placeholder='Email'][type='email']")

  //6. by Class Value
  page.locator("[class='input-full-width size-medium shape-rectangle']")

  //7. by Tag Name with Attribute
  page.locator("input[placeholder='Email']")

  //8. by Two different attributes
  page.locator("input[placeholder='Email'][type='email']")

  //9. by Text
  page.locator('text=Email')

  //10. by Text with Tag Name
  page.locator("label:text('Email')")
  
  //11. by Text with Tag Name with Attribute
  page.locator("label:text('Email') + input")

  //12. by XPath
  page.locator("//input[@placeholder='Email']")

  //By link
  page.getByRole('link', { name: 'Modal & Overlays' })


})

test('User visible fields', async ({ page }) => {
    await page.getByRole('button', { name: 'Sign in' }).first().click()
    await page.getByRole('textbox', { name: 'Email' }).first().fill('test@test.com')
    await page.getByPlaceholder('Jane Doe').fill('Ronaldo')
    await page.getByText('submit').first().click()
    await page.getByTestId('inputEmail1').click()

})

test('Finding child elements', async ({ page }) => {
await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 1")').click()
await page.locator('nb-card nb-radio :text-is("Option 2")').click()

})

test('using the parent child chaining', async ({ page }) => {
  await page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('button').click();
  await page.locator('nb-card').filter({ hasText: 'Using the Grid' }).getByRole('button').click();
  await page.locator('nb-card').filter({ has: page.locator('#inputEmail1') }).getByRole('button').click();

  await page.locator('nb-card')
    .filter({ has: page.locator('nb-checkbox') })
    .filter({ hasText: 'Sign in' })
    .getByLabel('Email')
    .fill('test@test.com')
})

test('Reusing locators', async ({ page }) => {

    const card = page.locator('nb-card', { hasText: 'Basic form' })
    await card.getByLabel('Email').fill('test@test.com')
    await card.getByLabel('Password').fill('test')
    await card.locator('nb-checkbox').click()
    await card.getByRole('button').click()

})

test('Extract text value from the locator', async ({ page }) => {

    //Extract single text value from the locator
    const card = page.locator('nb-card', { hasText: 'Basic form' })
    const buttonText = await card.getByRole('button').textContent()
    //console.log(buttonText)
    expect(buttonText).toEqual('Submit')

    //Extract multiple text values from the locator
    const allRadioButtons = page.locator('nb-radio')
    const allRadioButtonsText = await allRadioButtons.allTextContents()
    console.log(allRadioButtonsText)
    expect(allRadioButtonsText).toEqual(['Option 1', 'Option 2', 'Disabled Option'])
    expect(allRadioButtonsText).toContain('Option 1')

    //Extract text from input field
    await card.getByLabel('Email').fill('test@test.com')
    const inputValue = await card.getByLabel('Email').inputValue()
    console.log(inputValue)

    //Extract attribute value from the locator
    const placeholderValue = await card.getByLabel('Email').getAttribute('placeholder')
    console.log(placeholderValue)
})

test('Assertions', async ({ page }) => {
    //Generic Assertions
    const card = page.locator('nb-card', { hasText: 'Basic form' }).getByRole('button')

    const buttonText = await card.textContent()
    expect(buttonText).toEqual('Submit')

    //locator Assertions
    await expect(card).toHaveText('Submit')

    //soft Assertions
    await expect.soft(card).toContainText('Submit')
    await card.click()

})


test.afterEach(async ({ page }) => {
  await page.close()
})