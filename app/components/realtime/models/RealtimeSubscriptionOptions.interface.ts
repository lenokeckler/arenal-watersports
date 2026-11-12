import type { RealtimeConnectionErrorCallback } from "./RealtimeConnectionErrorCallback.type";
import type { RealtimeRefreshCallback } from "./RealtimeRefreshCallback.type";

export interface RealtimeSubscriptionOptions {
  channelName: string;
  onConnectionError?: RealtimeConnectionErrorCallback;
  onRefresh: RealtimeRefreshCallback;
  schema: string;
  tables: readonly string[];
}
