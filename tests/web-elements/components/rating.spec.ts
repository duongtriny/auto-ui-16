import { expect, Page, test } from "@playwright/test";

test(`Verify rating`, async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/rating');
    await selectRatingByLabel('Rate', '3', page);
    await expect(page.getByText(`Current rating: normal`).first()).toBeVisible();
});

async function selectRatingByLabel(label: string, rate: string, page: Page) {
    let rateXpath = `(//div[@role='separator' and normalize-space()='${label}']//following::ul[contains(concat(' ', @class, ' '), ' ant-rate ')])[1]`;
    let starXpath = `//div[@role = 'radio' and @aria-checked='true']`;
    let rateLocator = page.locator(rateXpath);
    let currentRate = await rateLocator.locator(starXpath).count();
    if (currentRate != Number.parseInt(rate)) {
        let xpath = `//div[@role='radio' and @aria-posinset='${rate}']`;
        await rateLocator.locator(xpath).click();
    }
}

test(`Verify half rating`, async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/rating');
    await selectHaftRatingByLabel('Haft Rate', '3.5', page);
    await expect(page.getByText(`Current rating: 3.5`).first()).toBeVisible();
});

async function selectHaftRatingByLabel(label: string, rate: string, page: Page) {
    let rateXpath = `(//div[@role='separator' and normalize-space()='${label}']//following::ul[contains(concat(' ', @class, ' '), ' ant-rate ')])[1]`;
    let rateLocator = page.locator(rateXpath);
    let currentFullRating = await rateLocator.locator('.ant-rate-star-full').count();
    let currentHalfRating = await rateLocator.locator('.ant-rate-star-half').count();
    let currentRating = currentHalfRating > 0 ? currentFullRating + 0.5 : currentFullRating;
    let rateNumber = Number.parseFloat(rate);
    if (currentRating != rateNumber) {
        if (Number.isInteger(rateNumber)) {
            await rateLocator.locator(`li:nth-child(${rateNumber}) .ant-rate-star-second`).click();
        } else {
            await rateLocator.locator(`li:nth-child(${0.5 + rateNumber}) .ant-rate-star-first`).click();
        }
    }
}