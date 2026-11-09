import { E2E_DEPOSITS_REPORT_PAGING } from "../constants/E2eDepositsReport.constants";
import { createServiceRoleClient } from "./createServiceRoleClient";
import type { E2eDepositSeed } from "./models/E2eDepositSeed.interface";
import type { E2eSeededDeposit } from "./models/E2eSeededDeposit.interface";
import { removeE2eDeposits } from "./removeE2eDeposits";
import { seedE2eDeposits } from "./seedE2eDeposits";

const buildRetainedPagingSeeds = (): E2eDepositSeed[] =>
  Array.from(
    { length: E2E_DEPOSITS_REPORT_PAGING.COUNT },
    (_, index) => ({
      ...E2E_DEPOSITS_REPORT_PAGING.SEED,
      resolvedAt: [
        E2E_DEPOSITS_REPORT_PAGING.RESOLVED_AT_PREFIX,
        String(index + 1).padStart(
          E2E_DEPOSITS_REPORT_PAGING.DAY_DIGITS,
          E2E_DEPOSITS_REPORT_PAGING.DAY_PAD
        ),
        E2E_DEPOSITS_REPORT_PAGING.RESOLVED_AT_SUFFIX,
      ].join(""),
    })
  );

export const createRetainedPagingFixture = async (
  workerId: string
): Promise<{
  fixture: E2eSeededDeposit[];
  remove: () => Promise<void>;
}> => {
  const supabase = createServiceRoleClient();
  const seeded = await seedE2eDeposits(
    supabase,
    workerId,
    buildRetainedPagingSeeds()
  );

  return {
    fixture: seeded,
    remove: () => removeE2eDeposits(supabase, seeded),
  };
};
