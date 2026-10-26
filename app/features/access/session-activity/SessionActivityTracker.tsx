"use client";

import { useSessionActivityTracker } from "./hooks/useSessionActivityTracker";
import { useSessionIdleClock } from "./hooks/useSessionIdleClock";

const SessionActivityTracker = (): null => {
  const { sync } = useSessionIdleClock();

  useSessionActivityTracker(sync);

  return null;
};

export default SessionActivityTracker;
