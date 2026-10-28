import { CHARGE_QUERY } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { ChargesTruncatedError } from "./ChargesTruncatedError";
import { mapChargeRow } from "./mapChargeRow";
import type { ChargeMovement } from "./models/ChargeMovement.interface";
import type { ChargeRange } from "./models/ChargeRange.type";
import type { ChargeRow } from "./models/ChargeRow.interface";

export const fetchChargesInRange = async ({
  startsAt,
  endsAt,
}: ChargeRange): Promise<ChargeMovement[]> => {
  const supabase = await createServerSupabaseClient();
  const { data, error, count } = await supabase
    .from(CHARGE_QUERY.TABLE)
    .select(CHARGE_QUERY.SELECT, {
      count: CHARGE_QUERY.COUNT,
    })
    .gte(CHARGE_QUERY.CREATED_AT_COLUMN, startsAt)
    .lt(CHARGE_QUERY.CREATED_AT_COLUMN, endsAt);

  throwIfSupabaseError(error, CHARGE_QUERY.OPERATION);

  const rows: ChargeRow[] = data ?? [];

  if (count !== null && rows.length < count) {
    throw new ChargesTruncatedError();
  }

  return rows.map(mapChargeRow);
};
