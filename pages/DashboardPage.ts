import { Page } from '@playwright/test';

export class DashboardPage {
  constructor(private page: Page) {}

  async closePopupIfPresent() {
    // Wait a moment for popup to appear
    await this.page.waitForTimeout(2000);

    const closeIcon = this.page.locator('button:has(svg)').last();

    if (await closeIcon.isVisible().catch(() => false)) {
      await closeIcon.click();
      await this.page.waitForTimeout(1000);
    }
  }

  async clickCreateJob() {
    await this.closePopupIfPresent();

    await this.page.locator('text=Create Job').first().waitFor({ timeout: 20000 });
    await this.page.locator('text=Create Job').first().click();
  }

  async goToJobsTab() {
    await this.closePopupIfPresent();
    await this.page.locator('text=Jobs').first().click();
  }
}
