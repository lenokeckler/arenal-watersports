"use client";

import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { SESSION_STATE } from "@/app/constants";
import { SESSION_CLOCK } from "../constants/SessionClock.constants";
import { SESSION_END_PATH } from "../constants/SessionEndPath.constants";
import type { SessionIdleClock } from "../models/SessionIdleClock.interface";
import type { SessionIdleHandlers } from "../models/SessionIdleHandlers.interface";
import { readSessionSecondsLeft } from "../utils/readSessionSecondsLeft";
import { reportSessionActivity } from "../utils/reportSessionActivity";
import { useSessionIdleCountdown } from "./useSessionIdleCountdown";

const IDLE_PATH = SESSION_END_PATH[SESSION_STATE.IDLE];

export const useSessionIdleClock = (): SessionIdleClock => {
  const router = useRouter();
  const handlersRef = useRef<SessionIdleHandlers>({
    onExpire: () => Promise.resolve(),
    onRecheck: () => Promise.resolve(),
  });
  const { schedule, stop, warningSeconds } =
    useSessionIdleCountdown(handlersRef);

  const sync = useCallback(async (): Promise<void> => {
    const reading = await readSessionSecondsLeft();

    if (reading.kind === SESSION_CLOCK.LIVE) {
      schedule(reading.secondsLeft);
    } else if (
      reading.kind === SESSION_CLOCK.OVER &&
      IDLE_PATH !== null
    ) {
      router.replace(IDLE_PATH);
    }
  }, [router, schedule]);

  const expire = useCallback(async (): Promise<void> => {
    const reading = await readSessionSecondsLeft();

    if (
      reading.kind === SESSION_CLOCK.LIVE &&
      reading.secondsLeft > 0
    ) {
      schedule(reading.secondsLeft);
    } else if (IDLE_PATH !== null) {
      router.replace(IDLE_PATH);
    }
  }, [router, schedule]);

  const keepWorking =
    useCallback(async (): Promise<void> => {
      const endPath =
        SESSION_END_PATH[await reportSessionActivity()];

      if (endPath !== null) {
        router.replace(endPath);

        return;
      }

      await sync();
    }, [router, sync]);

  useEffect(() => {
    handlersRef.current = {
      onExpire: expire,
      onRecheck: sync,
    };
  }, [expire, sync]);

  useEffect(() => {
    const syncWhenVisible = (): void => {
      if (document.visibilityState === "visible") {
        void sync();
      }
    };

    void sync();
    document.addEventListener(
      "visibilitychange",
      syncWhenVisible
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        syncWhenVisible
      );
      stop();
    };
  }, [stop, sync]);

  return { keepWorking, sync, warningSeconds };
};
