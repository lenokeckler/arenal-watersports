import { defineConfig, devices } from "@playwright/test";
import {
  E2E_ARTIFACT_MODE,
  E2E_BASE_URL,
  E2E_DESKTOP_VIEWPORT,
  E2E_DEVICE_NAME,
  E2E_HTML_REPORT_OPEN_MODE,
  E2E_OUTPUT_DIR,
  E2E_PROJECT,
  E2E_REPORTER,
  E2E_RETRY_COUNT,
  E2E_SERVER,
  E2E_TEST_DIR,
  E2E_TEST_MATCH,
  E2E_TIMEOUT_MS,
  E2E_WORKER_COUNT,
} from "./e2e/constants/E2eRuntime.constants";
import { E2E_RECOVERY_SERVER_ENV } from "./e2e/constants/E2ePasswordRecovery.constants";

const isContinuousIntegration = Boolean(process.env.CI);
const mobileChromium = {
  ...devices[E2E_DEVICE_NAME.MOBILE],
};
const desktopChromium = {
  ...devices[E2E_DEVICE_NAME.DESKTOP],
  viewport: E2E_DESKTOP_VIEWPORT,
};

export default defineConfig({
  testDir: E2E_TEST_DIR,
  timeout: E2E_TIMEOUT_MS.TEST,
  expect: { timeout: E2E_TIMEOUT_MS.EXPECT },
  fullyParallel: true,
  forbidOnly: isContinuousIntegration,
  retries: isContinuousIntegration
    ? E2E_RETRY_COUNT.CI
    : E2E_RETRY_COUNT.LOCAL,
  workers: isContinuousIntegration
    ? E2E_WORKER_COUNT.CI
    : undefined,
  outputDir: E2E_OUTPUT_DIR.ARTIFACTS,
  reporter: [
    [E2E_REPORTER.LIST],
    [
      E2E_REPORTER.HTML,
      {
        open: E2E_HTML_REPORT_OPEN_MODE,
        outputFolder: E2E_OUTPUT_DIR.REPORT,
      },
    ],
  ],
  use: {
    actionTimeout: E2E_TIMEOUT_MS.ACTION,
    baseURL: E2E_BASE_URL,
    navigationTimeout: E2E_TIMEOUT_MS.NAVIGATION,
    screenshot: E2E_ARTIFACT_MODE.SCREENSHOT_ON_FAILURE,
    trace: E2E_ARTIFACT_MODE.TRACE_ON_FAILURE,
  },
  projects: [
    {
      name: E2E_PROJECT.MOBILE,
      testIgnore: E2E_TEST_MATCH.ADMIN_RECOVERY,
      testMatch: E2E_TEST_MATCH.DEFAULT,
      use: mobileChromium,
    },
    {
      name: E2E_PROJECT.DEFAULT,
      testIgnore: E2E_TEST_MATCH.ADMIN_RECOVERY,
      testMatch: E2E_TEST_MATCH.DEFAULT,
      use: desktopChromium,
    },
    {
      name: E2E_PROJECT.ADMIN_RECOVERY,
      dependencies: [
        E2E_PROJECT.MOBILE,
        E2E_PROJECT.DEFAULT,
      ],
      fullyParallel: false,
      testMatch: E2E_TEST_MATCH.ADMIN_RECOVERY,
      use: mobileChromium,
      workers: E2E_WORKER_COUNT.ADMIN_RECOVERY,
    },
    {
      name: E2E_PROJECT.SCREENSHOTS_MOBILE,
      testMatch: E2E_TEST_MATCH.SCREENSHOTS,
      use: mobileChromium,
    },
    {
      name: E2E_PROJECT.SCREENSHOTS,
      testMatch: E2E_TEST_MATCH.SCREENSHOTS,
      use: desktopChromium,
    },
  ],
  webServer: {
    command: E2E_SERVER.COMMAND,
    env: { ...E2E_RECOVERY_SERVER_ENV },
    reuseExistingServer: !isContinuousIntegration,
    timeout: E2E_SERVER.STARTUP_TIMEOUT_MS,
    url: E2E_BASE_URL,
  },
});
