import { E2E_SYSTEM_NAVIGATION_MODES } from "../constants/E2eSystemNavigation.constants";

export type SystemNavigationMode =
  (typeof E2E_SYSTEM_NAVIGATION_MODES)[keyof typeof E2E_SYSTEM_NAVIGATION_MODES];
