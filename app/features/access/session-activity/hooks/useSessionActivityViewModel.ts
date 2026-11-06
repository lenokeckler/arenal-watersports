"use client";

import type { SessionActivityViewModel } from "../models/SessionActivityViewModel.interface";
import { useSessionActivityTracker } from "./useSessionActivityTracker";
import { useSessionIdleClock } from "./useSessionIdleClock";
import { useSessionIdleSignOut } from "./useSessionIdleSignOut";

export const useSessionActivityViewModel =
  (): SessionActivityViewModel => {
    const { keepWorking, sync, warningSeconds } =
      useSessionIdleClock();
    const { phase, signOut } = useSessionIdleSignOut();

    useSessionActivityTracker(sync);

    return {
      warning:
        warningSeconds === null
          ? null
          : {
              onKeepWorking: () => {
                void keepWorking();
              },
              onSignOut: () => {
                void signOut();
              },
              secondsLeft: warningSeconds,
              signOutPhase: phase,
            },
    };
  };
