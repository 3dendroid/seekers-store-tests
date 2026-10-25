import { expect, test } from '@playwright/test';

test('store page shows main sections', async ({ page }) => {
  await page.goto('/');
  const title = 'Official Seekers Notes: Hidden Objects Store';
  await expect(page).toHaveTitle(title);

  const menuItems = [
    'Premium Access Pass',
    'Packs',
    'Rubies',
    'Secret Shop',
    'Daily Reward',
    'FAQ',
  ];

  const header = page.getByTestId('header');

  for (const item of menuItems) {
    await expect(header.getByText(item)).toBeVisible();
  }
});
