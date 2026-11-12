import { useEffect, useEffectEvent, useState } from "react";
import { REALTIME } from "../constants/Realtime.constants";
import type { UseRealtimeRefreshOptions } from "../models/UseRealtimeRefreshOptions.interface";
import { subscribeRealtimeRefresh } from "../utils/subscribeRealtimeRefresh";

export const useRealtimeRefresh = ({
  channelName,
  onRefresh,
  tables,
}: UseRealtimeRefreshOptions): boolean => {
  const [hasConnectionError, setHasConnectionError] =
    useState(false);
  const notify = useEffectEvent(onRefresh);
  useEffect(
    () =>
      subscribeRealtimeRefresh({
        channelName,
        onConnectionError: setHasConnectionError,
        onRefresh: notify,
        schema: REALTIME.SCHEMA,
        tables,
      }),
    [channelName, tables]
  );
  return hasConnectionError;
};
