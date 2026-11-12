import type {
  BrowserContext,
  Page,
} from "@playwright/test";

export interface SecondDeviceSession {
  context: BrowserContext;
  page: Page;
}
