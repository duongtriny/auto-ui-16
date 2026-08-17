import { expect, Page } from "@playwright/test";
import { CommonPage } from "./common-page";

export class ProductsPage extends CommonPage {
    searchBoxSelector = '#keyword';

    constructor(page: Page) {
        super(page);
    }

    async onPage() {
        let dashboardHeaderXpath = `//h1[contains(concat(' ', @class, ' '), ' page-heading-title ') and normalize-space()='Products']`;
        await expect(this.page.locator(dashboardHeaderXpath)).toBeVisible();
    }

    async searchProduct(input: string) {
        let searchBoxLocator = this.page.locator(this.searchBoxSelector);
        await searchBoxLocator.click();
        await searchBoxLocator.clear();
        await searchBoxLocator.fill(input);
        await this.page.keyboard.press('Enter');
    }

    async selectProductByName(name: string) {
        let xpath = `//a[normalize-space()='${name}']`;
        this.page.locator(xpath).click();
    }
}