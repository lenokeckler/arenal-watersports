import type { NullableUndefined } from "@/app/types";
import { CALENDAR_REALTIME } from "../constants/CalendarRealtime.constants";

export const createCalendarRefreshScheduler = (
  notify: () => void
) => {
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
      notify();
    }, CALENDAR_REALTIME.COALESCE_MS);
  };
  const dispose = (): void => {
    disposed = true;
    clearTimeout(timer);
  };
  return { schedule, dispose, isDisposed: () => disposed };
};
