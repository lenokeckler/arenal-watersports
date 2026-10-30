import { useEffect } from "react";
import { createBrowserSupabaseClient } from "@/app/services/supabase/client";
import { OPERATIONS_CALENDAR_REALTIME } from "../constants/OperationsCalendarIntegration.constants";

export const useOperationsCalendarRealtime = (
  onChange: () => void
): void => {
  useEffect(() => {
    const supabase = createBrowserSupabaseClient();
    const channel = supabase
      .channel(OPERATIONS_CALENDAR_REALTIME.CHANNEL)
      .on(
        "postgres_changes",
        {
          event: OPERATIONS_CALENDAR_REALTIME.EVENT,
          schema: OPERATIONS_CALENDAR_REALTIME.SCHEMA,
          table:
            OPERATIONS_CALENDAR_REALTIME.TABLES
              .RESERVATIONS,
        },
        onChange
      )
      .on(
        "postgres_changes",
        {
          event: OPERATIONS_CALENDAR_REALTIME.EVENT,
          schema: OPERATIONS_CALENDAR_REALTIME.SCHEMA,
          table: OPERATIONS_CALENDAR_REALTIME.TABLES.ITEMS,
        },
        onChange
      )
      .on(
        "postgres_changes",
        {
          event: OPERATIONS_CALENDAR_REALTIME.EVENT,
          schema: OPERATIONS_CALENDAR_REALTIME.SCHEMA,
          table:
            OPERATIONS_CALENDAR_REALTIME.TABLES.DISPATCHES,
        },
        onChange
      )
      .subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [onChange]);
};
