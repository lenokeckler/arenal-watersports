import { REFUND_QUERY } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import type { Money } from "@/app/utils/money/models/Money.interface";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { mapRefundRow } from "./mapRefundRow";
import type { RefundRange } from "./models/RefundRange.type";
import type { RefundRow } from "./models/RefundRow.interface";
import { RefundsTruncatedError } from "./RefundsTruncatedError";

export const fetchRefundsInRange = async ({
  startsAt,
  endsAt,
}: RefundRange): Promise<Money[]> => {
  const supabase = await createServerSupabaseClient();
  const { data, error, count } = await supabase
    .from(REFUND_QUERY.TABLE)
    .select(REFUND_QUERY.SELECT, {
      count: REFUND_QUERY.COUNT,
    })
    .gte(REFUND_QUERY.CREATED_AT_COLUMN, startsAt)
    .lt(REFUND_QUERY.CREATED_AT_COLUMN, endsAt);

  throwIfSupabaseError(error, REFUND_QUERY.OPERATION);

  const rows: RefundRow[] = data ?? [];

  if (count === null || rows.length < count) {
    throw new RefundsTruncatedError();
  }

  return rows.map(mapRefundRow);
};
