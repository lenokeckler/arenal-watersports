import { SUPABASE_RPC } from "@/app/constants";
import { SESSION_IDLE_WARNING_COPY } from "@/app/features/access/session-activity/constants/SessionIdleWarningCopy.constants";

export const E2E_SESSION_IDLE_WARNING_COPY = {
  KEEP_WORKING: SESSION_IDLE_WARNING_COPY.KEEP_WORKING,
  SIGN_OUT: SESSION_IDLE_WARNING_COPY.SIGN_OUT,
  TITLE: SESSION_IDLE_WARNING_COPY.TITLE,
} as const;

export const E2E_SESSION_IDLE_WARNING_RPC = {
  SECONDS_LEFT: `**/rest/v1/rpc/${SUPABASE_RPC.CURRENT_SESSION_SECONDS_LEFT}`,
  TOUCH: `**/rest/v1/rpc/${SUPABASE_RPC.TOUCH_CURRENT_SESSION_ACTIVITY}`,
} as const;

export const E2E_SESSION_IDLE_WARNING_SECONDS = {
  INSIDE_THE_WARNING: 119,
  ABOUT_TO_END: 3,
  SHOWN_INSIDE_THE_WARNING: "1:59",
} as const;

export const E2E_SESSION_IDLE_WARNING_SCREENSHOT_BASENAME =
  {
    WARNING: "01-session-idle-warning",
  } as const;
