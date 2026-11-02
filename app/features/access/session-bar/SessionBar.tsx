"use client";

import SessionBarView from "./SessionBarView";
import { useLogoutViewModel } from "./hooks/useLogoutViewModel";
import { useThemeViewModel } from "./hooks/useThemeViewModel";

const SessionBar = (): React.JSX.Element => {
  const {
    phase,
    handlePress,
    errorMessage,
    pendingAnnouncement,
  } = useLogoutViewModel();
  const { theme, handleToggle } = useThemeViewModel();

  return (
    <SessionBarView
      phase={phase}
      handlePress={handlePress}
      errorMessage={errorMessage}
      pendingAnnouncement={pendingAnnouncement}
      theme={theme}
      handleToggle={handleToggle}
    />
  );
};

export default SessionBar;
