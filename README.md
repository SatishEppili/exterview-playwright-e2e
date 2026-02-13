# Exterview E2E Automation

**Tech Stack**
- Playwright (TypeScript)
- Page Object Model
- End-to-End UI Automation

**Test Covered**
- Login with OTP
- Job Creation
- Candidate Upload
- Interview Link Generation
- AI Interview Completion
- Interview Report Validation

**How to run testcases**

Install dependencies:
npm install
npx playwright install

Run test:
npx playwright test tests/E2e_workflows.spec.ts --headed


**Assumptions**

**> I initially automated OTP retrieval via Yopmail. However, frequent test executions triggered CAPTCHA protection. To maintain test stability and avoid external dependency, I switched to a static OTP strategy for automation purposes.**

> Camera and microphone permissions are granted via Playwright browser context.

> Clipboard access is enabled to capture the interview link.

> Candidate name (Eppili Satish) is assumed to appear after resume upload.

**Limitations**

> CAPTCHA handling is not automated (manual bypass required). 

> Image capture step uses file upload simulation instead of real webcam capture.

> Test assumes stable UI locators (text-based selectors).

> No backend API validation is implemented (UI-level validation only).

**Challenges Faced & Solutions**

1️⃣ Strict Mode Locator Conflicts

Issue: Multiple elements with same text (Add Candidates, resume).
Solution: Used getByRole() with exact: true and scoped locators to avoid ambiguity.

2️⃣ Wizard Navigation Instability

Issue: Continue button not enabled immediately.
Solution: Added expect(button).toBeEnabled() before clicking to prevent flakiness.

3️⃣ Clipboard Permission Issue

Issue: Unable to read interview link from clipboard.
Solution: Created browser context with:

permissions: ['clipboard-read', 'clipboard-write']

4️⃣ Camera & Microphone Permission

Issue: Interview page required camera access.
Solution: Added browser context permissions:

permissions: ['camera', 'microphone'],

The inteview was unable to open both manual as well as automation

5️⃣ Page Closing During Interview

Issue: Target page has been closed during image upload.
Solution: Added proper waits and ensured navigation completed before interacting. Where possible, dynamic assertions were used. Static waits were applied only in scenarios where application behavior is asynchronous and does not expose deterministic UI state changes. In a production environment, this would ideally be replaced with API interception or network-based wait strategies.

