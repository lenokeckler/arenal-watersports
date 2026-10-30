"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { LOGOUT_PHASE } from "../constants/LogoutPhase.constants";
import type { SetLogoutPhase } from "../models/SetLogoutPhase.type";
import { attemptSignOutThisDevice } from "@/app/services/authentication/attemptSignOutThisDevice";
import { buildLoginSignedOutPath } from "@/app/utils/pathname/buildLoginSignedOutPath";

export const useLogoutSignOut = (
  setPhase: SetLogoutPhase
): (() => Promise<void>) => {
  const router = useRouter();
  const isSigningOutRef = useRef(false);

  return async (): Promise<void> => {
    if (isSigningOutRef.current) {
      return;
    }

    isSigningOutRef.current = true;
    setPhase(LOGOUT_PHASE.PENDING);

    if (await attemptSignOutThisDevice()) {
      router.replace(buildLoginSignedOutPath());

      return;
    }

    isSigningOutRef.current = false;
    setPhase(LOGOUT_PHASE.FAILED);
  };
};
