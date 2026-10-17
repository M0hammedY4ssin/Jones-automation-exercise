import { chromium } from 'playwright';
import { test, expect } from '@playwright/test';

test('netlife test',async () => {
  // Launch Chromium browser (set headless: false to watch it execute)
  const browser = await chromium.launch({ headless: false, slowMo: 1000 });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // 1. Navigate to the target website
    await page.goto('https://test.netlify.app/', { waitUntil: 'networkidle' });

    // await page.pause()

    // 2. Type values in the requested fields
    await page.fill('input[name="name"], #name, [placeholder*="Name" i]', 'Mohammed');
    await page.fill('input[name="email"], #email, [placeholder*="Email" i]', 'Mohammed@Yassin.com');
    await page.fill('input[name="phone"], #phone, [placeholder*="Phone" i]', '+972 501234567');
    await page.fill('input[name="company"], #company, [placeholder*="Company" i]', 'Yassin Software');
    await page.fill('input[name="website"], #website, [placeholder*="Website" i]', 'https://Yassin.com');

    // 3.Change the Number of Employees from 1-10 to 51-500
    // Selects the option by value or visible label text
    const employeeSelect = page.locator('select[name*="employee" i], #employees, select');
    if (await employeeSelect.count() > 0) {
      await employeeSelect.first().selectOption({ label: '51-500' }).catch(async () => {
        // Fallback: select by value if visible text differs
        await employeeSelect.first().selectOption('51-500');
      });
    }

    // 4. Create a screenshot of the page before clicking "Request a call back"
    await page.screenshot({ path: 'form-before-submission.png', fullPage: true });
    console.log('Screenshot saved: form-before-submission.png');

    // 5. Click the "Request a call back" button and wait for navigation/submission
    const submitButton = page.getByRole('button', { name: /request a call back/i })
    .or(page.locator('input[type="submit"][value*="Request a call back" i]'))
    .or(page.locator('button:has-text("Request a call back")'));
    
    await Promise.all([
      // Wait for URL change or response if a full page redirect occurs
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }).catch(() => {}),
      submitButton.click()
    ]);

    // 6. Verify and write to console.log upon reaching the thank you page
    // Checks for typical thank you indicators in the URL or page text
    const currentUrl = page.url();
    const pageText = await page.textContent('body');

    if (currentUrl.includes('thank') || /thank you/i.test(pageText ?? '')) {
      console.log('SUCCESS: Successfully reached the Thank You page!');
      console.log(`Current URL: ${currentUrl}`);
    } else {
      console.log(`Form submitted. Landed on URL: ${currentUrl}`);
    }

  } catch (error) {
    console.error('An error occurred during test execution:', error);
  } finally {
    // Clean up resources
    await browser.close();
    // await new Promise(resolve => browser.on('disconnected', resolve));
  }
});   