import { expect, Page, test } from "@playwright/test";

test(`Verify auto complete`, async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/auto-complete');
    await selectAutoCompleteByLabel('Auto complete', 'Burns Bay Road', page);
    await expect(page.getByText(`Value: Burns Bay Road was selected!`).first()).toBeVisible();
});

async function selectAutoCompleteByLabel(label: string, option: string, page: Page) {
    let autoCompleteXpath = `(//div[@role="separator" and contains(normalize-space(), '${label}')]/following::input[@role='combobox'])[1]`;
    let autoCompleteLocator = page.locator(autoCompleteXpath);
    await autoCompleteLocator.click();
    await autoCompleteLocator.clear();
    await autoCompleteLocator.fill(option);
    let optionXpath = `//div[contains(concat(' ', @class, ' '), ' ant-select-item-option ') and normalize-space()='${option}']`;
    await page.locator(optionXpath).click();
}