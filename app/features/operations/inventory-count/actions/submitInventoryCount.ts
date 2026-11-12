"use server";

import { SUPABASE_RPC } from "@/app/constants";
import { requireInventoryAccess } from "@/app/services/operations/inventory/requireInventoryAccess";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import {
  INVENTORY_COUNT_LIMITS,
  INVENTORY_COUNT_RESULT,
  type InventoryCountResult,
} from "../constants/InventoryCount.constants";
import type { InventoryCountInput } from "../models/InventoryCountInput.interface";
import { isInventoryCountResult } from "../utils/isInventoryCountResult";
import { toInventoryCountPayload } from "../utils/toInventoryCountPayload";

export const submitInventoryCount = async (
  input: InventoryCountInput
): Promise<InventoryCountResult> => {
  if (
    input.lines.length === 0 ||
    input.notes.length >
      INVENTORY_COUNT_LIMITS.NOTES_MAX_LENGTH
  ) {
    return INVENTORY_COUNT_RESULT.INVALID;
  }

  const supabase = await requireInventoryAccess();
  const { data, error } = await supabase.rpc(
    SUPABASE_RPC.RECORD_INVENTORY_COUNT,
    {
      count_lines: toInventoryCountPayload(input.lines),
      count_notes: input.notes,
    }
  );

  throwIfSupabaseError(
    error,
    SUPABASE_RPC.RECORD_INVENTORY_COUNT
  );

  const outcome = data?.[0]?.outcome;

  return isInventoryCountResult(outcome)
    ? outcome
    : INVENTORY_COUNT_RESULT.FAILED;
};
