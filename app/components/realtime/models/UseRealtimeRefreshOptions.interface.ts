import type { RealtimeRefreshCallback } from "./RealtimeRefreshCallback.type";

export interface UseRealtimeRefreshOptions {
  channelName: string;
  onRefresh: RealtimeRefreshCallback;
  tables: readonly string[];
}
