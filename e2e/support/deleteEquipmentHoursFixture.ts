import { E2E_SUPABASE_TABLE } from "../constants/E2eSupabase.constants";
import { createServiceRoleClient } from "./createServiceRoleClient";
import { failE2eOperation } from "./failE2eOperation";

export const deleteEquipmentHoursFixture = async (
  customerName: string
): Promise<void> => {
  const client = createServiceRoleClient();
  const { data: reservations, error: readError } =
    await client
      .from(E2E_SUPABASE_TABLE.RESERVATIONS)
      .select("id")
      .eq("customer_name", customerName);

  if (readError) {
    failE2eOperation(
      "find the reservation",
      readError.message
    );
    return;
  }

  const ids = (reservations ?? []).map(({ id }) => id);

  for (const [table, column] of [
    [
      E2E_SUPABASE_TABLE.RESERVATION_ITEMS,
      "reservation_id",
    ],
    ["reservation_dispatches", "reservation_id"],
    [E2E_SUPABASE_TABLE.RESERVATIONS, "id"],
  ] as const) {
    const { error } = await client
      .from(table)
      .delete()
      .in(column, ids);

    if (error) {
      failE2eOperation(
        `delete from ${table}`,
        error.message
      );
    }
  }
};
