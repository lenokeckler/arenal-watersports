"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { attemptSignOutThisDevice } from "@/app/services/authentication/attemptSignOutThisDevice";
import { buildLoginSignedOutPath } from "@/app/utils/pathname/buildLoginSignedOutPath";
import { SESSION_IDLE_SIGN_OUT_PHASE } from "../constants/SessionIdleSignOutPhase.constants";
import type { SessionIdleSignOut } from "../models/SessionIdleSignOut.interface";
import type { SessionIdleSignOutPhase } from "../models/SessionIdleSignOutPhase.type";

export const useSessionIdleSignOut =
  (): SessionIdleSignOut => {
    const router = useRouter();
    const isSigningOutRef = useRef(false);
    const [phase, setPhase] =
      useState<SessionIdleSignOutPhase>(
        SESSION_IDLE_SIGN_OUT_PHASE.IDLE
      );

    const signOut = useCallback(async (): Promise<void> => {
      if (isSigningOutRef.current) {
        return;
      }

      isSigningOutRef.current = true;
      setPhase(SESSION_IDLE_SIGN_OUT_PHASE.PENDING);

      if (await attemptSignOutThisDevice()) {
        router.replace(buildLoginSignedOutPath());

        return;
      }

      isSigningOutRef.current = false;
      setPhase(SESSION_IDLE_SIGN_OUT_PHASE.FAILED);
    }, [router]);

    return { phase, signOut };
  };
