import { expect, Page } from "@playwright/test";
import { step } from "../helpers/test-step-decorators";
import { HelperBase } from "./page-objects-helper";
export class DatePickerLayout extends HelperBase{
    constructor(page: Page) {
        super(page);
    }
    @step
    async selectDateFromDatePicker(daysFromToday: number) {
        await this.page.getByText('Forms').click()
        await this.page.getByText('Datepicker').click()
        await this.page.getByPlaceholder('Form Picker').click()
        const selectedDate = await this.selectedDate(daysFromToday);
        await expect(this.page.getByPlaceholder('Form Picker')).toHaveValue(selectedDate)
        console.log(`Selected date: ${selectedDate}`)
        this.getMessage()
    }
    @step
    async selectDateRangeFromDatePicker(daysFromTodayStart: number, daysFromTodayEnd: number) {

        //await this.page.getByText('Forms').click()
        //await this.page.getByText('Datepicker').click()
        await this.page.getByPlaceholder('Range Picker').click()
        const startDate = await this.selectedDate(daysFromTodayStart);
        console.log(`Start date: ${startDate}`)
        const endDate = await this.selectedDate(daysFromTodayEnd);
        console.log(`End date: ${endDate}`)
        const expectedDate = `${startDate} - ${endDate}`
        console.log(`Expected date range: ${expectedDate}`)
        await expect(this.page.getByPlaceholder('Range Picker')).toHaveValue(expectedDate)

    }

    private async selectedDate(daysFromToday: number) {
        const date = new Date()
        date.setDate(date.getDate() + daysFromToday) // Add specified days to the current date
        const currentDay = date.getDate().toString()
        const currentMonth = date.toLocaleString('en-US', { month: 'short' })
        const currentMonthLong = date.toLocaleString('en-US', { month: 'long' })

        const currentYear = date.getFullYear()
        const inputDate = `${currentMonth} ${currentDay}, ${currentYear}`

        let currentMontAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthAndYear = `${currentMonthLong} ${currentYear}`

        while (!currentMontAndYear?.includes(expectedMonthAndYear)) {
            await this.page.locator('.next-month').click()
            currentMontAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        }

        await this.page.locator('.day-cell:not(.bounding-month)').getByText(currentDay, { exact: true }).click()
        return inputDate
    }
}
