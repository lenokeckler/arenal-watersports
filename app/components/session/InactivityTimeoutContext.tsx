"use client";

import React, { createContext, useContext } from "react";
import { useInactivityTimeoutWithWarning } from "./hooks/useInactivityTimeoutWithWarning";
import { InactivityTimeoutContextType } from "./types/InactivityTimeoutContext.type";
import { InactivityTimeoutProviderProps } from "./types/InactivityTimeoutProviderProps.interface";
import { ERRORS } from "@/app/constants";

const InactivityTimeoutContext = createContext<
  InactivityTimeoutContextType | undefined
>(undefined);

export const InactivityTimeoutProvider = ({
  children,
  timeoutMinutes = 30,
  warningMinutes = 5,
  redirectPath,
}: InactivityTimeoutProviderProps) => {
  const inactivityTimeout = useInactivityTimeoutWithWarning(
    {
      timeoutMinutes,
      warningMinutes,
      redirectPath,
    }
  );

  return (
    <InactivityTimeoutContext.Provider
      value={inactivityTimeout}
    >
      {children}
    </InactivityTimeoutContext.Provider>
  );
};

export const useInactivityTimeout =
  (): InactivityTimeoutContextType => {
    const context = useContext(InactivityTimeoutContext);
    if (context === undefined) {
      throw new Error(
        ERRORS.INACTIVITY_TIMEOUT.CONTEXT_NOT_FOUND
      );
    }
    return context;
  };
