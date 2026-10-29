"use client";

import SessionBarView from "./SessionBarView";
import { useLogoutViewModel } from "./hooks/useLogoutViewModel";

const SessionBar = (): React.JSX.Element => {
  const {
    phase,
    handlePress,
    errorMessage,
    pendingAnnouncement,
  } = useLogoutViewModel();

  return (
    <SessionBarView
      phase={phase}
      handlePress={handlePress}
      errorMessage={errorMessage}
      pendingAnnouncement={pendingAnnouncement}
    />
  );
};

export default SessionBar;
