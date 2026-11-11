import { SUPABASE_WORK_AREA } from "@/app/constants";
import { E2E_ADMIN_ACCOUNT } from "../constants/E2eAccounts.constants";
import { E2E_SUPABASE_TABLE } from "../constants/E2eSupabase.constants";
import { createServiceRoleClient } from "./createServiceRoleClient";
import { failE2eOperation } from "./failE2eOperation";

export const grantReservationsAreaToWorker = async (
  workerId: string
): Promise<void> => {
  const { error } = await createServiceRoleClient()
    .from(E2E_SUPABASE_TABLE.WORKER_AREAS)
    .insert({
      area: SUPABASE_WORK_AREA.RESERVATIONS,
      granted_by: E2E_ADMIN_ACCOUNT.workerId,
      worker_id: workerId,
    });

  if (error) {
    failE2eOperation(
      "grant Reservations access to the E2E worker",
      error.message
    );
  }
};
