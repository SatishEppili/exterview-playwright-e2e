🚀 E2E Automation – AI Interview Workflow
📌 Overview

This project implements a robust End-to-End UI automation framework using Playwright with TypeScript to validate the complete AI interview lifecycle.

The automation simulates a real-world recruiter and candidate journey — from authentication to final interview report validation.

The framework is built using the Page Object Model (POM) design pattern to ensure maintainability, scalability, and readability.

🛠 Tech Stack

Playwright

TypeScript

Page Object Model (POM)

End-to-End UI Testing

Assertion-based synchronization strategy

🔄 Automated Workflow Coverage

The following full interview lifecycle is automated:

Login using OTP

Create a Job

Upload Candidate Resume

Generate Interview Link

Complete AI Interview

Validate Interview Report

This represents a real-world recruiter-to-candidate flow executed entirely through UI automation.

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


tests/ – Main E2E test suite

pages/ – Page Object classes encapsulating UI interactions

playwright.config.ts – Browser configuration & permissions

⚙️ Setup & Execution
1️⃣ Install Dependencies
npm install
npx playwright install

2️⃣ Run Test (Headed Mode)
npx playwright test tests/E2e_workflows.spec.ts --headed

3️⃣ Run Test (Headless Mode)
npx playwright test tests/E2e_workflows.spec.ts

🔐 Browser Permissions Configuration

The following permissions are configured in Playwright browser context:

camera

microphone

clipboard-read

clipboard-write

These are required for:

Interview media handling

Capturing generated interview links

Simulating realistic interview conditions

📌 Assumptions

OTP retrieval was initially automated using Yopmail.

Repeated executions triggered CAPTCHA protection.

A static OTP strategy was adopted to ensure stability.

Candidate name “Eppili Satish” is expected post resume upload.

Webcam interaction is simulated via image upload.

Validation is performed at UI level only.

⚠️ Limitations
1. CAPTCHA Handling

CAPTCHA validation is not automated and requires manual bypass.

2. Static OTP

OTP is not dynamically fetched due to CAPTCHA restrictions.
A static OTP approach is used for stability.

3. UI-Level Validation Only

The framework validates UI behavior only.
No backend or API validation is implemented.

4. Test Stability Dependency

The automation relies on stable text-based locators and consistent UI structure.

5. Interview State Validation Restriction

The platform enforces strict backend validation for interview start.

If the interview record is marked as:

COMPLETED

EXPIRED

FAILED

or max attempt limit reached

The start-video-ai-interview API returns:

400 Bad Request


This server-side restriction prevents restarting the interview and cannot be bypassed via UI automation.

The framework captures and logs backend responses using:

page.waitForResponse()


to provide accurate debugging information.

🧠 Challenges Faced & Solutions
1️⃣ Strict Mode Locator Conflicts

Issue:
Multiple elements had similar labels (e.g., “Add Candidates”, “Resume”).

Solution:

Used getByRole() with exact: true

Scoped locators within specific containers

Reduced ambiguity via contextual targeting

2️⃣ Wizard Navigation Instability

Issue:
“Continue” button was not immediately enabled.

Solution:

await expect(button).toBeEnabled();


Used assertion-based synchronization instead of static waits.

3️⃣ Clipboard Permission Issue

Issue:
Unable to capture generated interview link.

Solution:
Configured browser context with:

clipboard-read

clipboard-write

4️⃣ Camera & Microphone Access

Issue:
Interview page required media device access.

Solution:
Granted:

camera

microphone

in Playwright configuration.

5️⃣ Image Upload & Cropping Flow

Issue:
Interview required image upload with cropping confirmation.

Solution:
Handled file chooser event and crop confirmation:

page.waitForEvent('filechooser')


and automated Crop & Upload interaction.

6️⃣ Page Closing During Interview

Issue:
Target page closed unexpectedly during image upload.

Solution:

Ensured navigation completion before interaction

Added deterministic waits

Reduced reliance on static delays

🏗 Design Principles Applied

Clean Page Object Model architecture

Assertion-driven synchronization

Event-based API logging

Minimal use of static waits

Realistic user behavior simulation

Flakiness reduction techniques

🎯 Key Highlights

✔ Complete end-to-end recruiter workflow
✔ Real browser permissions handling
✔ Media interaction simulation
✔ Backend error logging
✔ Structured & maintainable codebase
✔ Production-style automation practices

🏁 Conclusion

This project demonstrates:

Practical E2E automation of a complex workflow

Handling of browser permissions & media APIs

Backend validation awareness

Robust synchronization strategies

Clean and scalable test architecture

The focus was on stability, realism, maintainability, and professional automation standards.

