import { expect, Page, test } from "@playwright/test";

let inputs = ['Div button', 'Origin button', 'Input button', 'Default', 'Primary', 'Dashed', 'Text', 'Link', 'Icon button'];

for (let input of inputs) {
    test(`Verify button: ${input}]`, async ({ page }) => {
        await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/button');
        await clickButtonByLabel2(input, page);
        await expect(page.getByText(`Button ${input} was clicked!`)).toBeVisible();
    });
}


async function clickButtonByLabel(label: string, page: Page) {
    let xpath = `//*[(@role='button' or self::button or self::input) and (normalize-space()='${label}' or @value='${label}')]`;
    await page.locator(xpath).click();
}

async function clickButtonByLabel2(label: string, page: Page) {
    await page.getByRole('button', {
        name: label
    }).click()
}