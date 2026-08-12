import { expect, Page, test } from "@playwright/test";
import { invalidLoginData } from "../../../data/login/login-data";
import { clickButtonByLabel, inputTextboxByLabel, verifyFieldErrorMessageByLabel } from "../../../src/common";
import { ADMIN_PASSWORD, ADMIN_USERNAME, URL } from "../../../src/utils/constants-utils";

test.beforeEach(async ({ page }) => {
    await page.goto(URL);
})

test(`Verify login successful`, async ({ page }) => {
    await inputTextboxByLabel('Email', ADMIN_USERNAME, page);
    await inputTextboxByLabel('Password', ADMIN_PASSWORD, page);
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
