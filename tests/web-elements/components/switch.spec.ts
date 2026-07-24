import { expect, Page, test } from "@playwright/test";

test(`Verify switch`, async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/switch');
    await selectSwitchByLabel('Switch', 'uncheck', page);
    await expect(page.getByText(`Current Value: false`)).toBeVisible();
});

async function selectSwitchByLabel(label: string, action: 'check' | 'uncheck', page: Page) {
    let xpath = `(//div[@role='separator' and normalize-space() = '${label}']/following::*[@role='switch'])[1]`;
    let locator = page.locator(xpath);
    let checked = await locator.getAttribute('aria-checked');
    if ((checked == 'true' && action == 'uncheck') || (checked == 'false' && action == 'check')) {
        await page.locator(xpath).click();
    }
}