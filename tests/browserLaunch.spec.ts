import { chromium, test } from '@playwright/test';

test('browser launch', async ({ page }) => {

    const browser = await chromium.launch({
        headless: false,
        slowMo: 1000
    })

    const context = await browser.newContext();
    console.log('Context created ' + (context.browser()?.version() ?? 'unknown'));
})