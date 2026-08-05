import { expect, Page, test } from "@playwright/test";

test(`Verify new tab`, async ({ page, context }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/windows');
    let newPageEvent = context.waitForEvent('page');
    await clickButtonByLabel('Open New Tab', page);
    let newPage = await newPageEvent;
    await expect(newPage.getByText(`Welcome to Test With Me`)).toBeVisible();
    await expect(page.getByText('Open New Tab').first()).toBeVisible();
});

test(`Verify new windows`, async ({ page, context }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/windows');
    let newPageEvent = context.waitForEvent('page');
    await clickButtonByLabel('Open New Window', page);
    let newPage = await newPageEvent;
    await expect(newPage.getByText(`Welcome to Test With Me`)).toBeVisible();
    await expect(page.getByText('Open New Tab').first()).toBeVisible();
});


async function clickButtonByLabel(label: string, page: Page) {
    let xpath = `//*[(@role='button' or self::button or self::input) and (normalize-space()='${label}' or @value='${label}')]`;
    await page.locator(xpath).click();
}