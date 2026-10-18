import { LOGOUT_CONFIRM_RESET_MS } from "@/app/features/access/session-bar/constants/LogoutConfirm.constants";
import { LOGOUT_COPY } from "@/app/features/access/session-bar/constants/LogoutCopy.constants";

export const E2E_LOGOUT_COPY = {
  BUTTON: LOGOUT_COPY.BUTTON,
  CONFIRM: LOGOUT_COPY.CONFIRM,
} as const;

const CONFIRM_WAIT_MARGIN_MS = 1000;

export const E2E_LOGOUT_CONFIRM_WAIT_MS =
  LOGOUT_CONFIRM_RESET_MS + CONFIRM_WAIT_MARGIN_MS;

export const E2E_LOGOUT_BAR_COUNT = {
  ABSENT: 0,
} as const;
