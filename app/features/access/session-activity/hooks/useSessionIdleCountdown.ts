"use client";

import {
  useCallback,
  useRef,
  useState,
  type RefObject,
} from "react";
import type { NullableRef } from "@/app/types";
import { SESSION_ACTIVITY } from "../constants/SessionActivity.constants";
import type { SessionIdleCountdown } from "../models/SessionIdleCountdown.interface";
import type { SessionIdleHandlers } from "../models/SessionIdleHandlers.interface";

const secondsUntil = (endsAt: number): number =>
  Math.max(
    0,
    Math.ceil(
      (endsAt - Date.now()) / SESSION_ACTIVITY.MS_PER_SECOND
    )
  );

export const useSessionIdleCountdown = (
  handlersRef: RefObject<SessionIdleHandlers>
): SessionIdleCountdown => {
  const [warningSeconds, setWarningSeconds] =
    useState<NullableRef<number>>(null);
  const timeoutRef =
    useRef<NullableRef<ReturnType<typeof setTimeout>>>(
      null
    );
  const intervalRef =
    useRef<NullableRef<ReturnType<typeof setInterval>>>(
      null
    );

  const stop = useCallback((): void => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startCountdown = useCallback(
    (secondsLeft: number): void => {
      const endsAt =
        Date.now() +
        secondsLeft * SESSION_ACTIVITY.MS_PER_SECOND;

      setWarningSeconds(secondsLeft);
      intervalRef.current = setInterval(() => {
        const remaining = secondsUntil(endsAt);

        setWarningSeconds(remaining);

        if (remaining === 0) {
          stop();
          void handlersRef.current.onExpire();
        }
      }, SESSION_ACTIVITY.COUNTDOWN_TICK_MS);
    },
    [handlersRef, stop]
  );

  const schedule = useCallback(
    (secondsLeft: number): void => {
      stop();

      if (
        secondsLeft <= SESSION_ACTIVITY.WARNING_LEAD_SECONDS
      ) {
        startCountdown(secondsLeft);

        return;
      }

      setWarningSeconds(null);
      timeoutRef.current = setTimeout(
        () => {
          void handlersRef.current.onRecheck();
        },
        (secondsLeft -
          SESSION_ACTIVITY.WARNING_LEAD_SECONDS) *
          SESSION_ACTIVITY.MS_PER_SECOND
      );
    },
    [handlersRef, startCountdown, stop]
  );

  return { schedule, stop, warningSeconds };
};
