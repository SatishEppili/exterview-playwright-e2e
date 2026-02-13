import { BrowserContext } from '@playwright/test';

export async function fetchOtp(context: BrowserContext, email: string) {
  const page = await context.newPage();
  const username = email.split('@')[0];

  // ✅ Correct direct login URL
  await page.goto(`https://yopmail.com/en/?login=${username}`);

  // Wait for inbox frame
  await page.waitForSelector('iframe[name="ifinbox"]', { timeout: 20000 });

  const inboxFrame = page.frame({ name: 'ifinbox' });
  if (!inboxFrame) throw new Error('Inbox frame not found');

  // Click first email
  await inboxFrame.locator('div.m').first().click();

  // Wait for mail content frame
  const mailFrame = page.frame({ name: 'ifmail' });
  if (!mailFrame) throw new Error('Mail frame not found');

  await mailFrame.waitForSelector('body');

  const text = await mailFrame.locator('body').innerText();

  console.log('EMAIL TEXT:', text);

  const otpMatch = text.match(/\b\d{6}\b/);

  if (!otpMatch) throw new Error('OTP not found');

  await page.close();

  return otpMatch[0];
}

