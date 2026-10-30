import { E2E_OUTPUT_DIR } from "./E2eRuntime.constants";

export const E2E_SCREENSHOT_VIEWPORT_ONLY = true;

export const E2E_NEXT_DEV_INDICATOR_SELECTOR =
  "nextjs-portal";

export const E2E_SCREENSHOT_FULL_PAGE = true;

export const E2E_DEV_INDICATOR_HIDING_STYLE =
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
