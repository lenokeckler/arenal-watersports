"use client";

import { useEffect } from "react";
import { KEYBOARD } from "@/app/constants";

export const useCloseOnEscape = (
  onClose: () => void
): void => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === KEYBOARD.ESCAPE) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [onClose]);
};
