import { test } from '@playwright/test';
import { login } from '../utils/loginHelper';

test('Login Flow', async ({ page }) => {
  await login(page);
});
