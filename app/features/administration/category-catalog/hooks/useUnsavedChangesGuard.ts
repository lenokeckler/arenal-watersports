"use client";

import { useEffect } from "react";
import { BROWSER_EVENTS } from "@/app/constants";

const blockUnload = (event: BeforeUnloadEvent): void => {
  event.preventDefault();
};

export const useUnsavedChangesGuard = (
  hasUnsavedChanges: boolean
): void => {
  useEffect(() => {
    if (hasUnsavedChanges) {
      window.addEventListener(
        BROWSER_EVENTS.BEFORE_UNLOAD,
        blockUnload
      );
    }

    return () =>
      window.removeEventListener(
        BROWSER_EVENTS.BEFORE_UNLOAD,
        blockUnload
      );
  }, [hasUnsavedChanges]);
};
