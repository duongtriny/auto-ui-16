import { test, expect } from '@playwright/test';

test.beforeAll('Before all', async () => {
  console.log('Before all');
});

test.beforeEach('Before each', async () => {
  console.log('Before each');
});

test.afterEach('After each', async () => {
  console.log('After each');
});

test.afterAll('After all', async () => {
  console.log('After all');
});


test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
