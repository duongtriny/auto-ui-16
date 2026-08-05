import { expect, Page, test } from "@playwright/test";

test(`Verify alert confirm`, async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/alerts');
    page.on('dialog', async (dialog) => {
        await dialog.accept();
    });
    await clickButtonByLabel('Show Confirm', page);
    await expect(page.getByText(`Selected value: OK`)).toBeVisible();
});

test(`Verify alert with prompt box`, async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/alerts');
    page.on('dialog', async (dialog) => {
        await dialog.accept("Test With Me");
    });
    await clickButtonByLabel('Show Prompt', page);
    await expect(page.getByText(`Entered value: Test With Me`)).toBeVisible();
});


async function clickButtonByLabel(label: string, page: Page) {
    let xpath = `//*[(@role='button' or self::button or self::input) and (normalize-space()='${label}' or @value='${label}')]`;
    await page.locator(xpath).click();
}