import {
  DEPOSIT_QUERY,
  RETAINED_DEPOSIT_STATUSES,
} from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { mapRetainedDepositRow } from "./mapRetainedDepositRow";
import type { RetainedDepositItem } from "./models/RetainedDepositItem.interface";
import type { RetainedDepositRow } from "./models/RetainedDepositRow.interface";
import { throwIfDepositsTruncated } from "./throwIfDepositsTruncated";

export const fetchRetainedDeposits = async (): Promise<
  RetainedDepositItem[]
> => {
  const supabase = await createServerSupabaseClient();
  const { data, error, count } = await supabase
    .from(DEPOSIT_QUERY.TABLE)
    .select(DEPOSIT_QUERY.RETAINED_SELECT, {
      count: DEPOSIT_QUERY.COUNT,
    })
    .in(DEPOSIT_QUERY.STATUS_COLUMN, [
      ...RETAINED_DEPOSIT_STATUSES,
    ])
    .order(DEPOSIT_QUERY.RESOLVED_AT_COLUMN, {
      ascending: false,
      nullsFirst: false,
    });

  throwIfSupabaseError(
    error,
    DEPOSIT_QUERY.RETAINED_OPERATION
  );

  const rows: RetainedDepositRow[] = data ?? [];

  throwIfDepositsTruncated(rows.length, count);

  return rows.map(mapRetainedDepositRow);
};
