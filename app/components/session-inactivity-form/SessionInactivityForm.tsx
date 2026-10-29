"use client";

import { SessionInactivityFormProps } from "./models/SessionInactivityFormProps.interface";
import { useSessionInactivityViewModel } from "./hooks/useSessionInactivityViewModel";
import SessionTimeoutWarning from "../session/warning/SessionTimeoutWarning";

const SessionForm = ({
  children,
  showWarningEnabled,
  refreshOnApiCall,
}: SessionInactivityFormProps) => {
  const {
    hasActiveUser,
    showWarning,
    warningCountdown,
    handleExtendSession,
    handleLogout,
  } = useSessionInactivityViewModel({ refreshOnApiCall });

  return (
    <>
      {children}
      {hasActiveUser && showWarningEnabled && (
        <SessionTimeoutWarning
          isVisible={showWarning}
          onExtend={handleExtendSession}
          onLogout={handleLogout}
          remainingSeconds={warningCountdown}
        />
      )}
    </>
  );
};

export default SessionForm;
