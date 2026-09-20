import { Page } from "playwright-core";
export class HelperBase {

    protected readonly page: Page
    protected constructor(page: Page) {
        this.page = page;
    }

    async getMessage() {
        console.log("Playwright is cool to learn")
    }
}