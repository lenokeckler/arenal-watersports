import { getOperationsSupabaseClient } from "@/app/services/operations/getOperationsSupabaseClient";
import type { NullableRef } from "@/app/types";
import { readPendingDamageCount } from "./readPendingDamageCount";

export const getBoardEquipmentPending = async (): Promise<
  NullableRef<number>
> => {
  try {
    return await readPendingDamageCount(
      await getOperationsSupabaseClient()
    );
  } catch {
    return null;
  }
};
