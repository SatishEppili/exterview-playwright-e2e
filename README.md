E2E Automation – AI Interview Workflow

Assessment Submission

📌 Overview

This project implements an End-to-End UI automation framework using Playwright with TypeScript to automate the complete AI interview lifecycle.

The test simulates a realistic recruiter-to-candidate workflow — from login to interview report validation — ensuring the entire process functions as expected.

The framework follows the Page Object Model (POM) design pattern for scalability, readability, and maintainability.

🛠 Tech Stack

Playwright

TypeScript

Page Object Model (POM)

End-to-End UI Automation

🔄 Automated Workflow Coverage

The following flow is fully automated:

Login using OTP

Create a Job

Upload Candidate Resume

Generate Interview Link

Complete AI Interview

Validate Interview Report

This represents a real-world, full lifecycle execution scenario.

📁 Project Structure
tests/
  └── E2e_workflows.spec.ts

pages/
  ├── LoginPage.ts
  ├── JobPage.ts
  ├── CandidatePage.ts
  ├── InterviewPage.ts

playwright.config.ts
package.json


tests/ – Contains the main E2E workflow test

pages/ – Encapsulates UI interactions using POM

playwright.config.ts – Handles browser configuration and permissions

⚙️ Setup & Execution
Install Dependencies
npm install
npx playwright install

Run in Headed Mode
npx playwright test tests/E2e_workflows.spec.ts --headed

Run in Headless Mode
npx playwright test tests/E2e_workflows.spec.ts

🔐 Browser Permissions Handling

The following permissions are configured via Playwright browser context:

camera

microphone

clipboard-read

clipboard-write

These are required to:

Simulate interview media flow

Capture and reuse generated interview links

📌 Assumptions

OTP was initially automated via Yopmail.

Repeated executions triggered CAPTCHA protection.

To maintain test stability, a static OTP approach was used.

Candidate name “Eppili Satish” is validated after resume upload.

Webcam interaction is simulated via file upload.

Validation is performed at UI level only.

⚠️ Limitations

CAPTCHA handling is not automated and requires manual bypass.

OTP is static (not dynamically retrieved).

Backend/API validation is not implemented — validation is UI-based.

Interview Start Restriction
If the interview is already marked as:

COMPLETED

EXPIRED

or attempt limit reached

The start-video-ai-interview API returns 400 Bad Request.
This is enforced server-side and cannot be bypassed via UI automation.
The framework logs API responses to surface the exact failure reason.

🧠 Challenges & Solutions
1. Strict Mode Locator Conflicts

Resolved using scoped getByRole() locators with contextual targeting.

2. Wizard Navigation Instability

Used assertion-based waits:

await expect(button).toBeEnabled();


instead of static delays.

3. Clipboard Permission Issue

Resolved by enabling clipboard-read and clipboard-write.

4. Camera & Microphone Access

Granted via Playwright browser context configuration.

5. Image Upload & Crop Flow

Handled file chooser events and automated “Crop & Upload” confirmation.

🎯 Focus Areas

Realistic end-to-end workflow simulation

Assertion-driven synchronization strategy

Minimal static waits

Clean Page Object Model structure

Stability and maintainability

✅ Conclusion

This automation framework demonstrates:

Practical E2E testing of a multi-step workflow

Handling of browser permissions and media interactions

Structured and maintainable test architecture

Awareness of backend validation constraints

The solution prioritizes stability, clarity, and real-world simulation.

