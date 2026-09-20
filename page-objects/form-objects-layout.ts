import { Page } from '@playwright/test'
import { step } from "../helpers/test-step-decorators";
import { HelperBase } from "./page-objects-helper";

export class FormObjectsLayout extends HelperBase{
    constructor(page: Page) {
       super(page)
    }

    @step
    async submitUsingGridForm(email: string, password: string, options: string) {
        const gridForm = this.page.locator('nb-card', { hasText: "Using the Grid" });
        await gridForm.getByPlaceholder('Email').fill(email);
        await gridForm.getByPlaceholder('Password').fill(password);
        await this.page.getByText(options).check();
        await gridForm.getByRole('button', { name: 'Sign in' }).click();
    }
    @step
    async submitInlineForm(fullName: string, email: string, rememberMeChk: boolean) {
        const inlineForm = this.page.locator('nb-card', { hasText: "Inline form" });
        await inlineForm.getByRole('textbox', { name: 'Jane Doe' }).fill(fullName);
        await inlineForm.getByRole('textbox', { name: 'Email' }).fill(email);
        if (rememberMeChk) {
            await inlineForm.getByRole('checkbox', { name: 'Remember me' }).check({ force: true });
        }
        await inlineForm.getByRole('button', { name: 'Submit' }).click();
    }
}