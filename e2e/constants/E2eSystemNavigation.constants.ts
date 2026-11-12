import {
  ARIA_CURRENT,
  ARIA_ROLE,
  KEYBOARD,
  PATHS,
} from "@/app/constants";
import { SYSTEM_NAVIGATION_COPY } from "@/app/features/access/system-navigation/constants/SystemNavigationCopy.constants";
import type { SystemNavigationMode } from "../models/SystemNavigationMode.type";
import { E2E_VIEWPORT } from "./E2eRuntime.constants";

export const E2E_SYSTEM_NAVIGATION_SCREENSHOT_BASENAME = {
  administration:
    "us-tab-04-bottom-navigation-administration",
  operations: "us-tab-04-bottom-navigation-operations",
  reservations: "us-tab-04-bottom-navigation-reservations",
} as const;

export const E2E_SYSTEM_NAVIGATION_MODES = {
  ADMINISTRATION: "administration",
  OPERATIONS: "operations",
  RESERVATIONS: "reservations",
} as const;

export const E2E_SYSTEM_NAVIGATION_EXPECTED_LINKS = {
  ADMINISTRATION: [
    {
      href: PATHS.ADMINISTRATION.CATEGORIES,
      label: SYSTEM_NAVIGATION_COPY.INVENTORY,
    },
    {
      href: PATHS.ADMINISTRATION.EXTRAS,
      label: SYSTEM_NAVIGATION_COPY.EXTRAS,
    },
    {
      href: PATHS.ADMINISTRATION.WORKER_AREAS,
      label: SYSTEM_NAVIGATION_COPY.WORKERS,
    },
    {
      href: PATHS.ADMINISTRATION.INCOME,
      label: SYSTEM_NAVIGATION_COPY.INCOME,
    },
    {
      href: PATHS.ADMINISTRATION.DEPOSITS,
      label: SYSTEM_NAVIGATION_COPY.REPORTS,
    },
  ],
  BOARD_LABEL: SYSTEM_NAVIGATION_COPY.BOARD,
  CALENDAR_LABEL: SYSTEM_NAVIGATION_COPY.CALENDAR,
  BOARD: PATHS.BOARD,
  HISTORY: PATHS.HISTORY.ROOT,
  HISTORY_LABEL: SYSTEM_NAVIGATION_COPY.HISTORY,
  INVENTORY_LABEL: SYSTEM_NAVIGATION_COPY.INVENTORY,
  OPERATIONS_CALENDAR: PATHS.OPERATIONS.CALENDAR,
  OPERATIONS_INVENTORY: PATHS.OPERATIONS.INVENTORY,
  RESERVATIONS_CALENDAR: PATHS.RESERVATIONS.CALENDAR,
} as const;

export const E2E_SYSTEM_NAVIGATION_KEY = {
  ENTER: KEYBOARD.ENTER,
} as const;

export const E2E_SYSTEM_NAVIGATION_ARIA = {
  BUTTON: ARIA_ROLE.BUTTON,
  CURRENT_PAGE: ARIA_CURRENT.PAGE,
  LINK: ARIA_ROLE.LINK,
  NAVIGATION: ARIA_ROLE.NAVIGATION,
} as const;

export const E2E_SYSTEM_NAVIGATION_TOLERANCE_PX = {
  EDGE_SPACING: 2,
} as const;

export const E2E_SYSTEM_NAVIGATION_MEASUREMENT = {
  ITEM_SPACING: "measure system navigation item spacing",
  NOT_ENOUGH_ITEMS:
    "the navigation has fewer than two items",
  NOT_LAID_OUT:
    "the navigation or its controls have no size",
} as const;

export const resolveSystemNavigationScreenshotName = (
  mode: SystemNavigationMode,
  viewport: (typeof E2E_VIEWPORT)[keyof typeof E2E_VIEWPORT]
): string =>
  `${E2E_SYSTEM_NAVIGATION_SCREENSHOT_BASENAME[mode]}-${viewport}.png`;
