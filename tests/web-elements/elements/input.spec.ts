import { expect, Page, test } from "@playwright/test";

test.beforeEach('Before', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/input');
});

test(`Verify normal input`, async ({ page }) => {
    await inputTextboxByLabel('Normal Input', 'Test With Me', page);
    await expect(page.getByText(`Value: Test With Me`)).toBeVisible();
});

async function inputTextboxByLabel(label: string, value: string, page: Page) {
    let xpath1 = `//div[@role='separator' and normalize-space() = '${label}']/following::input[1]`;
    let xpath2 = `//div[@role='separator' and normalize-space() = '${label}']/following::textarea[1]`;
    await page.locator(`${xpath1}|${xpath2}`).first().fill(value);
}

async function inputTextareaByLabel(label: string, value: string, page: Page) {
    let xpath = `//div[@role='separator' and normalize-space() = '${label}']/following::textarea[1]`;
    await page.locator(xpath).fill(value);
}

test(`Verify Input Number`, async ({ page }) => {
    await inputTextboxByLabel('Input Number', '30', page);
    await expect(page.getByText(`Value: 30`)).toBeVisible();
});

test(`Verify Text Area`, async ({ page }) => {
    await inputTextboxByLabel('Text Area', 'Do something', page);
    await expect(page.getByText(`Value: Do something`)).toBeVisible();
});

test(`Verify Password Box`, async ({ page }) => {
    await inputTextboxByLabel('Password Box', '1234567890', page);
    await expect(page.getByText(`Value: 1234567890`)).toBeVisible();
});

test(`Verify OTP Box`, async ({ page }) => {
    await inputOtpBoxByLabel('OTP Box', '123456', page);
    await expect(page.getByText(`Value: 123456`)).toBeVisible();
});

async function inputOtpBoxByLabel(label: string, input: string, page: Page) {
    let otpGroupXpath = `//div[@role='separator' and normalize-space() = '${label}']/following::div[contains(concat(' ', @class, ' '), ' ant-otp ')][1]`;
    let otpGroup = page.locator(otpGroupXpath);
    for (let i = 0; i < input.length; i++) {
        let otpXpath = `//input[@aria-label="OTP Input ${i + 1}"]`;
        let otp = otpGroup.locator(otpXpath);
        await otp.click();
        await otp.fill(input.charAt(i));
    }
}