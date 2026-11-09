import { E2E_DEPOSITS_REPORT_SEEDS } from "../constants/E2eDepositsReport.constants";
import { createServiceRoleClient } from "./createServiceRoleClient";
import type { DepositsReportHandle } from "./models/DepositsReportHandle.interface";
import { removeE2eDeposits } from "./removeE2eDeposits";
import { seedE2eDeposits } from "./seedE2eDeposits";

export const createDepositsReportFixture = async (
  workerId: string
): Promise<DepositsReportHandle> => {
  const supabase = createServiceRoleClient();
  const seeded = await seedE2eDeposits(supabase, workerId, [
    E2E_DEPOSITS_REPORT_SEEDS.HELD_USD,
    E2E_DEPOSITS_REPORT_SEEDS.HELD_CRC,
    E2E_DEPOSITS_REPORT_SEEDS.RETAINED_USD,
    E2E_DEPOSITS_REPORT_SEEDS.PARTIAL_CRC,
    E2E_DEPOSITS_REPORT_SEEDS.BLANK_REASON,
  ]);
  const [
    heldUsd,
    heldCrc,
    retainedUsd,
    partialCrc,
    blankReason,
  ] = seeded;

  return {
    fixture: {
      blankReason,
      heldCrc,
      heldUsd,
      partialCrc,
      retainedUsd,
    },
    remove: () => removeE2eDeposits(supabase, seeded),
  };
};
