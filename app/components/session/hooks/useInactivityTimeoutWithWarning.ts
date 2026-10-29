"use client";

import {
  useEffect,
  useRef,
  useCallback,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/app/services/supabase/client";
import {
  BROWSER_EVENTS,
  PATHS,
  SESSION_TIMEOUT_WARNING_MODAL,
} from "@/app/constants";
import type {
  InactivityTimeoutWithWarning,
  UseInactivityTimeoutWithWarningProps,
} from "./useInactivityTimeoutWithWarning.interface";

export const useInactivityTimeoutWithWarning = ({
  timeoutMinutes = 30,
  warningMinutes = 5,
  onTimeout,
  redirectPath = PATHS.ACCESS.LOGIN,
}: UseInactivityTimeoutWithWarningProps = {}): InactivityTimeoutWithWarning => {
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const warningRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<number>(0);

  const [showWarning, setShowWarning] = useState(false);
  const [warningCountdown, setWarningCountdown] = useState(
    warningMinutes * 60
  );

  useEffect(() => {
    lastActivityRef.current = Date.now();
  }, []);

  const clearAllTimeouts = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (warningRef.current) {
      clearTimeout(warningRef.current);
      warningRef.current = null;
    }
  }, []);

  const resetTimeout = useCallback(() => {
    lastActivityRef.current = Date.now();
    setShowWarning(false);
    clearAllTimeouts();

    warningRef.current = setTimeout(
      () => {
        setShowWarning(true);
        setWarningCountdown(warningMinutes * 60);
      },
      (timeoutMinutes - warningMinutes) * 60 * 1000
    );

    timeoutRef.current = setTimeout(
      async () => {
        try {
          if (onTimeout) {
            onTimeout();
          }
          await createBrowserSupabaseClient().auth.signOut();
          router.push(redirectPath);
        } catch {
          router.push(redirectPath);
        }
      },
      timeoutMinutes * 60 * 1000
    );
  }, [
    timeoutMinutes,
    warningMinutes,
    onTimeout,
    router,
    redirectPath,
    clearAllTimeouts,
  ]);

  const handleActivity = useCallback(
    (event: Event) => {
      const target = event.target;
      if (
        target instanceof Element &&
        target.closest(
          `[data-modal="${SESSION_TIMEOUT_WARNING_MODAL.ID}"]`
        )
      ) {
        return;
      }
      resetTimeout();
    },
    [resetTimeout]
  );

  const handleExtendSession = useCallback(() => {
    lastActivityRef.current = Date.now();
    setShowWarning(false);
    clearAllTimeouts();

    warningRef.current = setTimeout(
      () => {
        setShowWarning(true);
        setWarningCountdown(warningMinutes * 60);
      },
      (timeoutMinutes - warningMinutes) * 60 * 1000
    );

    timeoutRef.current = setTimeout(
      async () => {
        try {
          if (onTimeout) {
            onTimeout();
          }
          await createBrowserSupabaseClient().auth.signOut();
          router.push(redirectPath);
        } catch {
          router.push(redirectPath);
        }
      },
      timeoutMinutes * 60 * 1000
    );
  }, [
    timeoutMinutes,
    warningMinutes,
    onTimeout,
    router,
    redirectPath,
    clearAllTimeouts,
  ]);

  const handleLogout = useCallback(async () => {
    try {
      await createBrowserSupabaseClient().auth.signOut();
      router.push(redirectPath);
    } catch {
      router.push(redirectPath);
    }
  }, [router, redirectPath]);

  useEffect(() => {
    const events = [
      BROWSER_EVENTS.MOUSEDOWN,
      BROWSER_EVENTS.MOUSEMOVE,
      BROWSER_EVENTS.KEYPRESS,
      BROWSER_EVENTS.SCROLL,
      BROWSER_EVENTS.TOUCHSTART,
      BROWSER_EVENTS.CLICK,
    ];

    events.forEach((event) => {
      document.addEventListener(
        event,
        handleActivity,
        true
      );
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(
          event,
          handleActivity,
          true
        );
      });
      clearAllTimeouts();
    };
  }, [handleActivity, clearAllTimeouts]);

  useEffect(() => {
    const timer = setTimeout(() => {
      resetTimeout();
    }, 0);
    return () => clearTimeout(timer);
  }, [resetTimeout]);

  const refreshTimeout = useCallback(() => {
    resetTimeout();
  }, [resetTimeout]);

  return {
    showWarning,
    warningCountdown,
    handleExtendSession,
    handleLogout,
    refreshTimeout,
  };
};
