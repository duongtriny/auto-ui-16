import { expect, Page, test } from "@playwright/test";

test(`Verify radio`, async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/radio');
    await selectRadioByLabel('Radio button', 'Pear', page);
    await expect(page.getByText(`Value: Pear`).first()).toBeVisible();
});

async function selectRadioByLabel(label: string, option: string, page: Page) {
    let xpath = `(//div[contains(concat(' ', @class, ' '), ' ant-divider ') and contains(normalize-space(), '${label}')]/following::div[@role='radiogroup']//label[contains(normalize-space(), '${option}')])[1]`;
    await page.locator(xpath).click();
}