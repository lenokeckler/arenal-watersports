import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { RESERVATION_SPLIT_ERROR } from "../constants/ReservationSplitError.constants";
import { RESERVATION_SPLIT_QUERY } from "../constants/ReservationSplitQuery.constants";
import type { ReservationSplitCreatedDeparture } from "../models/ReservationSplitCreatedDeparture.interface";
import type { ReservationSplitInput } from "../models/ReservationSplitInput.interface";

export const splitReservation = async (
  input: ReservationSplitInput
): Promise<ReservationSplitCreatedDeparture[]> => {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.rpc(
    RESERVATION_SPLIT_QUERY.RPC,
    {
      p_payload: {
        departures: input.departures.map((departure) => ({
          items: departure.items.map((item) => ({
            item_id: item.itemId,
            quantity: item.quantity,
          })),
          people_count: departure.peopleCount,
          time: departure.time,
        })),
        expected_updated_at: input.expectedUpdatedAt,
        reservation_id: input.reservationId,
      },
    }
  );

  throwIfSupabaseError(
    error,
    RESERVATION_SPLIT_ERROR.OPERATION.SPLIT
  );

  if (!data || data.length === 0) {
    throw new Error(
      RESERVATION_SPLIT_ERROR.OPERATION.MISSING_DEPARTURES
    );
  }

  return data.map((departure) => ({
    code: departure.departure_code,
    reservationId: departure.departure_id,
  }));
};
