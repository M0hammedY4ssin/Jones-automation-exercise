# Jones-automation-exercise
Playwright Form Automation

An end-to-end automation script using [Playwright] to interact with and validate the contact form on `https://test.netlify.app/`.

---

## Features Tested

- **Form Completion:** Populates all primary input fields (`Name`, `Email`, `Phone`, `Company`, and `Website`).
- **Dropdown Selection (Bonus):** Updates the company size selection from `1-10` to `51-500`.
- **Pre-Submission Screenshot:** Captures a full-page snapshot (`form-before-submit.png`) of the filled state before form dispatch.
- **Form Dispatch & Validation:** Clicks the submit action ("Request a call back") and monitors the flow until the confirmation/thank-you state appears, logging success to `console.log`.

---
