import { expect, Page, test } from "@playwright/test";

test.beforeEach('Before', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/date-time');
});
test(`Verify timepicker`, async ({ page }) => {
    await selectTimepicker('Time Picker', '03', '04', '05', page);
    await expect(page.getByText(`Current time: 03:04:05`)).toBeVisible();
});

async function selectTimepicker(label: string, hour: string, minute: string, second: string, page: Page) {
    let timepickerXpath = `//div[contains(concat(' ', @class, ' '), ' ant-divider ') and contains(normalize-space(), '${label}')]/following::div[contains(concat(' ', @class, ' '), ' ant-picker ')][1]`;
    let timepicker = page.locator(timepickerXpath);
    await timepicker.click();
    let hourXpath = `//ul[@data-type="hour"]/li[normalize-space()=${hour}]`;
    await page.locator(hourXpath).click();
    let minuteXpath = `//ul[@data-type="minute"]/li[normalize-space()=${minute}]`;
    await page.locator(minuteXpath).click();
    let secondXpath = `//ul[@data-type="second"]/li[normalize-space()=${second}]`;
    await page.locator(secondXpath).click();
    let okButtonXpath = `//div[contains(concat(' ' , @class, ' '), ' ant-picker-footer ')]//button[normalize-space()='OK']`;
    await page.locator(okButtonXpath).click();
}

test(`Verify timepicker with now`, async ({ page }) => {
    let timepickerXpath = `//div[contains(concat(' ', @class, ' '), ' ant-divider ') and contains(normalize-space(), 'Time Picker')]/following::div[contains(concat(' ', @class, ' '), ' ant-picker ')][1]`;
    let timepicker = page.locator(timepickerXpath);
    await timepicker.click();
    let nowButtonXpath = `//div[contains(concat(' ' , @class, ' '), ' ant-picker-footer ')]//a[normalize-space()='Now']`;
    const timeBefore = new Date().getTime();
    await page.waitForTimeout(1000);
    await page.locator(nowButtonXpath).click();
    await page.waitForTimeout(1000);
    const timeAfter = new Date().getTime();
    let resultXpath = `//div[contains(concat(' ', @class, ' '), ' ant-divider ') and contains(normalize-space(), 'Time Picker')]/following::div[contains(text(), 'Current time: ')][1]`;
    let actualTime = await page.locator(resultXpath).locator('.text-rose-500').textContent();
    let currentDate = new Date().toISOString().split('T')[0];
    let actualDateTime = new Date(`${currentDate} ${actualTime}`).getTime();

    expect(actualDateTime).toBeGreaterThanOrEqual(timeBefore);
    expect(actualDateTime).toBeLessThanOrEqual(timeAfter);
});

test(`Verify datepicker 1`, async ({ page }) => {
    await selectDateByLabel('Date Picker', '15', 'May', '2019', page);
    await expect(page.getByText('Current date: 2019-05-15')).toBeVisible();
});
test(`Verify datepicker 2`, async ({ page }) => {
    await selectDateByLabel('Date Picker', '15', 'May', '2026', page);
    await expect(page.getByText('Current date: 2026-05-15')).toBeVisible();
});

test(`Verify datepicker 3`, async ({ page }) => {
    await selectDateByLabel('Date Picker', '15', 'May', '2035', page);
    await expect(page.getByText('Current date: 2035-05-15')).toBeVisible();
});

async function selectDateByLabel(label: string, day: string, month: string, year: string, page: Page) {
    let pickerXpath = `(//div[contains(concat(' ', @class, ' '), ' ant-divider ') and contains(normalize-space(), '${label}')]/following::div[contains(concat(' ', @class, ' '), ' ant-picker ')])[1]`;
    await page.locator(pickerXpath).click();
    let yearButtonXpath = `//button[@aria-label = 'Choose a year']`;
    await page.locator(yearButtonXpath).click();
    let decadeButtonXpath = `//button[@aria-label = 'Choose a decade']`;
    let decadeText = await page.locator(decadeButtonXpath).textContent();
    let [minYear, maxYear] = decadeText?.split('-') || [];
    let decade = Number.parseInt(maxYear) - Number.parseInt(minYear) + 1;
    if (year < minYear) {
        let distance = Number.parseInt(minYear) - Number.parseInt(year);
        await findDecadeByLabel('Last year (Control + left)', distance, decade, page);
    }
    if (year > maxYear) {
        let distance = Number.parseInt(year) - Number.parseInt(maxYear);
        await findDecadeByLabel('Next year (Control + right)', distance, decade, page);
    }
    await selectPickerCell(year, page);
    await selectPickerCell(month, page);
    await selectPickerCell(day, page);
}

async function findDecadeByLabel(label: string, distance: number, decade: number, page: Page) {
    let clickCount = Math.ceil(distance / decade);
    let backButton = `//button[@aria-label = '${label}']`;
    for (let i = 0; i < clickCount; i++) {
        await page.locator(backButton).click();
    }
}

async function selectPickerCell(input: string, page: Page) {
    let xpath = `//td[contains(concat(' ', @class, ' '), ' ant-picker-cell-in-view ') and normalize-space()='${input}']`;
    await page.locator(xpath).click();
}