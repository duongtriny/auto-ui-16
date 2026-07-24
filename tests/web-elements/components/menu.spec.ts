import { expect, Page, test } from "@playwright/test";

test(`Verify select menu`, async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/menu');
    await selectMenuByLabel('My Menu', 'Option 2', page);
    await expect(page.getByText(`Current value: setting:2`)).toBeVisible();
});

async function selectMenuByLabel(label: string, option: string, page: Page) {
    let menuXpath = `//div[@role="menuitem" and normalize-space()='${label}']`;
    await page.locator(menuXpath).hover();
    let optionXpath = `//li[@role='menuitem' and normalize-space()='${option}']`;
    await page.locator(optionXpath).click();
}