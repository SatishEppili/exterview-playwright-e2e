import { Page, expect } from '@playwright/test';
import path from 'path';

export class InterviewPage {
  constructor(private page: Page) { }

  // =====================================================
  // STEP 1: Interview Guidelines
  // =====================================================
  async continueFromGuidelines() {
    await expect(
      this.page.getByText('Interview Guidelines')
    ).toBeVisible({ timeout: 30000 });

    await this.page
      .getByRole('button', { name: 'Continue to the interview' })
      .click();
  }

  // =====================================================
  // STEP 2: Capture & Upload Image
  // =====================================================
  async captureAndUploadImage(imageRelativePath: string) {
    const imagePath = path.join(process.cwd(), imageRelativePath);

    // Wait for capture screen
    await expect(
      this.page.getByText('Capture Your Image to start the interview')
    ).toBeVisible({ timeout: 30000 });

    // Click Capture button
    await this.page.getByRole('button', { name: 'Capture' }).click();

    // Wait for Upload Image button to appear
    const uploadBtn = this.page.getByRole('button', { name: 'Upload Image' });
    await expect(uploadBtn).toBeVisible({ timeout: 30000 });

    //IMPORTANT: Wait for file input BEFORE clicking upload
    const fileInput = this.page.locator('input[type="file"]');
    await fileInput.waitFor({ state: 'attached', timeout: 30000 });

    // Set file directly
    await fileInput.setInputFiles(imagePath);

    // Now click Upload Image
    await uploadBtn.click();

    // Wait for next screen
    await this.page.waitForLoadState('networkidle');
  }

  // STEP 3: Simulate Interview
  // =====================================================
  async simulateInterview(durationMs: number = 8000) {
    await this.page.waitForTimeout(durationMs);
  }

  // =====================================================
  // STEP 4: Submit Interview
  // =====================================================
  async submitInterview() {
    const submitBtn = this.page.getByRole('button', { name: /Submit/i });

    await expect(submitBtn).toBeVisible({ timeout: 30000 });
    await submitBtn.click();

    await expect(
      this.page.getByText('Thank You')
    ).toBeVisible({ timeout: 30000 });

    this.page.on('close', () => {
      console.log('Interview page closed unexpectedly');
    });
  }
}
