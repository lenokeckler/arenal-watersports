import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import type { NullableRef } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { DEPOSIT_RESOLUTION_ERROR } from "../constants/DepositResolutionError.constants";
import { DEPOSIT_RESOLUTION_QUERY } from "../constants/DepositResolutionQuery.constants";
import type { DepositResolutionRow } from "../models/DepositResolutionRow.type";

export const readDepositResolutionRow = async (
  supabase: ServerSupabaseClient,
  depositId: string
): Promise<NullableRef<DepositResolutionRow>> => {
  const { data, error } = await supabase
    .from(DEPOSIT_RESOLUTION_QUERY.TABLE)
    .select(DEPOSIT_RESOLUTION_QUERY.PROJECTION)
    .eq(DEPOSIT_RESOLUTION_QUERY.COLUMNS.ID, depositId)
    .maybeSingle();

  throwIfSupabaseError(
    error,
    DEPOSIT_RESOLUTION_ERROR.OPERATION.READ
  );

  return data;
};
