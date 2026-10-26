import type { SESSION_IDLE_SIGN_OUT_PHASE } from "../constants/SessionIdleSignOutPhase.constants";

export type SessionIdleSignOutPhase =
  (typeof SESSION_IDLE_SIGN_OUT_PHASE)[keyof typeof SESSION_IDLE_SIGN_OUT_PHASE];
