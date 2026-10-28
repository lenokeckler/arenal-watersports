import { E2E_OUTPUT_DIR } from "./E2eRuntime.constants";

export const E2E_SCREENSHOT_VIEWPORT_ONLY = false;

export const E2E_SCREENSHOT_CAPTURE_STYLE =
  "nextjs-portal { display: none !important; }";

export const E2E_SCREENSHOT_EXTENSION = ".png";

export const resolveScreenshotPath = (
  fileName: string
): string => `${E2E_OUTPUT_DIR.SCREENSHOTS}/${fileName}`;

export const resolveDeviceScreenshotFileName = (
  baseName: string,
  projectName: string
): string =>
  `${baseName}-${projectName}${E2E_SCREENSHOT_EXTENSION}`;
