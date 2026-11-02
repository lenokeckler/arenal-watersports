import {
  DEPOSIT_QUERY,
  RETAINED_DEPOSIT_STATUSES,
} from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { isSignedInAdministrator } from "@/app/services/worker-registration/isSignedInAdministrator";
import type { NullableRef } from "@/app/types";
import { mapRetainedDepositRow } from "./mapRetainedDepositRow";
import { readDepositsPage } from "./readDepositsPage";
import type { DepositsPage } from "./models/DepositsPage.interface";
import type { RetainedDepositItem } from "./models/RetainedDepositItem.interface";
import type { RetainedDepositRow } from "./models/RetainedDepositRow.interface";

export const fetchRetainedDeposits = async (
  page: number
): Promise<
  NullableRef<DepositsPage<RetainedDepositItem>>
> => {
  const supabase = await createServerSupabaseClient();

  if (!(await isSignedInAdministrator(supabase))) {
    return null;
  }

  const depositsPage =
    await readDepositsPage<RetainedDepositRow>(
      (range) =>
        supabase
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
          })
          .order(DEPOSIT_QUERY.ID_COLUMN, {
            ascending: true,
          })
          .range(range.from, range.to),
      page,
      DEPOSIT_QUERY.RETAINED_OPERATION
    );

  return {
    ...depositsPage,
    items: depositsPage.items.map(mapRetainedDepositRow),
  };
};
