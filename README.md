**E2E Automation – Interview Workflow**

This project contains an End-to-End UI automation suite built using Playwright with TypeScript.

It automates the complete interview lifecycle — from login to interview report validation — simulating a real recruiter and candidate workflow.

The framework follows the Page Object Model (POM) to keep the test structure clean, reusable, and maintainable.

**Tech Stack**

Playwright

TypeScript

Page Object Model (POM)

UI-based End-to-End Testing

**Test Coverage**

The following workflow is automated:

Login using OTP

Create a Job

Upload Candidate Resume

Generate Interview Link

Complete AI Interview

Validate Interview Report

The test simulates a real-world end-to-end scenario covering the full interview process.

**Project Structure**

tests/

Contains the main test file: E2e_workflows.spec.ts

pages/

LoginPage.ts

JobPage.ts

CandidatePage.ts

InterviewPage.ts

playwright.config.ts

Handles browser configuration and permissions

package.json

**Project dependencies and scripts**

**How to Run the Tests**
Install Dependencies

npm install

npx playwright install

Run the Test (Headed Mode)

npx playwright test tests/E2e_workflows.spec.ts --headed

Run in Headless Mode

npx playwright test tests/E2e_workflows.spec.ts

**Assumptions**

OTP retrieval was initially automated using Yopmail.

Repeated executions triggered CAPTCHA protection.

To maintain stability and avoid external dependency, a static OTP strategy was used.

Camera and microphone permissions are granted via Playwright browser context.

Clipboard permissions are enabled to capture and reuse the interview link.

Candidate name “Eppili Satish” is expected to appear after resume upload.

**Limitations**

CAPTCHA handling is not automated (manual bypass required).

OTP is static (not dynamically fetched).

Webcam capture is simulated via file upload.

Validation is performed at UI level only.

No backend or API validation implemented.

Test depends on stable text-based locators.

**Challenges Faced & Solutions**
1. Strict Mode Locator Conflicts

Issue: Multiple elements had similar text (e.g., “Add Candidates”, “Resume”).

Solution:

Used getByRole() with exact: true.

Scoped locators within specific containers to avoid ambiguity.

2. Wizard Navigation Instability

Issue: “Continue” button was not immediately enabled.

Solution:

Added assertion-based waits before clicking.

Example:

await expect(button).toBeEnabled();

3. Clipboard Permission Issue

Issue: Unable to read the generated interview link.

Solution:

Configured browser context with:

clipboard-read

clipboard-write

4. Camera & Microphone Access

Issue: Interview page required media permissions.

Solution:

Granted:

camera

microphone

Configured in Playwright browser context.

5. Page Closing During Interview

Issue: Target page closed unexpectedly during image upload.

Solution:

Ensured navigation completed before interaction.

Added dynamic assertions.

Used static waits only where no deterministic UI signal was available.

**Final Note**

Practical handling of browser permissions

Assertion-based synchronization strategy

Flakiness reduction techniques

Clean structure using Page Object Model

The focus was on stability, readability, and maintaining realistic user flow throughout the automation process.

