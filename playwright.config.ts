import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  timeout: 120 * 1000,

  fullyParallel: false,
  workers: 1,

  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],

  use: {
    ...devices['Desktop Chrome'],
    baseURL: 'https://app.exterview.ai',
    headless: false,
    viewport: { width: 1280, height: 800 },
    screenshot: 'on',
    video: 'on',
    trace: 'on',

    permissions: [
      'clipboard-read',
      'clipboard-write',
      'camera',
      'microphone'
    ],
    launchOptions: {
      args: [
        '--use-fake-ui-for-media-stream',
        '--use-fake-device-for-media-stream',
        '--allow-file-access-from-files',
        '--use-fake-mjpeg-decode-accelerator'
      ]

    }
  }
});
