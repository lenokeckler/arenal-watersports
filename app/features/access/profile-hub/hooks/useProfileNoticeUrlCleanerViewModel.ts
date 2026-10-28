"use client";

import { useEffect } from "react";
import { PATHS } from "@/app/constants";

export const useProfileNoticeUrlCleanerViewModel =
  (): void => {
    useEffect(() => {
      window.history.replaceState(
        window.history.state,
        document.title,
        PATHS.PROFILE.ROOT
      );
    }, []);
  };
