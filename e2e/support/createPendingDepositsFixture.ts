import { E2E_DEPOSIT_SEEDS } from "../constants/E2ePendingDeposits.constants";
import { createServiceRoleClient } from "./createServiceRoleClient";
import type { PendingDepositsHandle } from "./models/PendingDepositsHandle.interface";
import { removeE2eDeposits } from "./removeE2eDeposits";
import { seedE2eDeposit } from "./seedE2eDeposit";

export const createPendingDepositsFixture = async (
  workerId: string
): Promise<PendingDepositsHandle> => {
  const supabase = createServiceRoleClient();
  const usd = await seedE2eDeposit(
    supabase,
    workerId,
    E2E_DEPOSIT_SEEDS.USD
  );
  const crc = await seedE2eDeposit(
    supabase,
    workerId,
    E2E_DEPOSIT_SEEDS.CRC
  );
  const returned = await seedE2eDeposit(
    supabase,
    workerId,
    E2E_DEPOSIT_SEEDS.RETURNED
  );

  return {
    fixture: { crc, returned, usd },
    remove: () =>
      removeE2eDeposits(supabase, [usd, crc, returned]),
  };
};
