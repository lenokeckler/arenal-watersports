import { createRealtimeRefreshScheduler } from "@/app/components/realtime/utils/createRealtimeRefreshScheduler";

export const createCalendarRefreshScheduler = (
  notify: () => void
): ReturnType<typeof createRealtimeRefreshScheduler> =>
  createRealtimeRefreshScheduler(notify);
