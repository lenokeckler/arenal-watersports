import { UUID_PATTERN } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import type { NullableRef } from "@/app/types";
import type { DepositResolution } from "../models/DepositResolution.interface";
import { mapDepositResolution } from "../utils/mapDepositResolution";
import { readDepositResolutionRow } from "./readDepositResolutionRow";

export const getDepositResolution = async (
  depositId: string
): Promise<NullableRef<DepositResolution>> => {
  if (!UUID_PATTERN.test(depositId)) {
    return null;
  }

  const row = await readDepositResolutionRow(
    await createServerSupabaseClient(),
    depositId
  );

  return row === null ? null : mapDepositResolution(row);
};
