import { Page } from '@playwright/test'
import { NavigatePage } from './navigation-page'
import { DatePickerLayout } from './date-picker-layour'
import { FormObjectsLayout } from './form-objects-layout'

export class PageObjectsManager {
    readonly NavigateTo: NavigatePage
    readonly datePicker: DatePickerLayout
    readonly formObject: FormObjectsLayout

    constructor(page: Page) {
        this.NavigateTo = new NavigatePage(page)
        this.datePicker = new DatePickerLayout(page)
        this.formObject = new FormObjectsLayout(page)
    }
}