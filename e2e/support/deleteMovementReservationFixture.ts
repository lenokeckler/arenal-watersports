import { E2E_SUPABASE_TABLE } from "../constants/E2eSupabase.constants";
import { createServiceRoleClient } from "./createServiceRoleClient";
import { failE2eOperation } from "./failE2eOperation";

export const deleteMovementReservationFixture = async (
  customerName: string
): Promise<void> => {
  const { error } = await createServiceRoleClient()
    .from(E2E_SUPABASE_TABLE.RESERVATIONS)
    .delete()
    .eq("customer_name", customerName);

  if (error) {
    failE2eOperation(
      "delete the reservation",
      error.message
    );
  }
};
