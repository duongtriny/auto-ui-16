import { expect, Page, test } from "@playwright/test";
import { clickButtonByLabel, inputTextboxByLabel } from "../../../src/common";
import { ADMIN_PASSWORD, ADMIN_USERNAME, URL } from "../../../src/utils/constants-utils";

test.beforeEach(async ({ page }) => {
    await page.goto(URL);
})

test(`Verify create new product successful`, async ({ page }) => {
    await inputTextboxByLabel('Email', ADMIN_USERNAME, page);
    await inputTextboxByLabel('Password', ADMIN_PASSWORD, page);
    await clickButtonByLabel('SIGN IN', page);
    let dashboardHeaderXpath = `//h1[contains(concat(' ', @class, ' '), ' page-heading-title ') and normalize-space()='Dashboard']`;
    await expect(page.locator(dashboardHeaderXpath)).toBeVisible();
});

