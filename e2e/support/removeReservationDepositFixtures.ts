import { E2E_RESERVATION_DEPOSIT as values } from "../constants/E2eReservationDeposit.constants";
import { E2E_RESERVATION_DEPOSIT_SQL as sql } from "../constants/E2eReservationDepositSql.constants";
import type { ActiveWorker } from "./models/ActiveWorker.interface";
import { removeReservationChargeFixtures } from "./removeReservationChargeFixtures";
import { runWorkerSql } from "./runWorkerSql";
import { setE2eCategoryDeposit } from "./setE2eCategoryDeposit";

export const removeReservationDepositFixtures = async (
  activeWorker: ActiveWorker,
  projectName: string
): Promise<void> => {
  try {
    await runWorkerSql(
      values.CLEANUP_OPERATION,
      sql.CLEANUP,
      activeWorker.id
    );
    await setE2eCategoryDeposit(
      activeWorker.id,
      projectName,
      false
    );
  } finally {
    await removeReservationChargeFixtures(activeWorker);
  }
};
