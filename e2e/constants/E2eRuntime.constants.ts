export const E2E_SERVER = {
  COMMAND: "npm run dev -- --port 3100",
  HOST: "http://localhost",
  PORT: 3100,
  STARTUP_TIMEOUT_MS: 240_000,
} as const;

export const E2E_BASE_URL = `${E2E_SERVER.HOST}:${E2E_SERVER.PORT}`;

export const E2E_DESKTOP_VIEWPORT = {
  height: 900,
  width: 1440,
} as const;

export const E2E_TIMEOUT_MS = {
  ACTION: 20_000,
  EXPECT: 20_000,
  NAVIGATION: 60_000,
  POST_SUBMIT: 90_000,
  TEST: 120_000,
} as const;

export const E2E_RETRY_COUNT = {
  CI: 2,
  LOCAL: 0,
} as const;

export const E2E_WORKER_COUNT = {
  CI: 1,
} as const;

export const E2E_OUTPUT_DIR = {
  ARTIFACTS: "playwright-artifacts",
  REPORT: "playwright-report",
  SCREENSHOTS: "playwright-screenshots",
} as const;

export const E2E_DEVICE_NAME = {
  DESKTOP: "Desktop Chrome",
  MOBILE: "Pixel 7",
} as const;

export const E2E_PROJECT = {
  DEFAULT: "chromium-desktop",
  MOBILE: "chromium-mobile",
  SCREENSHOTS: "chromium-desktop-screenshots",
  SCREENSHOTS_MOBILE: "chromium-mobile-screenshots",
} as const;

export const E2E_TEST_MATCH = {
  DEFAULT: "**/specs/*.e2e.ts",
  SCREENSHOTS: "**/screenshots/*.screenshots.ts",
} as const;

export const E2E_TEST_DIR = "./e2e";

export const E2E_REPORTER = {
  HTML: "html",
  LIST: "list",
} as const;

export const E2E_HTML_REPORT_OPEN_MODE = "never";

export const E2E_ARTIFACT_MODE = {
  SCREENSHOT_ON_FAILURE: "only-on-failure",
  TRACE_ON_FAILURE: "retain-on-failure",
} as const;

export const HEADING_LEVEL = {
  PAGE: 1,
} as const;

export const E2E_CONTROLS_SELECTOR = (id: string): string =>
  `[aria-controls="${id}"]`;

export const E2E_KEY = {
  ENTER: "Enter",
} as const;
