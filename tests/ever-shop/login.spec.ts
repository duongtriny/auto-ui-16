import { expect, Page, test } from "@playwright/test";
import { invalidLoginData } from "../../data/login/login-data";

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/admin/login');
})

test(`Verify login successful`, async ({ page }) => {
    await inputTextboxByLabel('Email', 'test@with.me', page);
    await inputTextboxByLabel('Password', '1234567890', page);
    await clickButtonByLabel('SIGN IN', page);
    let dashboardHeaderXpath = `//h1[contains(concat(' ', @class, ' '), ' page-heading-title ') and normalize-space()='Dashboard']`;
    await expect(page.locator(dashboardHeaderXpath)).toBeVisible();
});

for (let input of invalidLoginData) {
    test(`Verify login fail when username is '${input.email}' and password is '${input.password}'`, async ({ page }) => {
        await inputTextboxByLabel('Email', input.email, page);
        await inputTextboxByLabel('Password', input.password, page);
        await clickButtonByLabel('SIGN IN', page);
        for (let item of input.expected) {
            await verifyFieldErrorMessageByLabel(item.field, item.message, page);
        }
    });
}

async function inputTextboxByLabel(label: string, input: string, page: Page) {
    let xpath = `(//label[normalize-space()='${label}']/following::input)[1]`;
    let inputLocator = page.locator(xpath);
    await inputLocator.click();
    await inputLocator.clear();
    await inputLocator.fill(input);
}

async function clickButtonByLabel(label: string, page: Page) {
    let xpath = `//*[(@role='button' or self::button or self::input) and (normalize-space()='${label}' or @value='${label}')]`;
    await page.locator(xpath).click();
}

async function verifyFieldErrorMessageByLabel(label: string, message: string, page: Page) {
    let xpath = `(//label[normalize-space()='${label}']/following::div[contains(concat(' ', @class, ' '),' field-error ')and normalize-space()='${message}'])[1]`;
    await expect(page.locator(xpath)).toBeVisible();
}