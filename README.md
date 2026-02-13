E2E Automation – Interview Workflow

This project contains an End-to-End UI automation suite built using Playwright with TypeScript.
It automates the complete interview lifecycle — from login to interview report validation.

The framework follows the Page Object Model (POM) to keep the test structure clean, reusable, and maintainable.

Tech Stack

Playwright

TypeScript

Page Object Model (POM)

UI-based End-to-End Testing

Test Coverage

The following workflow is automated:

Login using OTP

Create a Job

Upload Candidate Resume

Generate Interview Link

Complete AI Interview

Validate Interview Report

The goal was to simulate a realistic recruiter-to-candidate flow and validate the entire process through UI automation.

Project Structure
├── tests/
│   └── E2e_workflows.spec.ts
│
├── pages/
│   ├── LoginPage.ts
│   ├── JobPage.ts
│   ├── CandidatePage.ts
│   └── InterviewPage.ts
│
├── playwright.config.ts
└── package.json


tests/ contains the test specification.

pages/ contains Page Object classes with reusable actions and locators.

playwright.config.ts manages browser configuration and permissions.

How to Run the Tests

Install dependencies:

npm install
npx playwright install


Run the test:

npx playwright test tests/E2e_workflows.spec.ts --headed


You can remove --headed to run in headless mode.

Assumptions

OTP retrieval was initially automated using Yopmail. However, frequent executions triggered CAPTCHA protection.
To avoid external dependency and instability, a static OTP approach was used for automation.

Camera and microphone permissions are granted via Playwright browser context.

Clipboard permissions are enabled to capture and reuse the generated interview link.

The candidate name “Eppili Satish” is expected to appear after resume upload.

Limitations

CAPTCHA handling is not automated (manual intervention required).

OTP is static (not dynamically fetched).

Webcam capture is simulated using file upload.

Validation is UI-level only (no backend/API verification).

Tests rely on stable UI locators (text-based selectors).

Challenges Faced & Solutions
1. Strict Mode Locator Conflicts

Issue: Multiple elements had similar text (e.g., “Add Candidates”, “Resume”).
Solution: Used scoped locators and getByRole() with exact: true to avoid ambiguity.

2. Wizard Navigation Instability

Issue: “Continue” button was not immediately enabled, causing flaky failures.
Solution: Added assertion-based waits:

await expect(button).toBeEnabled();


This reduced flakiness significantly.

3. Clipboard Permission Issue

Issue: Unable to read the interview link from clipboard.
Solution: Configured browser context with:

permissions: ['clipboard-read', 'clipboard-write']

4. Camera & Microphone Access

Issue: Interview page required camera and microphone permissions.
Solution: Granted required permissions in Playwright browser context:

permissions: ['camera', 'microphone']

5. Page Closing During Interview

Issue: Target page closed unexpectedly during image upload.
Solution: Added proper navigation handling and dynamic assertions.
Static waits were used only where the application did not expose reliable UI state changes.

In a production scenario, this would ideally be handled via API interception or network-based synchronization.

Final Notes

This project focuses on:

Stability over shortcuts

Clean test structure

Realistic user simulation

Practical handling of browser permissions

Reducing flakiness using assertion-based waits

The implementation reflects real-world E2E automation challenges and solutions.
