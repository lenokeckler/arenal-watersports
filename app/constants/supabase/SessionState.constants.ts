export const SESSION_STATE = {
  ENDED: "ended",
  IDLE: "idle",
  LIVE: "live",
} as const;

export type SessionState =
  (typeof SESSION_STATE)[keyof typeof SESSION_STATE];
