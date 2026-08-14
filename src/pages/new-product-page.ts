import { Page } from "@playwright/test";
import path from "node:path";

export class NewProductPage {
    page: Page

    constructor(page: Page) {
        this.page = page;
    }

    async selectCategory(category: string) {
        await this.page.getByRole('link', { name: 'Select category' }).click();
        let searchCategoryInput = this.page.getByPlaceholder('Search categories');
        await searchCategoryInput.clear();
        await searchCategoryInput.click();
        await searchCategoryInput.fill(category);
        let selectButtonXpath = `(//h3[normalize-space()='${category}']/following::button[normalize-space()='Select'])[1]`;
        await this.page.locator(selectButtonXpath).click();
    }

    async uploadProductImage(filePath: string) {
        let selector = `#images input`;
        let absolutePath = path.join(process.cwd(), filePath);
        await this.page.locator(selector).setInputFiles(absolutePath);
    }
}