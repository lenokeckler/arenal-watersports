"use client";

import { useEffect } from "react";

export const useNoticeUrlCleanerViewModel = (
  cleanPath: string
): void => {
  useEffect(() => {
    window.history.replaceState(
      window.history.state,
      document.title,
      cleanPath
    );
  }, [cleanPath]);
};
