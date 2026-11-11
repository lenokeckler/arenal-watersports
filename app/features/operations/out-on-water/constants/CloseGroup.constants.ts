export const CLOSE_GROUP_ERROR = {
  CLOSE_GROUP: "close a dispatched group",
  INVALID_INPUT: "The group closing is not valid.",
  LOAD_RETURN_UNITS: "load the units of a group to close",
} as const;

export const CLOSE_GROUP_DATABASE_ERROR = {
  ALREADY_CLOSED: "55000",
  INVALID_ARRIVAL: "22023",
  INVALID_RETURNS: "23514",
} as const;

export const CLOSE_GROUP_STATUS = {
  ALREADY_CLOSED: "already_closed",
  CLOSED: "closed",
  INVALID_ARRIVAL: "invalid_arrival",
  INVALID_RETURNS: "invalid_returns",
} as const;

export const CLOSE_GROUP_DAMAGE_CAUSE = {
  COLLISION: "collision",
  MACHINE_FAILURE: "machine_failure",
  OTHER: "other",
  ROLLOVER: "rollover",
} as const;

export const CLOSE_GROUP_LIMITS = {
  DESCRIPTION_MAX_LENGTH: 500,
  IMPACT_MAX: 9999,
} as const;

export const CLOSE_GROUP_ARRIVAL_TIME = {
  MS_PER_MINUTE: 60_000,
  TOLERANCE_MS: 60_000,
} as const;

export const CLOSE_GROUP_PHASE = {
  FAILED: "failed",
  LOADING: "loading",
  READY: "ready",
} as const;
