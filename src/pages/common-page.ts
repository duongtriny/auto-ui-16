import { expect, Page } from "@playwright/test";

export class CommonPage {
    page: Page

    constructor(page: Page) {
        this.page = page;
    }

    async inputTextboxByLabel(label: string, input: string) {
        let xpathTextbox = `(//label[normalize-space()='${label}']/following::input)[1]`;
        let xpathTextarea = `(//label[normalize-space()='${label}']/following::textarea)[1]`;
        let inputLocator = this.page.locator(`${xpathTextbox} | ${xpathTextarea}`).first();
        await inputLocator.click();
        await inputLocator.clear();
        await inputLocator.fill(input);
    }

    async clickButtonByLabel(label: string) {
        let xpath = `//*[(@role='button' or self::button or self::input) and (normalize-space()='${label}' or @value='${label}')]`;
        await this.page.locator(xpath).click();
    }

    async verifyFieldErrorMessageByLabel(label: string, message: string) {
        let xpath = `(//label[normalize-space()='${label}']/following::div[contains(concat(' ', @class, ' '),' field-error ')and normalize-space()='${message}'])[1]`;
        await expect(this.page.locator(xpath)).toBeVisible();
    }

    async clickMenuItemByLabel(label: string) {
        let xpath = `//div[contains(concat(' ', @class, ' '), ' admin-navigation ')]//a[normalize-space()='${label}']`;
        await this.page.locator(xpath).click();
    }

    async selectDropdownItemByLabel(label: string, item: string) {
        let xpath = `(//*[normalize-space()='${label}']/following::select)[1]`;
        await this.page.locator(xpath).selectOption({ label: item });
    }

    async selectRadioButtonByLabel(label: string, option: string) {
        let xpath = `(//label[normalize-space()='${label}']/following::label[.//input[@type='radio'] and normalize-space()='${option}'])[1]`;
        await this.page.locator(xpath).click();
    }

    async verifyNotificationMessage(message: string) {
        await expect(this.page.getByText(message)).toBeVisible();
    }

    async getTextboxValueByLabel(label: string) {
        let xpathTextbox = `(//label[normalize-space()='${label}']/following::input)[1]`;
        let xpathTextarea = `(//label[normalize-space()='${label}']/following::textarea)[1]`;
        let inputLocator = this.page.locator(`${xpathTextbox} | ${xpathTextarea}`).first();
        return inputLocator.inputValue();
    }
}