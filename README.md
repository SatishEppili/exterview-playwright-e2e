🎯 End-to-End Automation Framework – Interview Workflow
📌 Overview

This project implements an End-to-End UI Automation Framework using Playwright with TypeScript, following the Page Object Model (POM) design pattern.

The automation suite validates the complete interview workflow — from login to AI interview report validation — simulating a real-world recruiter and candidate journey.

The framework is designed with:

Maintainability

Stability

Readability

Real-world automation best practices

🛠 Tech Stack

Framework: Playwright

Language: TypeScript

Design Pattern: Page Object Model (POM)

Test Type: End-to-End UI Automation

Execution Mode: Headed / Headless

🧪 Test Coverage

The following business workflow is automated:

Login with OTP

Job Creation

Candidate Upload (Resume Upload)

Interview Link Generation

AI Interview Completion

Interview Report Validation

The automation simulates a full recruiter-to-candidate interview lifecycle.

📂 Project Structure
project-root/
│
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
├── package.json
└── README.md

Structure Highlights

tests/ → Contains test specifications.

pages/ → Contains Page Object classes encapsulating UI interactions.

playwright.config.ts → Centralized test configuration.

Follows clean separation of test logic and UI locators.

▶️ How to Run the Tests
1️⃣ Install Dependencies
npm install
npx playwright install

2️⃣ Execute Test (Headed Mode)
npx playwright test tests/E2e_workflows.spec.ts --headed

Optional: Run in Headless Mode
npx playwright test tests/E2e_workflows.spec.ts

🧠 Test Design Approach

This framework follows modern automation best practices:

✔ Page Object Model for maintainability

✔ Role-based selectors (getByRole) to reduce locator flakiness

✔ Assertion-driven synchronization (expect().toBeEnabled())

✔ Minimal usage of static waits

✔ Browser context permission handling

✔ UI-level validation of business workflow

The test flow is designed to closely replicate real user behavior.

🔐 Assumptions

Static OTP Strategy:
Initially, OTP retrieval was automated using Yopmail. However, repeated test executions triggered CAPTCHA protection.
To ensure test stability and remove third-party dependency, a controlled static OTP mechanism was implemented.

Browser Permissions:
The Playwright browser context is configured with:

camera

microphone

clipboard-read

clipboard-write

Resume Upload Behavior:
Candidate name "Eppili Satish" is assumed to appear after resume upload.

Interview Link Retrieval:
Clipboard access is enabled to capture and reuse the generated interview link.

🚫 Known Limitations

CAPTCHA handling is not automated (manual bypass required).

Static OTP is used instead of dynamic OTP retrieval.

Image capture step is simulated via file upload (not real webcam capture).

No backend API validation (UI validation only).

Test relies on stable UI locators (text-based selectors).

Network interception or API stubbing is not implemented.

⚠ Challenges Faced & Solutions
1️⃣ Strict Mode Locator Conflicts

Issue:
Multiple elements had identical text (e.g., "Add Candidates", "Resume").

Solution:

Used getByRole() with { exact: true }

Applied scoped locators within specific containers

Avoided ambiguous text-based selectors

2️⃣ Wizard Navigation Instability

Issue:
The "Continue" button was not immediately enabled, causing flaky failures.

Solution:
Implemented assertion-based synchronization:

await expect(continueButton).toBeEnabled();
await continueButton.click();


This ensures stable navigation without unnecessary waits.

3️⃣ Clipboard Permission Issue

Issue:
Unable to read the generated interview link from clipboard.

Solution:
Configured browser context with required permissions:

permissions: ['clipboard-read', 'clipboard-write']

4️⃣ Camera & Microphone Permission Issue

Issue:
The interview page required camera and microphone access, blocking execution.

Solution:
Configured browser context permissions:

permissions: ['camera', 'microphone']

5️⃣ Page Closing During Interview

Issue:
Target page was closing unexpectedly during image upload.

Solution:

Added proper navigation waits

Ensured page stability before interaction

Replaced unnecessary static waits with dynamic assertions

Used static waits only when the application lacked deterministic UI signals

In a production-ready environment, this would ideally be replaced with:

API interception

Network-based wait strategies

Event-driven synchronization

🔄 Future Improvements

Implement API-level validation using Playwright request context

Replace static OTP with mock/stubbed authentication

Integrate test reporting (HTML Reporter enhancements)

Add CI/CD pipeline integration

Introduce test data management strategy

Use data-testid attributes for more stable locators

🏁 Conclusion

This framework demonstrates:

Real-world E2E automation capability

Playwright proficiency

Synchronization strategy understanding

Permission handling expertise

Debugging and flakiness mitigation skills

Clean architecture using Page Object Model

The implementation focuses on reliability, clarity, and production-grade automation design principles.
