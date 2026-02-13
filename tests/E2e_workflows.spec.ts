import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { JobPage } from '../pages/JobPage';
import { CandidatePage } from '../pages/CandidatePage';
import { InterviewPage } from '../pages/InterviewPage';

const TEST_EMAIL = 'sravan.t@yopmail.com';
const STATIC_OTP = '123456';

test.describe('End-to-End Avatar Interview Flow', () => {

    test.setTimeout(360000); // 6 minutes for full E2E
    test('Complete Avatar Interview Journey', async ({ browser }) => {

        const context = await browser.newContext({
            permissions: ['camera', 'microphone', 'clipboard-read', 'clipboard-write'],
            ignoreHTTPSErrors: true
        });

        const page = await context.newPage();

        const login = new LoginPage(page);
        const dashboard = new DashboardPage(page);
        const job = new JobPage(page);
        const candidate = new CandidatePage(page);

        // =====================================================
        // STEP 1: LOGIN
        // =====================================================
        await login.goto();
        await login.enterEmail(TEST_EMAIL);
        await login.enterOtp(STATIC_OTP);

        await expect(page).toHaveURL(/dashboard/, { timeout: 30000 });

        // =====================================================
        // STEP 2: CREATE JOB
        // =====================================================
        await dashboard.clickCreateJob();

        await job.selectAIHumanInterview();
        await job.uploadJobDescription('sample_files/job.pdf');
        await job.continueAfterUpload();
        await job.fillMandatoryFields();
        await job.goToQuestionnaireStep();

        // Select AI Interview tab
        await page.getByText('AI Interview', { exact: false }).click();

        const continueBtnStep2 = page.getByRole('button', { name: 'Continue' });
        await expect(continueBtnStep2).toBeEnabled({ timeout: 30000 });
        await continueBtnStep2.click();

        // =====================================================
        // STEP 3: ADD CANDIDATE
        // =====================================================
        await expect(
            page.getByRole('button', { name: 'Add Candidates', exact: true })
        ).toBeVisible({ timeout: 30000 });

        await candidate.uploadResume('sample_files/resume.pdf');
        await candidate.verifyCandidateAdded();

        // Click Continue (Step 3 bottom right)
        const finalContinueBtn = page.getByRole('button', { name: 'Continue' });
        await expect(finalContinueBtn).toBeEnabled({ timeout: 30000 });
        await finalContinueBtn.click();

        // =====================================================
        // STEP 4: SUCCESS MODAL
        // =====================================================
        await expect(
            page.getByText('Job Created Successfully!')
        ).toBeVisible({ timeout: 30000 });

        await page.getByRole('button', { name: 'Go to Jobs' }).click();

        await expect(page).toHaveURL(/job-details/, { timeout: 30000 });

        // =====================================================
        // STEP 5: COPY INTERVIEW LINK
        // =====================================================
        const interviewLink = await candidate.copyInterviewLink();

        console.log('Interview Link:', interviewLink);
        expect(interviewLink).toContain('http');

        // =====================================================
        // STEP 6: OPEN INTERVIEW & COMPLETE FLOW
        // =====================================================
        const interviewPage = await context.newPage();
        await interviewPage.goto(interviewLink);

        const interview = new InterviewPage(interviewPage);

        // Guidelines
        await interview.continueFromGuidelines();

        // Capture & Upload Image
        await interview.captureAndUploadImage('sample_files/profile.jpg');

        // Simulate answering questions
        await interview.simulateInterview(8000);

        // Submit interview
        await interview.submitInterview();

        // =====================================================
        // STEP 7: VALIDATE REPORT (Back to Admin)
        // =====================================================
        await page.bringToFront();
        await page.reload();

        await expect(
            page.getByText('Eppili Satish', { exact: true })
        ).toBeVisible({ timeout: 60000 });

        // Expand candidate again
        await page.getByText('Eppili Satish', { exact: true }).click();

        // Validate interview completion
        await expect(
            page.getByText('AI INTERVIEW + AGENT')
        ).toBeVisible({ timeout: 60000 });

        console.log(' E2E Interview Flow Completed Successfully');

    });

});
