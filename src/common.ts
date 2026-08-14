import { expect, Page } from "@playwright/test";

export async function inputTextboxByLabel(label: string, input: string, page: Page) {
    let xpathTextbox = `(//label[normalize-space()='${label}']/following::input)[1]`;
    let xpathTextarea = `(//label[normalize-space()='${label}']/following::textarea)[1]`;
    let inputLocator = page.locator(`${xpathTextbox} | ${xpathTextarea}`).first();
    await inputLocator.click();
    await inputLocator.clear();
    await inputLocator.fill(input);
}

export async function clickButtonByLabel(label: string, page: Page) {
    let xpath = `//*[(@role='button' or self::button or self::input) and (normalize-space()='${label}' or @value='${label}')]`;
    await page.locator(xpath).click();
}

export async function verifyFieldErrorMessageByLabel(label: string, message: string, page: Page) {
    let xpath = `(//label[normalize-space()='${label}']/following::div[contains(concat(' ', @class, ' '),' field-error ')and normalize-space()='${message}'])[1]`;
    await expect(page.locator(xpath)).toBeVisible();
}

export async function clickMenuItemByLabel(label: string, page: Page) {
    let xpath = `//div[contains(concat(' ', @class, ' '), ' admin-navigation ')]//a[normalize-space()='${label}']`;
    await page.locator(xpath).click();
}

export async function selectDropdownItemByLabel(label: string, item: string, page: Page) {
    let xpath = `(//*[normalize-space()='${label}']/following::select)[1]`;
    await page.locator(xpath).selectOption({ label: item });
}

export async function selectRadioButtonByLabel(label: string, option: string, page: Page) {
    let xpath = `(//label[normalize-space()='${label}']/following::label[.//input[@type='radio'] and normalize-space()='${option}'])[1]`;
    await page.locator(xpath).click();
}

export async function verifyNotificationMessage(message: string, page: Page) {
    await expect(page.getByText(message)).toBeVisible();
}