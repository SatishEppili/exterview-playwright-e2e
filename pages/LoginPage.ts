import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    // Use baseURL from playwright.config.ts
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  }

  async enterEmail(email: string) {
    await this.page.getByLabel('Phone or Email').fill(email);
    await this.page.getByRole('button', { name: 'Send OTP' }).click();
  }

  async enterOtp(otp: string) {
    const firstBox = this.page.locator('input').nth(1); 
    await firstBox.click();
    await this.page.keyboard.type(otp, { delay: 100 });

    await this.page.getByRole('button', { name: /verify/i }).click();
  }
}

