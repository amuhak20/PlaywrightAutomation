import { Page } from "playwright/test";
import { step } from "../helpers/test-step-decorators";
import { HelperBase } from "./page-objects-helper";

export class NavigatePage extends HelperBase{
    constructor(page: Page) {
        super(page);
    }

    @step
    async navigateToForms() {
        await this.selectGroupMenuItem('Forms')
        await this.page.getByText('Form Layouts').click()
    }

    @step
    async navigateToDatePicker() {
        await this.selectGroupMenuItem('Forms')
        await this.page.getByText('Datepicker').click()
    }
    @step
    async navigateToTooltip() {
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Tooltip').click()
    }
    @step
    async navigateToToaster() {
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Toastr').click()
    }
    @step
    async navigateToSmartTable() {
        await this.selectGroupMenuItem('Tables & Data')
        await this.page.getByText('Smart Table').click()
    }

    private async selectGroupMenuItem(groupMenuItem: string) {
        const groupMenuItemLocator = this.page.getByTitle(groupMenuItem);
        groupMenuItemLocator.getAttribute('aria-expanded').then(async (isExpanded) => {
            if (isExpanded === 'false') {
                await groupMenuItemLocator.click();
            }
        })
    }

}
