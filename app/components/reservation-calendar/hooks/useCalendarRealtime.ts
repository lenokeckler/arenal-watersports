import { useEffect, useEffectEvent, useState } from "react";
import { subscribeCalendarRealtime } from "../utils/subscribeCalendarRealtime";

export const useCalendarRealtime = (
  channelName: string,
  onChange: () => void
): boolean => {
  const [hasConnectionError, setHasConnectionError] =
    useState(false);
  const notify = useEffectEvent(onChange);
  useEffect(
    () =>
      subscribeCalendarRealtime(
        channelName,
        notify,
        setHasConnectionError
      ),
    [channelName]
  );
  return hasConnectionError;
};
