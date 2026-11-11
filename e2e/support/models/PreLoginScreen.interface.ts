import type { Locator, Page } from "@playwright/test";

export interface PreLoginScreen {
  route: string;
  open: (page: Page) => Promise<void>;
  getReadyMarker: (page: Page) => Locator;
}
