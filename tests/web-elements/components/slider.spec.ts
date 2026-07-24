import { expect, Page, test } from "@playwright/test";

test(`Verify slider`, async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/slider');
    await selectSliderByLabel('Slider', 88, page);
    await expect(page.getByText(`Current Value: 88`)).toBeVisible();
});

async function selectSliderByLabel(label: string, value: number, page: Page) {
    let sliderXpath = `(//div[@role='separator' and contains(normalize-space(), '${label}')]/following::div[contains(concat(' ', @class, ' '), ' ant-slider-rail ')])[1]`;
    let sliderLocator = page.locator(sliderXpath);
    let sliderBox = await sliderLocator.boundingBox();
    let x = sliderBox?.x ?? 0;
    let y = sliderBox?.y ?? 0;
    let width = sliderBox?.width ?? 0;
    let height = sliderBox?.height ?? 0;
    let beClickedX = x + width / 100 * value;
    let beClickedY = y + height / 2;
    await page.mouse.click(beClickedX, beClickedY);
}