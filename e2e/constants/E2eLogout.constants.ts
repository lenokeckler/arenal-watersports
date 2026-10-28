import { LOGOUT_COPY } from "@/app/features/access/session-bar/constants/LogoutCopy.constants";

export const E2E_LOGOUT_COPY = {
  BUTTON: LOGOUT_COPY.BUTTON,
  CONFIRM: LOGOUT_COPY.CONFIRM,
} as const;

const CONFIRM_WINDOW_MS = 5000;

export const E2E_LOGOUT_CLOCK = {
  START: new Date("2026-01-01T12:00:00Z"),
  PAUSE_AT: new Date("2026-01-01T12:00:01Z"),
  ONE_MS: 1,
  BEFORE_RESET_MS: CONFIRM_WINDOW_MS - 1,
} as const;

export const E2E_LOGOUT_BAR_COUNT = {
  ABSENT: 0,
} as const;
