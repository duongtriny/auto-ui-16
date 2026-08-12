import { expect, Page } from "@playwright/test";

export async function inputTextboxByLabel(label: string, input: string, page: Page) {
    let xpath = `(//label[normalize-space()='${label}']/following::input)[1]`;
    let inputLocator = page.locator(xpath);
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