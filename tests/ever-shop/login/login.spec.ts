import { expect, Page, test } from "@playwright/test";
import { invalidLoginData } from "../../../data/login/login-data";
import { ADMIN_PASSWORD, ADMIN_USERNAME, URL } from "../../../src/utils/constants-utils";
import { LoginPage } from "../../../src/pages/login-page";
import { DashboardPage } from "../../../src/pages/dashboard-page";


let loginPage: LoginPage;
let dashboardPage: DashboardPage;
test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await page.goto(URL);
})

test(`Verify login successful`, async () => {
    await loginPage.login(ADMIN_USERNAME, ADMIN_PASSWORD);
    await dashboardPage.onPage();
});

for (let input of invalidLoginData) {
    test(`Verify login fail when username is '${input.email}' and password is '${input.password}'`, async () => {
        await loginPage.login(input.email, input.password);
        for (let item of input.expected) {
            await loginPage.verifyFieldErrorMessageByLabel(item.field, item.message);
        }
    });
}
