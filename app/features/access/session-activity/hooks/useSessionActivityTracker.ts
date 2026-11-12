"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  SESSION_ACTIVITY,
  SESSION_ACTIVITY_EVENTS,
} from "../constants/SessionActivity.constants";
import { SESSION_END_PATH } from "../constants/SessionEndPath.constants";
import { reportSessionActivity } from "../utils/reportSessionActivity";

export const useSessionActivityTracker = (
  onLiveReport: () => Promise<void>
): void => {
  const router = useRouter();
  const lastReportAtRef = useRef(Number.NEGATIVE_INFINITY);

  useEffect(() => {
    const reportWhenDue = async (): Promise<void> => {
      const now = Date.now();

      if (
        now - lastReportAtRef.current <
        SESSION_ACTIVITY.REPORT_INTERVAL_MS
      ) {
        return;
      }

      lastReportAtRef.current = now;
      const sessionEndPath =
        SESSION_END_PATH[await reportSessionActivity()];

      if (sessionEndPath !== null) {
        router.replace(sessionEndPath);

        return;
      }

      await onLiveReport();
    };

    const handleActivity = (event: Event): void => {
      if (
        event.target instanceof Element &&
        event.target.closest(
          SESSION_ACTIVITY.IGNORE_SELECTOR
        )
      ) {
        return;
      }

      void reportWhenDue();
    };

    SESSION_ACTIVITY_EVENTS.forEach((eventName) => {
      window.addEventListener(eventName, handleActivity, {
        passive: true,
      });
    });

    return () => {
      SESSION_ACTIVITY_EVENTS.forEach((eventName) => {
        window.removeEventListener(
          eventName,
          handleActivity
        );
      });
    };
  }, [onLiveReport, router]);
};
