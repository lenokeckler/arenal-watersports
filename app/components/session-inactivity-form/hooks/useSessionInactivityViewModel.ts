"use client";

import { useEffect } from "react";
import { SessionInactivityFormViewModel } from "../models/SessionInactivityFormViewModel.interface";
import { useInactivityTimeout } from "../../session/InactivityTimeoutContext";
import { UseSessionInactivityViewModelProps } from "../models/UseSessionInactivityViewModelProps.interface";
import { useSessionStore } from "@/app/components/session/hooks/useSessionStore";

export const useSessionInactivityViewModel = ({
  refreshOnApiCall,
}: UseSessionInactivityViewModelProps): SessionInactivityFormViewModel => {
  const { hasActiveUser } = useSessionStore();

  const {
    refreshTimeout,
    showWarning,
    warningCountdown,
    handleExtendSession,
    handleLogout,
  } = useInactivityTimeout();

  useEffect(() => {
    if (refreshOnApiCall) {
      refreshTimeout();
    }
  }, [refreshOnApiCall, refreshTimeout]);

  return {
    hasActiveUser,
    showWarning,
    warningCountdown,
    handleExtendSession,
    handleLogout,
  };
};
