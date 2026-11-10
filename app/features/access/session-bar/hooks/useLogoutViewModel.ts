"use client";

import { useState } from "react";
import { LOGOUT_ERROR_MESSAGE } from "../constants/LogoutErrorMessage.constants";
import { LOGOUT_PENDING_ANNOUNCEMENT } from "../constants/LogoutPendingAnnouncement.constants";
import { LOGOUT_PHASE } from "../constants/LogoutPhase.constants";
import type { LogoutPhase } from "../models/LogoutPhase.type";
import type { LogoutViewModel } from "../models/LogoutViewModel.interface";
import { useLogoutConfirmReset } from "./useLogoutConfirmReset";
import { useLogoutSignOut } from "./useLogoutSignOut";

export const useLogoutViewModel = (): LogoutViewModel => {
  const [phase, setPhase] = useState<LogoutPhase>(
    LOGOUT_PHASE.IDLE
  );
  const confirmReset = useLogoutConfirmReset(() =>
    setPhase(LOGOUT_PHASE.IDLE)
  );
  const signOut = useLogoutSignOut(setPhase);

  const askConfirmation = (): void => {
    setPhase(LOGOUT_PHASE.CONFIRMING);
    confirmReset.arm();
  };

  const confirmSignOut = (): void => {
    confirmReset.disarm();
    void signOut();
  };

  const pressByPhase: Record<LogoutPhase, () => void> = {
    [LOGOUT_PHASE.IDLE]: askConfirmation,
    [LOGOUT_PHASE.CONFIRMING]: confirmSignOut,
    [LOGOUT_PHASE.PENDING]: () => undefined,
    [LOGOUT_PHASE.FAILED]: askConfirmation,
  };

  return {
    phase,
    handlePress: pressByPhase[phase],
    errorMessage: LOGOUT_ERROR_MESSAGE[phase],
    pendingAnnouncement: LOGOUT_PENDING_ANNOUNCEMENT[phase],
  };
};
