import {
  SESSION_STATE,
  type SessionState,
} from "@/app/constants";

const SESSION_STATES: readonly unknown[] =
  Object.values(SESSION_STATE);

export const isSessionState = (
  value: unknown
): value is SessionState => SESSION_STATES.includes(value);
