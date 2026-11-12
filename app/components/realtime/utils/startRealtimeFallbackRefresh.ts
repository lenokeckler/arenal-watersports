import { REALTIME } from "../constants/Realtime.constants";
import type { RealtimeRefreshCallback } from "../models/RealtimeRefreshCallback.type";

const isPageVisible = (): boolean =>
  document.visibilityState === REALTIME.VISIBLE;

export const startRealtimeFallbackRefresh = (
  refresh: RealtimeRefreshCallback
): (() => void) => {
  const refreshWhenVisible = (): void => {
    if (isPageVisible()) {
      refresh();
    }
  };
  const interval = setInterval(
    refreshWhenVisible,
    REALTIME.FALLBACK_REFRESH_MS
  );
  document.addEventListener(
    REALTIME.VISIBILITY_CHANGE,
    refreshWhenVisible
  );

  return () => {
    clearInterval(interval);
    document.removeEventListener(
      REALTIME.VISIBILITY_CHANGE,
      refreshWhenVisible
    );
  };
};
