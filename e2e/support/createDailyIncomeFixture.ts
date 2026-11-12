import { E2E_CHARGE_SEEDS } from "../constants/E2eDailyIncome.constants";
import { createServiceRoleClient } from "./createServiceRoleClient";
import type { DailyIncomeHandle } from "./models/DailyIncomeHandle.interface";
import type { E2eSeededCharge } from "./models/E2eSeededCharge.interface";
import { removeE2eCharges } from "./removeE2eCharges";
import { seedE2eCharge } from "./seedE2eCharge";

export const createDailyIncomeFixture = async (
  workerId: string
): Promise<DailyIncomeHandle> => {
  const supabase = createServiceRoleClient();
  const seeded: E2eSeededCharge[] = [];

  try {
    for (const seed of [
      E2E_CHARGE_SEEDS.USD,
      E2E_CHARGE_SEEDS.CRC,
    ]) {
      seeded.push(
        await seedE2eCharge(supabase, workerId, seed)
      );
    }
  } catch (error) {
    if (seeded.length > 0) {
      await removeE2eCharges(supabase, seeded);
    }
    throw error;
  }

  const [usd, crc] = seeded;

  return {
    fixture: { crc, usd },
    remove: () => removeE2eCharges(supabase, seeded),
  };
};
