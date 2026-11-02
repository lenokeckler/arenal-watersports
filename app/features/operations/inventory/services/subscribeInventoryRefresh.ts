import { subscribeRealtimeRefresh } from "@/app/components/realtime/utils/subscribeRealtimeRefresh";
import { INVENTORY_REALTIME } from "../constants/InventoryRealtime.constants";

export const subscribeInventoryRefresh = (
  refresh: () => void
): (() => void) =>
  subscribeRealtimeRefresh({
    channelName: INVENTORY_REALTIME.CHANNEL,
    onRefresh: refresh,
    schema: INVENTORY_REALTIME.SCHEMA,
    tables: Object.values(INVENTORY_REALTIME.TABLES),
  });
