import { expect, Page, test } from "@playwright/test";
import { clickButtonByLabel, clickMenuItemByLabel, inputTextboxByLabel, selectDropdownItemByLabel, selectRadioButtonByLabel, verifyNotificationMessage } from "../../../src/common";
import { ADMIN_PASSWORD, ADMIN_USERNAME, URL } from "../../../src/utils/constants-utils";
import path from "node:path";

test.beforeEach(async ({ page }) => {
    await page.goto(URL);
})

test(`Verify create new product successful`, async ({ page }) => {
    //Login
    await inputTextboxByLabel('Email', ADMIN_USERNAME, page);
    await inputTextboxByLabel('Password', ADMIN_PASSWORD, page);
    await clickButtonByLabel('SIGN IN', page);
    //Verify user on Dashboard page
    let dashboardHeaderXpath = `//h1[contains(concat(' ', @class, ' '), ' page-heading-title ') and normalize-space()='Dashboard']`;
    await expect(page.locator(dashboardHeaderXpath)).toBeVisible();
    await clickMenuItemByLabel('New Product', page);

    //Verify user on New Product page
    let newProductHeaderXpath = `//h1[contains(concat(' ', @class, ' '), ' page-heading-title ') and normalize-space()='Create a new product']`;
    await expect(page.locator(newProductHeaderXpath)).toBeVisible();

    //Input product's info
    const random = new Date().getTime();
    await inputTextboxByLabel('Name', `Iphone ${random}`, page);
    await inputTextboxByLabel('SKU', `SKU-${random}`, page);
    await inputTextboxByLabel('Price', '1500', page);
    await inputTextboxByLabel('Weight', '0.05', page);
    await selectCategory('Men', page);
    await selectDropdownItemByLabel('Tax class', 'Taxable Goods', page);
    await uploadProductImage('data/upload/iphone-17-pro-max-cam.jpg', page);
    await selectRadioButtonByLabel('Status', 'Disabled', page);
    await selectRadioButtonByLabel('Visibility', 'Not visible', page);
    await selectRadioButtonByLabel('Manage stock?', 'No', page);
    await selectRadioButtonByLabel('Stock availability', 'No', page);
    await inputTextboxByLabel('Quantity', '100', page);
    await selectDropdownItemByLabel('Attribute group', 'Default', page);
    await selectDropdownItemByLabel('Color', 'Black', page);
    await selectDropdownItemByLabel('Size', 'XXL', page);

    await inputTextboxByLabel('Url key', `iphone-18-pro-max-${random}`, page);
    await inputTextboxByLabel('Meta title', 'Iphone 18 Pro Max', page);
    await inputTextboxByLabel('Meta keywords', 'Iphone 18, pro, max', page);
    await inputTextboxByLabel('Meta description', 'Iphone 18 pro max description', page);
    await clickButtonByLabel('Save', page);
    // await page.waitForTimeout(1000);
    await verifyNotificationMessage('Product saved successfully!', page);
});

async function selectCategory(category: string, page: Page) {
    await page.getByRole('link', { name: 'Select category' }).click();
    let searchCategoryInput = page.getByPlaceholder('Search categories');
    await searchCategoryInput.clear();
    await searchCategoryInput.click();
    await searchCategoryInput.fill(category);
    let selectButtonXpath = `(//h3[normalize-space()='${category}']/following::button[normalize-space()='Select'])[1]`;
    await page.locator(selectButtonXpath).click();
}

async function uploadProductImage(filePath: string, page: Page) {
    let selector = `#images input`;
    let absolutePath = path.join(process.cwd(), filePath);
    await page.locator(selector).setInputFiles(absolutePath);
}