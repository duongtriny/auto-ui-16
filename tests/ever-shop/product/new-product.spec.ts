import { expect, test } from "@playwright/test";
import { ADMIN_PASSWORD, ADMIN_USERNAME, URL } from "../../../src/utils/constants-utils";
import { NewProductPage } from "../../../src/pages/new-product-page";
import { LoginPage } from "../../../src/pages/login-page";
import { DashboardPage } from "../../../src/pages/dashboard-page";

test.beforeEach(async ({ page }) => {
    await page.goto(URL);
})

test(`Verify create new product successful`, async ({ page }) => {
    let newProductPage = new NewProductPage(page);
    let loginPage = new LoginPage(page);
    let dashboardPage = new DashboardPage(page);
    await loginPage.inputTextboxByLabel('Email', ADMIN_USERNAME);
    await loginPage.inputTextboxByLabel('Password', ADMIN_PASSWORD);
    await loginPage.clickButtonByLabel('SIGN IN');
    await dashboardPage.onPage();
    await dashboardPage.clickMenuItemByLabel('New Product');
    await newProductPage.onPage();
    const random = new Date().getTime();
    await newProductPage.inputTextboxByLabel('Name', `Iphone ${random}`);
    await newProductPage.inputTextboxByLabel('SKU', `SKU-${random}`);
    await newProductPage.inputTextboxByLabel('Price', '1500');
    await newProductPage.inputTextboxByLabel('Weight', '0.05');
    await newProductPage.selectCategory('Men');
    await newProductPage.selectDropdownItemByLabel('Tax class', 'Taxable Goods');
    await newProductPage.uploadProductImage('data/upload/iphone-17-pro-max-cam.jpg');
    await newProductPage.selectRadioButtonByLabel('Status', 'Disabled');
    await newProductPage.selectRadioButtonByLabel('Visibility', 'Not visible');
    await newProductPage.selectRadioButtonByLabel('Manage stock?', 'No');
    await newProductPage.selectRadioButtonByLabel('Stock availability', 'No');
    await newProductPage.inputTextboxByLabel('Quantity', '100');
    await newProductPage.selectDropdownItemByLabel('Attribute group', 'Default');
    await newProductPage.selectDropdownItemByLabel('Color', 'Black');
    await newProductPage.selectDropdownItemByLabel('Size', 'XXL');
    await newProductPage.inputTextboxByLabel('Url key', `iphone-18-pro-max-${random}`);
    await newProductPage.inputTextboxByLabel('Meta title', 'Iphone 18 Pro Max');
    await newProductPage.inputTextboxByLabel('Meta keywords', 'Iphone 18, pro, max');
    await newProductPage.inputTextboxByLabel('Meta description', 'Iphone 18 pro max description');
    await newProductPage.clickButtonByLabel('Save');
    await newProductPage.verifyNotificationMessage('Product saved successfully!');
});
