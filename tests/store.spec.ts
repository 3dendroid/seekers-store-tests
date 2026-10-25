import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // 1. open the main page
  await page.goto('/');
  // 2. click the button that rejects cookies
  const rejectCookiesButton = page.getByRole('button', { name: 'Reject All' });
  await rejectCookiesButton.click();
  await expect(rejectCookiesButton).toBeHidden();
});

test('store page shows main sections', async ({ page }) => {
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

test('check links in the footer', async ({ page }) => {
  const social = page.locator('.socialize');

  const footerItems = [
    'https://www.facebook.com/SeekersNotes/',
    'https://twitter.com/seekersnotes',
    'https://www.youtube.com/channel/UCd4a6s2yznJD40lOKMPKPDQ',
    'https://www.instagram.com/seekersnotes_official/',
  ];

  for (const item of footerItems) {
    await expect(social.locator(`a[href*="${item}"]`)).toBeVisible();
  }
});

test('FAQ question opens the answer', async ({ page }) => {
  const faqQuestion = page.getByRole('button', { name: "What is the Seeker's Store?" });
  const faqAnswer = page.getByText(
    "The Seeker's Store is the official online store selling goods for the game Seekers Notes.",
  );
  await expect(faqAnswer).toBeHidden();
  await faqQuestion.click();
  await expect(faqAnswer).toBeVisible();
});
