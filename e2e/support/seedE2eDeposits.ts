import type { SupabaseClient } from "@supabase/supabase-js";
import type { E2eDepositSeed } from "./models/E2eDepositSeed.interface";
import type { E2eSeededDeposit } from "./models/E2eSeededDeposit.interface";
import { removeE2eDeposits } from "./removeE2eDeposits";
import { seedE2eDeposit } from "./seedE2eDeposit";

export const seedE2eDeposits = async (
  supabase: SupabaseClient,
  workerId: string,
  seeds: readonly E2eDepositSeed[]
): Promise<E2eSeededDeposit[]> => {
  const seeded: E2eSeededDeposit[] = [];

  try {
    for (const seed of seeds) {
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

  return seeded;
};
