import { test } from '@playwright/test';

test('test simple', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.pause();
});