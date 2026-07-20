import { expect, Page, test } from "@playwright/test";

test(`Verify dropdown`, async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/dropdown');
    await selectDropdownByLabel('Dropdown', '2nd menu item', page);
    await expect(page.getByText(`Value: 2nd menu item`)).toBeVisible();
});

async function selectDropdownByLabel(label: string, option: string, page: Page) {
    let dropdownButtonXpath = `(//div[contains(concat(' ', @class, ' '), ' ant-divider ') and contains(normalize-space(), '${label}')]/following::button[.//span[@aria-label='ellipsis']])[1]`;
    await page.locator(dropdownButtonXpath).hover();
    let optionXpath = `//li[@role="menuitem" and normalize-space()="${option}"]`;
    await page.locator(optionXpath).click();
}