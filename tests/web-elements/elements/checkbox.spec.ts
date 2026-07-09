import { expect, Page, test } from "@playwright/test";

test(`Verify checkbox`, async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/checkbox');
    await selectCheckboxByLabel('Apple', 'check', page);
    await expect(page.getByText(`Selected values: Apple`)).toBeVisible();
});

async function selectCheckboxByLabel(label: string, action: 'check' | 'uncheck', page: Page) {
    let xpath = `//label[contains(concat(' ', @class, ' ') , ' ant-checkbox-wrapper ') and contains(normalize-space(), '${label}')]`;
    let locator = page.locator(xpath);
    let classes = await locator.getAttribute('class');
    let isChecked = ` ${classes} `.includes(' ant-checkbox-wrapper-checked ');
    if ((isChecked == true && action == 'uncheck') || (isChecked == false && action == 'check')) {
        await page.locator(xpath).click();
    }
}