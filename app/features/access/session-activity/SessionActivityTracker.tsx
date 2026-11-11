"use client";

import type { NullableRef } from "@/app/types";
import SessionIdleWarning from "./components/SessionIdleWarning";
import { useSessionActivityViewModel } from "./hooks/useSessionActivityViewModel";

const SessionActivityTracker =
  (): NullableRef<React.JSX.Element> => {
    const { warning } = useSessionActivityViewModel();

    return warning === null ? null : (
      <SessionIdleWarning {...warning} />
    );
  };

export default SessionActivityTracker;
