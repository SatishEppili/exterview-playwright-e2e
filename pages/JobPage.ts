import { Page, expect } from '@playwright/test';
import path from 'path';

export class JobPage {
    constructor(private page: Page) { }

    // ===============================
    // Step 0: Select AI & Human Interview
    // ===============================
    async selectAIHumanInterview() {
        await this.page
            .getByText('AI & Human Interview', { exact: false })
            .click();

        const continueBtn = this.page.getByRole('button', { name: 'Continue' });
        await expect(continueBtn).toBeEnabled();
        await continueBtn.click();
    }

    // ===============================
    // Step 1: Upload Job Description
    // ===============================
    async uploadJobDescription(fileRelativePath: string) {
        const filePath = path.join(process.cwd(), fileRelativePath);

        const fileInput = this.page.locator('input[type="file"]');

        // Hidden input → directly set file
        await fileInput.setInputFiles(filePath);

        // Wait for uploaded file name
        await expect(
            this.page.locator('text=job.pdf')
        ).toBeVisible({ timeout: 20000 });
    }

    // ===============================
    // Step 1: Continue After Upload
    // ===============================
    async continueAfterUpload() {
        const continueBtn = this.page.getByRole('button', { name: 'Continue' });

        await expect(continueBtn).toBeEnabled({ timeout: 30000 });
        await continueBtn.click();

        // Wait until Create Job page loads
        await expect(
            this.page.getByRole('heading', { name: 'Create Job' })
        ).toBeVisible({ timeout: 60000 });
    }

    // ===============================
    // Step 1: Fill Mandatory Fields
    // ===============================
    async fillMandatoryFields() {
        // Fill CTC
        await this.page.fill('input[placeholder="Enter CTC"]', '10');

        //  Proper Search-Based City Selection
        await this.page.getByText('Select city').click();

        const cityInput = this.page.locator('input[placeholder*="city"]');
        await cityInput.fill('Hyderabad');

        await this.page.locator('text=Hyderabad').first().click();

        // AI Benchmark Selection
        await this.page.getByText('Select Benchmark').click();
        await this.page.locator('text=50').first().click();

        // Small stability wait
        await this.page.waitForTimeout(1000);
    }

    // ===============================
    // Step 1 → Go To Step 2
    // ===============================
    async goToQuestionnaireStep() {
        const continueBtn = this.page.getByRole('button', { name: 'Continue' });

        await expect(continueBtn).toBeEnabled({ timeout: 30000 });
        await continueBtn.click();

        await expect(
            this.page.getByText('Add Questionnaire')
        ).toBeVisible({ timeout: 30000 });
    }
}