import type { MouseEvent } from "react";
import type { HistoryAwareWindow } from "../models/HistoryAwareWindow.interface";

const opensElsewhere = (event: MouseEvent): boolean =>
  event.ctrlKey ||
  event.metaKey ||
  event.shiftKey ||
  event.altKey;

export const useScreenBack = () => {
  const handleBack = (event: MouseEvent): void => {
    const { navigation } =
      window as unknown as HistoryAwareWindow;

    if (!navigation?.canGoBack || opensElsewhere(event)) {
      return;
    }

    event.preventDefault();
    window.history.back();
  };

  return { handleBack };
};
