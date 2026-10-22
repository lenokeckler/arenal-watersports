import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/app/types";

const findFixtureReservationIds = async (
  supabase: SupabaseClient<Database>,
  customerName: string
): Promise<string[]> => {
  const { data, error } = await supabase
    .from("reservations")
    .select("id")
    .eq("customer_name", customerName);
  if (error) {
    throw error;
  }
  return data.map(({ id }) => id);
};

const deleteReservationChildren = async (
  supabase: SupabaseClient<Database>,
  reservationIds: string[]
): Promise<unknown[]> => {
  const childResults = await Promise.all([
    supabase
      .from("reservation_items")
      .delete()
      .in("reservation_id", reservationIds),
    supabase
      .from("reservation_guides")
      .delete()
      .in("reservation_id", reservationIds),
    supabase
      .from("reservation_pricing")
      .delete()
      .in("reservation_id", reservationIds),
  ]);
  return childResults.flatMap(({ error }) =>
    error ? [error] : []
  );
};

export const deletePredefinedComboReservations = async (
  supabase: SupabaseClient<Database>,
  customerName: string
): Promise<unknown[]> => {
  const reservationIds = await findFixtureReservationIds(
    supabase,
    customerName
  );
  if (reservationIds.length === 0) {
    return [];
  }
  const childErrors = await deleteReservationChildren(
    supabase,
    reservationIds
  );
  const { error } = await supabase
    .from("reservations")
    .delete()
    .in("id", reservationIds);
  return error ? [...childErrors, error] : childErrors;
};
