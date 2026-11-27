import { POSTGRES_ERROR_CODE } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import type { NullableRef } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { EXTRA_ROW_COLUMNS } from "../constants/ExtraQuery.constants";
import type { ExtraDetail } from "../models/ExtraDetail.interface";
import { mapExtraRowToExtra } from "../utils/mapExtraRowToExtra";
import { isExtraUsedInReservations } from "./isExtraUsedInReservations";

export const getExtra = async (
  extraId: string
): Promise<NullableRef<ExtraDetail>> => {
  const supabase = await createServerSupabaseClient();

  const { data: extraRow, error } = await supabase
    .from("extras")
    .select(EXTRA_ROW_COLUMNS)
    .eq("id", extraId)
    .maybeSingle();
  if (
    error?.code ===
    POSTGRES_ERROR_CODE.INVALID_TEXT_REPRESENTATION
  ) {
    return null;
  }
  throwIfSupabaseError(error, "getExtra");

  if (!extraRow) {
    return null;
  }

  return {
    ...mapExtraRowToExtra(extraRow),
    isUsedInReservations: await isExtraUsedInReservations(
      supabase,
      extraId
    ),
  };
};
