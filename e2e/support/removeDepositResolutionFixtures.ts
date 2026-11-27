import { E2E_DEPOSIT_RESOLUTION as values } from "../constants/E2eDepositResolution.constants";
import { E2E_DEPOSIT_RESOLUTION_SQL as sql } from "../constants/E2eDepositResolutionSql.constants";
import type { ActiveWorker } from "./models/ActiveWorker.interface";
import { removeReservationChargeFixtures } from "./removeReservationChargeFixtures";
import { runWorkerSql } from "./runWorkerSql";

export const removeDepositResolutionFixtures = async (
  activeWorker: ActiveWorker
): Promise<void> => {
  try {
    await runWorkerSql(
      values.CLEANUP_OPERATION,
      sql.CLEANUP,
      activeWorker.id
    );
  } finally {
    await removeReservationChargeFixtures(activeWorker);
  }
};
