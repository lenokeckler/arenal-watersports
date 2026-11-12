import type { QueryData } from "@supabase/supabase-js";
import type { ReservationCalendarQuery } from "./ReservationCalendarQuery.type";

export type ReservationCalendarQueryRow =
  QueryData<ReservationCalendarQuery>[number];
