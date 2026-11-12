import type { Locator } from "@playwright/test";
import type { SystemNavigationMode } from "./SystemNavigationMode.type";

export interface SystemNavigationPage {
  capture: (mode: SystemNavigationMode) => Promise<void>;
  getItemSpacingDifference: () => Promise<number>;
  getLink: (label: string) => Locator;
  getLinkHrefs: () => Promise<string[]>;
  getLinks: () => Locator;
  getMenuButton: () => Locator;
  getNavigation: () => Locator;
  goTo: () => Promise<void>;
}
