import { DEPOSIT_QUERY, LENGTH } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { LIST_PAGINATION } from "@/app/utils/list-pagination/constants/ListPagination.constants";
import { mapDepositRow } from "./mapDepositRow";
import { readDepositsPage } from "./readDepositsPage";
import type { DepositListItem } from "./models/DepositListItem.interface";
import type { DepositRow } from "./models/DepositRow.interface";
import type { DepositsByStatusQuery } from "./models/DepositsByStatusQuery.interface";
import type { DepositsPage } from "./models/DepositsPage.interface";

export const fetchDepositsByStatus = async ({
  page,
  statuses,
}: DepositsByStatusQuery): Promise<
  DepositsPage<DepositListItem>
> => {
  if (statuses.length === 0) {
    return {
      items: [],
      page: LIST_PAGINATION.FIRST_PAGE,
      pageCount: LENGTH.ZERO,
      totalCount: LENGTH.ZERO,
    };
  }

  const supabase = await createServerSupabaseClient();
  const depositsPage = await readDepositsPage<DepositRow>(
    (range) =>
      supabase
        .from(DEPOSIT_QUERY.TABLE)
        .select(DEPOSIT_QUERY.SELECT, {
          count: DEPOSIT_QUERY.COUNT,
        })
        .in(DEPOSIT_QUERY.STATUS_COLUMN, [...statuses])
        .order(DEPOSIT_QUERY.ORDER_COLUMN, {
          ascending: true,
        })
        .order(DEPOSIT_QUERY.ID_COLUMN, { ascending: true })
        .range(range.from, range.to),
    page,
    DEPOSIT_QUERY.OPERATION
  );

  return {
    ...depositsPage,
    items: depositsPage.items.map(mapDepositRow),
  };
};
