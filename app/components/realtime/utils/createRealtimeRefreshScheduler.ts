import type { NullableUndefined } from "@/app/types";
import { REALTIME } from "../constants/Realtime.constants";
import type { RealtimeRefreshCallback } from "../models/RealtimeRefreshCallback.type";
import type { RealtimeRefreshScheduler } from "../models/RealtimeRefreshScheduler.interface";

export const createRealtimeRefreshScheduler = (
  refresh: RealtimeRefreshCallback
): RealtimeRefreshScheduler => {
  let timer: NullableUndefined<
    ReturnType<typeof setTimeout>
  >;
  let disposed = false;
  const schedule = (): void => {
    if (disposed || timer !== undefined) {
      return;
    }
    timer = setTimeout(() => {
      timer = undefined;
      refresh();
    }, REALTIME.COALESCE_MS);
  };
  const dispose = (): void => {
    disposed = true;
    clearTimeout(timer);
    timer = undefined;
  };
  return { schedule, dispose, isDisposed: () => disposed };
};
