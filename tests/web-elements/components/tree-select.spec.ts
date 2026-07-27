import { expect, Page, test } from "@playwright/test";

test(`Verify tree select`, async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/tree-select');
    await selectTreeItemByLabel('TreeSelect', ['Light', 'Pine'], page);
    await expect(page.getByText(`Current value: pine`)).toBeVisible();
    await selectTreeItemByLabel('TreeSelect', ['Light', 'Oak'], page);
    await expect(page.getByText(`Current value: oak`)).toBeVisible();
});


async function selectTreeItemByLabel(label: string, inputs: string[], page: Page) {
    let treeSelectXpath = `(//div[@role="separator" and normalize-space()="${label}"]/following::input[@role="combobox"])[1]`;
    await page.locator(treeSelectXpath).click();
    for (let i = 0; i < inputs.length; i++) {
        if (i == inputs.length - 1) {
            let treeNodeXpath = `//span[contains(concat(' ', @class, ' '), ' ant-select-tree-node-content-wrapper ') and normalize-space()='${inputs[i]}']`;
            await page.locator(treeNodeXpath).click();
        } else {
            let treeSwitcherXpath = `(//span[normalize-space()='${inputs[i]}']/preceding::span[contains(concat(' ', @class, ' '), ' ant-select-tree-switcher ')])[last()]`;
            let treeSwitcherLocator = page.locator(treeSwitcherXpath);
            let currentClasses = await treeSwitcherLocator.getAttribute('class');
            let isOpen = ` ${currentClasses} `.includes(' ant-select-tree-switcher_open ');
            if (!isOpen) {
                await page.locator(treeSwitcherXpath).click();
            }
        }
    }
}