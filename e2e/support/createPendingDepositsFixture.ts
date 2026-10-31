import { E2E_DEPOSIT_SEEDS } from "../constants/E2ePendingDeposits.constants";
import { createServiceRoleClient } from "./createServiceRoleClient";
import type { E2eSeededDeposit } from "./models/E2eSeededDeposit.interface";
import type { PendingDepositsHandle } from "./models/PendingDepositsHandle.interface";
import { removeE2eDeposits } from "./removeE2eDeposits";
import { seedE2eDeposit } from "./seedE2eDeposit";

export const createPendingDepositsFixture = async (
  workerId: string
): Promise<PendingDepositsHandle> => {
  const supabase = createServiceRoleClient();
  const seeded: E2eSeededDeposit[] = [];

  try {
    for (const seed of [
      E2E_DEPOSIT_SEEDS.USD,
      E2E_DEPOSIT_SEEDS.CRC,
      E2E_DEPOSIT_SEEDS.RETURNED,
    ]) {
      seeded.push(
        await seedE2eDeposit(supabase, workerId, seed)
      );
    }
  } catch (error) {
    if (seeded.length > 0) {
      await removeE2eDeposits(supabase, seeded);
    }
    throw error;
  }

  const [usd, crc, returned] = seeded;

  return {
    fixture: { crc, returned, usd },
    remove: () => removeE2eDeposits(supabase, seeded),
  };
};
