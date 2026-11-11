import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { RESERVATION_CATEGORY_STATUS } from "../constants/ReservationCategoryStatus.constants";
import { RESERVATION_SERVICE_OPERATION } from "../constants/ReservationServiceOperation.constants";
import type { ReservationExtraUnitInput } from "../models/ReservationExtraUnitInput.interface";
import type { ReservationExtraOption } from "../models/ReservationExtraOption.interface";
import { getAuthorizedReservationFormClient } from "./getAuthorizedReservationFormClient";

export const getReservationExtras = async (
  input: ReservationExtraUnitInput
): Promise<ReservationExtraOption[]> => {
  const supabase: SupabaseClient<Database> =
    await getAuthorizedReservationFormClient();
  const { data, error } = await supabase
    .from("extras")
    .select(
      "id, name, price_crc, price_usd, extra_compatibility!inner(unit_id)"
    )
    .eq("status", RESERVATION_CATEGORY_STATUS.ACTIVE)
    .eq("extra_compatibility.unit_id", input.unitId)
    .order("name");

  throwIfSupabaseError(
    error,
    RESERVATION_SERVICE_OPERATION.LOAD_EXTRAS
  );

  return (data ?? []).map((extra) => ({
    id: extra.id,
    name: extra.name,
    priceCrc: extra.price_crc,
    priceUsd: extra.price_usd,
  }));
};
