import { expect, Page } from "@playwright/test";
import { CommonPage } from "./common-page";

export class DashboardPage extends CommonPage {
    constructor(page: Page) {
        super(page);
    }

    async onPage() {
        let dashboardHeaderXpath = `//h1[contains(concat(' ', @class, ' '), ' page-heading-title ') and normalize-space()='Dashboard']`;
        await expect(this.page.locator(dashboardHeaderXpath)).toBeVisible();
    }
}