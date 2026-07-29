import { expect, Page, test } from "@playwright/test";

test(`Verify modal`, async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/modal');
    await clickButtonByLabel('Show Confirm', page);
    await clickButtonOnModalByTitle('Are you sure delete this task?', 'Yes', page);
    await expect(page.getByText(`Status: OK`)).toBeVisible();
});

async function clickButtonOnModalByTitle(title: string, button: string, page: Page) {
    let xpath = `//span[normalize-space()='${title}']//ancestor::div[@role='dialog']//child::button[contains(normalize-space(),'${button}')]`;
    await page.locator(xpath).click();
}

async function clickButtonByLabel(label: string, page: Page) {
    let xpath = `//*[(@role='button' or self::button or self::input) and (normalize-space()='${label}' or @value='${label}')]`;
    await page.locator(xpath).click();
}