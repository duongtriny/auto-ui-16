import { expect, Page, test } from "@playwright/test";
import { ADMIN_PASSWORD, ADMIN_USERNAME, URL } from "../../../src/utils/constants-utils";
import { CommonPage } from "../../../src/pages/common-page";
import { NewProductPage } from "../../../src/pages/new-product-page";

test.beforeEach(async ({ page }) => {
    await page.goto(URL);
})

test(`Verify create new product successful`, async ({ page }) => {
    let commonPage = new CommonPage(page);
    let newProductPage = new NewProductPage(page);
    //Login
    await commonPage.inputTextboxByLabel('Email', ADMIN_USERNAME);
    await commonPage.inputTextboxByLabel('Password', ADMIN_PASSWORD);
    await commonPage.clickButtonByLabel('SIGN IN');
    //Verify user on Dashboard page
    let dashboardHeaderXpath = `//h1[contains(concat(' ', @class, ' '), ' page-heading-title ') and normalize-space()='Dashboard']`;
    await expect(page.locator(dashboardHeaderXpath)).toBeVisible();
    await commonPage.clickMenuItemByLabel('New Product');

    //Verify user on New Product page
    let newProductHeaderXpath = `//h1[contains(concat(' ', @class, ' '), ' page-heading-title ') and normalize-space()='Create a new product']`;
    await expect(page.locator(newProductHeaderXpath)).toBeVisible();

    //Input product's info
    const random = new Date().getTime();
    await commonPage.inputTextboxByLabel('Name', `Iphone ${random}`);
    await commonPage.inputTextboxByLabel('SKU', `SKU-${random}`);
    await commonPage.inputTextboxByLabel('Price', '1500');
    await commonPage.inputTextboxByLabel('Weight', '0.05');
    await newProductPage.selectCategory('Men');
    await commonPage.selectDropdownItemByLabel('Tax class', 'Taxable Goods');
    await newProductPage.uploadProductImage('data/upload/iphone-17-pro-max-cam.jpg');
    await commonPage.selectRadioButtonByLabel('Status', 'Disabled');
    await commonPage.selectRadioButtonByLabel('Visibility', 'Not visible');
    await commonPage.selectRadioButtonByLabel('Manage stock?', 'No');
    await commonPage.selectRadioButtonByLabel('Stock availability', 'No');
    await commonPage.inputTextboxByLabel('Quantity', '100');
    await commonPage.selectDropdownItemByLabel('Attribute group', 'Default');
    await commonPage.selectDropdownItemByLabel('Color', 'Black');
    await commonPage.selectDropdownItemByLabel('Size', 'XXL');

    await commonPage.inputTextboxByLabel('Url key', `iphone-18-pro-max-${random}`);
    await commonPage.inputTextboxByLabel('Meta title', 'Iphone 18 Pro Max');
    await commonPage.inputTextboxByLabel('Meta keywords', 'Iphone 18, pro, max');
    await commonPage.inputTextboxByLabel('Meta description', 'Iphone 18 pro max description');
    await commonPage.clickButtonByLabel('Save');
    await commonPage.verifyNotificationMessage('Product saved successfully!');
});
