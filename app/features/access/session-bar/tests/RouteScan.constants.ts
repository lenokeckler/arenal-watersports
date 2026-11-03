import { E2E_SYSTEM_ROUTES } from "@/e2e/constants/E2eSessionBarPresence.constants";
import { PRE_LOGIN_ROUTES } from "@/e2e/support/preLoginScreens";

export const APP_ROOT_DIRECTORY = "app";

export const CURRENT_DIRECTORY_SEGMENT = ".";

export const PAGE_FILE_NAME = "page.tsx";

export const ROUTE_GROUP_PATTERN = /^\(.*\)$/;

export const ROUTE_SEPARATOR = "/";

export const EXCLUDED_PAGE_ROUTES: readonly string[] = [
  "/reservations/[reservationId]",
  "/administration/categories/[categoryId]/alerts",
  "/administration/categories/[categoryId]/behavior",
  "/administration/categories/[categoryId]/deposit",
  "/administration/categories/[categoryId]/units",
  "/administration/categories/[categoryId]/units/[unitId]",
  "/administration/categories/[categoryId]/units/new",
];

export const CLASSIFIED_PAGE_ROUTES: readonly string[] = [
  ...E2E_SYSTEM_ROUTES,
  ...PRE_LOGIN_ROUTES,
  ...EXCLUDED_PAGE_ROUTES,
];
