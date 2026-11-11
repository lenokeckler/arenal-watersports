import type { SESSION_CLOCK } from "../constants/SessionClock.constants";

export type SessionClockReading =
  | {
      kind: typeof SESSION_CLOCK.LIVE;
      secondsLeft: number;
    }
  | { kind: typeof SESSION_CLOCK.OVER }
  | { kind: typeof SESSION_CLOCK.UNKNOWN };
