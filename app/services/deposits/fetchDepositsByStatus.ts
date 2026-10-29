import { DEPOSIT_QUERY } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { mapDepositRow } from "./mapDepositRow";
import type { DepositListItem } from "./models/DepositListItem.interface";
import type { DepositRow } from "./models/DepositRow.interface";
import type { DepositsByStatusQuery } from "./models/DepositsByStatusQuery.interface";

export const fetchDepositsByStatus = async ({
  statuses,
}: DepositsByStatusQuery): Promise<DepositListItem[]> => {
  if (statuses.length === 0) {
    return [];
  }
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from(DEPOSIT_QUERY.TABLE)
    .select(DEPOSIT_QUERY.SELECT)
    .in(DEPOSIT_QUERY.STATUS_COLUMN, [...statuses])
    .order(DEPOSIT_QUERY.ORDER_COLUMN, { ascending: true });
  throwIfSupabaseError(error, DEPOSIT_QUERY.OPERATION);
  const rows: DepositRow[] = data ?? [];
  return rows.map(mapDepositRow);
};
