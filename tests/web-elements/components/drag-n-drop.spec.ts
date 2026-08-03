import { expect, Page, test } from "@playwright/test";

test(`Verify drag n drop`, async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/drag-n-drop');
    let inputs = ['Apple', 'Orange'];
    await dragAndDropByLabel("Drag n Drop", inputs, "toRight", page);
    let leftPanelItems = await getPanelDataByLabel("Drag n Drop", 'left', page);
    expect(leftPanelItems).not.toEqual(expect.arrayContaining(inputs));
    let rightPanelItems = await getPanelDataByLabel("Drag n Drop", 'right', page);
    expect(rightPanelItems).toEqual(expect.arrayContaining(inputs));

    inputs = ['Mango', 'Pineapple'];
    await dragAndDropByLabel("Drag n Drop", ['Mango', 'Pineapple'], 'toLeft', page);

    leftPanelItems = await getPanelDataByLabel("Drag n Drop", 'left', page);
    expect(leftPanelItems).toEqual(expect.arrayContaining(inputs));
    rightPanelItems = await getPanelDataByLabel("Drag n Drop", 'right', page);
    expect(rightPanelItems).not.toEqual(expect.arrayContaining(inputs));
});

async function getPanelDataByLabel(label: string, panel: 'left' | 'right', page: Page) {
    let currentPanel = panel == 'left' ? 'border-teal-500' : 'border-orange-500'
    let panelXpath = `(//div[@role="separator" and normalize-space()="${label}"]/following::div[contains(concat(" ", @class, " "), " ${currentPanel} ")])[1]`;
    let panelLocator = page.locator(panelXpath);
    let items = await panelLocator.locator('button').allTextContents();
    return items;
}

async function dragAndDropByLabel(label: string, inputs: string[], direction: 'toLeft' | 'toRight', page: Page) {
    let leftPanelXpath = `(//div[@role="separator" and normalize-space()="${label}"]/following::div[contains(concat(" ", @class, " "), " border-teal-500 ")])[1]`;
    let leftPanelLocator = page.locator(leftPanelXpath);
    let rightPanelXpath = `(//div[@role="separator" and normalize-space()="${label}"]/following::div[contains(concat(" ", @class, " "), " border-orange-500 ")])[1]`;
    let rightPanelLocator = page.locator(rightPanelXpath);
    for (let input of inputs) {
        let itemXpath = `//button[normalize-space()="${input}"]`;
        if (direction == 'toLeft') {
            await rightPanelLocator.locator(itemXpath).dragTo(leftPanelLocator);
        } else {
            await leftPanelLocator.locator(itemXpath).dragTo(rightPanelLocator);
        }
    }
}
