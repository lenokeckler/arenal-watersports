"use client";

import { useEffect } from "react";
import type { AppPath } from "@/app/constants";

export const useNoticeUrlCleanerViewModel = (
  cleanPath: AppPath
): void => {
  useEffect(() => {
    window.history.replaceState(
      window.history.state,
      document.title,
      cleanPath
    );
  }, [cleanPath]);
};
