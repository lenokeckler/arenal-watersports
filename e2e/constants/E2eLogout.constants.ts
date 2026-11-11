import { LOGOUT_COPY } from "@/app/features/access/session-bar/constants/LogoutCopy.constants";

export const E2E_LOGOUT_COPY = {
  BUTTON: LOGOUT_COPY.BUTTON,
  CONFIRM: LOGOUT_COPY.CONFIRM,
  PENDING: LOGOUT_COPY.PENDING,
  ERROR: LOGOUT_COPY.ERROR,
} as const;

const CONFIRM_WINDOW_MS = 5000;

export const E2E_LOGOUT_CLOCK = {
  START: new Date("2026-01-01T12:00:00Z"),
  PAUSE_DELAY_MS: 1000,
  ONE_MS: 1,
  BEFORE_RESET_MS: CONFIRM_WINDOW_MS - 1,
} as const;

export const E2E_LOGOUT_BAR_COUNT = {
  ABSENT: 0,
} as const;

export const E2E_LOGOUT_SCREENSHOT_BASENAME = {
  HOME_WITH_BAR: "01-logout-home-with-bar",
  PROFILE_WITH_BAR: "02-logout-profile-with-bar",
  CONFIRM_STEP: "03-logout-confirm-step",
  PENDING_STEP: "04-logout-pending-step",
  LOGIN_AFTER_SIGN_OUT: "05-logout-login-after-sign-out",
} as const;
