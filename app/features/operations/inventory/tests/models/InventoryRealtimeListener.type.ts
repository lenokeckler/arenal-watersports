import type {
  REALTIME_LISTEN_TYPES,
  REALTIME_POSTGRES_CHANGES_LISTEN_EVENT,
  RealtimePostgresChangesFilter,
} from "@supabase/supabase-js";

export type InventoryRealtimeListener = (
  event: REALTIME_LISTEN_TYPES.POSTGRES_CHANGES,
  filter: RealtimePostgresChangesFilter<REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.ALL>,
  refresh: () => void
) => void;
