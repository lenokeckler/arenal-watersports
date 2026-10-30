import { useEffect } from "react";
import { createBrowserSupabaseClient } from "@/app/services/supabase/client";
import { RESERVATION_CALENDAR_REALTIME } from "../constants/ReservationCalendarRealtime.constants";

export const useReservationsCalendarRealtime = (
  onChange: () => void
): void => {
  useEffect(() => {
    const supabase = createBrowserSupabaseClient();
    const channel = supabase
      .channel(RESERVATION_CALENDAR_REALTIME.CHANNEL)
      .on(
        "postgres_changes",
        {
          event: RESERVATION_CALENDAR_REALTIME.EVENT,
          schema: RESERVATION_CALENDAR_REALTIME.SCHEMA,
          table:
            RESERVATION_CALENDAR_REALTIME.TABLES
              .RESERVATIONS,
        },
        onChange
      )
      .on(
        "postgres_changes",
        {
          event: RESERVATION_CALENDAR_REALTIME.EVENT,
          schema: RESERVATION_CALENDAR_REALTIME.SCHEMA,
          table:
            RESERVATION_CALENDAR_REALTIME.TABLES.DISPATCHES,
        },
        onChange
      )
      .on(
        "postgres_changes",
        {
          event: RESERVATION_CALENDAR_REALTIME.EVENT,
          schema: RESERVATION_CALENDAR_REALTIME.SCHEMA,
          table: RESERVATION_CALENDAR_REALTIME.TABLES.ITEMS,
        },
        onChange
      )
      .subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [onChange]);
};
