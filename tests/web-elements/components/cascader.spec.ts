import { expect, Page, test } from "@playwright/test";

test(`Verify cascader`, async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/cascader');
    await selectCascaderByLabel('Cascader', ['Test', 'With', 'You'], page);
    await expect(page.getByText(`Current value: Test, With, You`)).toBeVisible();
});

async function selectCascaderByLabel(label: string, steps: string[], page: Page) {
    let xpathCascader = `(//div[@role="separator" and normalize-space()="${label}"]/following::input)[1]`;
    await page.locator(xpathCascader).click();
    for (let i = 0; i < steps.length; i++) {
        let xpath = `//ul[${i + 1}]//li[@role='menuitemcheckbox' and normalize-space()='${steps[i]}']`;
        await page.locator(xpath).click();
    }
}


test(`Verify cascader multiple value`, async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/cascader');
    await selectCascaderMultiByLabel('Cascader multiple values', ['Bamboo', 'Little', ['Toy Fish', 'Toy Bird']], page);
    await expect(page.getByText(`Current value: bamboo, little, fishbamboo, little, bird`)).toBeVisible();
});

async function selectCascaderMultiByLabel(label: string, steps: any, page: Page) {
    let xpathCascader = `(//div[@role="separator" and normalize-space()="${label}"]/following::input)[1]`;
    await page.locator(xpathCascader).click();
    for (let i = 0; i < steps.length; i++) {
        if (i != steps.length - 1) {
            let xpath = `//ul[${i + 1}]//li[@role='menuitemcheckbox' and normalize-space()='${steps[i]}']`;
            await page.locator(xpath).click();
        } else {
            for (let item of steps[i]) {
                let xpath = `//li[@role='menuitemcheckbox' and @title='${item}']//span[contains(concat(' ', @class, ' '), ' ant-cascader-checkbox ')]`;
                await page.locator(xpath).click();
            }
        }

    }
}

