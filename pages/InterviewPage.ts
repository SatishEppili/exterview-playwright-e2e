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

    // Handle native file chooser
    const [fileChooser] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      this.page.getByRole('button', { name: 'Upload from device' }).click(),
    ]);

    // Upload file
    await fileChooser.setFiles(imagePath);

    // Wait for upload to complete
    await this.page.waitForLoadState('networkidle');

    await this.page.getByRole('button', { name: 'Crop & Upload' }).click();


    // Wait for next screen
    await this.page.waitForLoadState('networkidle');
  }

  // STEP 3: Simulate Interview
  // =====================================================
  async simulateInterview(durationMs: number = 8000) {

    // Listen for backend response BEFORE clicking
    this.page.on('response', async (response) => {
      if (response.url().includes('start-video-ai-interview')) {
        console.log('Start Interview API Status:', response.status());
        console.log('Start Interview API Body:', await response.text());
      }
    });

    await this.page.waitForTimeout(durationMs);

    // Click Start Interview
    await this.page.getByRole('button', { name: 'Start Interview' }).click();

    // Check for UI error message
    const errorToast = this.page.locator('text=Failed to start the interview');

    if (await errorToast.isVisible({ timeout: 5000 }).catch(() => false)) {
      console.log('UI Error:', await errorToast.textContent());
    }
  }
}
