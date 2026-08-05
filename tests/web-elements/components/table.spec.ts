import { expect, Page, test } from "@playwright/test";
import { expectedTableData } from "../../../data/table/table-test-data";

test(`Verify table`, async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/table');
    let expectedHeaders = ['Name', 'Address', 'Age', 'Tags'];
    let tableData = await getTableDataByLabel('Table', expectedHeaders, page);
    let sortedActual = sortJson(tableData);
    let sortedExpected = sortJson(expectedTableData);
    expect(sortedActual).toEqual(expect.arrayContaining(sortedExpected));
    expect(sortedActual.length).toEqual(sortedExpected.length);
});

async function getTableDataByLabel(label: string, expectedHeaders: string[], page: Page) {
    let nextButtonXpath = `(//div[@role='separator' and normalize-space()='${label}']/following::li[@title='Next Page'])[1]`;
    let isNext;
    let tableXpath = `(//div[@role='separator' and normalize-space() = '${label}']/following::table)[1]`;
    let tableData = [];
    do {
        let tableLocator = page.locator(tableXpath);
        await page.waitForTimeout(500);
        let actualHeaders = await tableLocator.locator('th').allTextContents();
        let listHeaderWithIndex = [];
        for (let expectedHeader of expectedHeaders) {
            let obj = {
                header: expectedHeader,
                index: actualHeaders.indexOf(expectedHeader)
            }
            listHeaderWithIndex.push(obj);
        }
        let rows = await tableLocator.locator('//tbody//tr').all();
        for (let row of rows) {
            let rowData: any = {};
            for (let mapOject of listHeaderWithIndex) {
                let tdXpath = `//td[${mapOject.index + 1}]`;
                let tdValue;
                if (mapOject.header == 'Tags') {
                    let tagSelector = '.ant-tag';
                    tdValue = await row.locator(tdXpath).locator(tagSelector).allTextContents();
                } else {
                    tdValue = await row.locator(tdXpath).textContent()
                }
                rowData[mapOject.header] = tdValue;
            }
            tableData.push(rowData);
        }
        isNext = await page.locator(nextButtonXpath).getAttribute('aria-disabled');
        if (isNext == 'false') {
            await page.locator(nextButtonXpath).click();
        }
    } while (isNext == 'false');
    return tableData;
}

function sortJson(value: any): any {
    // Array → sort values
    if (Array.isArray(value)) {
        return value
            .map(sortJson)
            .sort((a, b) => {
                return JSON.stringify(a).localeCompare(JSON.stringify(b));
            });
    }

    // Object → sort keys
    if (value !== null && typeof value === "object") {
        const sorted: { [key: string]: any } = {};
        Object.keys(value)
            .sort()
            .forEach(key => {
                sorted[key] = sortJson(value[key]);
            });
        return sorted;
    }

    return value;
}