import type { QueryData } from "@supabase/supabase-js";
import type { buildReservationEditQuery } from "../services/buildReservationEditQuery";

export type ReservationEditRow = QueryData<
  ReturnType<typeof buildReservationEditQuery>
>;
