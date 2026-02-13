import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { fetchOtp } from './otpHelper';
import { TEST_EMAIL } from './constants';

export async function login(page: Page) {
  const loginPage = new LoginPage(page);

  await page.goto('/sign-in');

  await loginPage.enterEmail(TEST_EMAIL);

  const otp = await fetchOtp(page.context(), TEST_EMAIL);
  await loginPage.enterOtp(otp);

  await page.waitForURL('**/dashboard');
}
