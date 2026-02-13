import { Page, expect } from '@playwright/test';
import path from 'path';

export class CandidatePage {
  constructor(private page: Page) { }

  // ============================================
  // Upload Resume
  // ============================================
  async uploadResume(fileRelativePath: string) {
    const filePath = path.join(process.cwd(), fileRelativePath);

    await this.page
      .getByRole('button', { name: 'Add Candidates', exact: true })
      .click();

    await expect(
      this.page.getByText('Upload Candidates')
    ).toBeVisible({ timeout: 30000 });

    const fileInput = this.page.locator('input[type="file"]');
    await fileInput.setInputFiles(filePath);

    await expect(
      this.page.getByText('resume.pdf', { exact: true })
    ).toBeVisible({ timeout: 30000 });

    await this.page
      .getByRole('button', { name: 'Upload', exact: true })
      .click();

    await expect(
      this.page.getByText('Upload Candidates')
    ).not.toBeVisible({ timeout: 60000 });
  }

  // ============================================
  // Verify Candidate Added
  // ============================================
  async verifyCandidateAdded() {
    await expect(
      this.page.getByText('Eppili Satish', { exact: true })
    ).toBeVisible({ timeout: 60000 });
  }

  // ============================================
  //   // Copy Interview Link (FULLY Encapsulated)
  //============================================
  async copyInterviewLink(): Promise<string> {

    // Expand candidate row
    await this.page
      .getByText('Eppili Satish', { exact: true })
      .click();

    await expect(
      this.page.getByText('AI INTERVIEW + AGENT')
    ).toBeVisible({ timeout: 30000 });

    const copyBtn = this.page
      .getByRole('button', { name: 'Copy Link' })
      .first();

    await expect(copyBtn).toBeVisible({ timeout: 30000 });
    await copyBtn.click();

    await this.page.waitForTimeout(1000);

    const interviewLink = await this.page.evaluate(() =>
      navigator.clipboard.readText()
    );

    expect(interviewLink).toContain('http');

    return interviewLink;
  }

}