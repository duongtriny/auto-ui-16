import { expect, Page } from "@playwright/test";
import { CommonPage } from "./common-page";

export class EditProductPage extends CommonPage {
    constructor(page: Page) {
        super(page);
    }

    async onPage(productName: string) {
        let newProductHeaderXpath = `//h1[contains(concat(' ', @class, ' '), ' page-heading-title ') and normalize-space()='Editing ${productName}']`;
        await expect(this.page.locator(newProductHeaderXpath)).toBeVisible();
    }

    getProductIdFromUrl() {
        let url = this.page.url();
        let splitting = url.split('/');
        return splitting[splitting.length - 1];
    }
}