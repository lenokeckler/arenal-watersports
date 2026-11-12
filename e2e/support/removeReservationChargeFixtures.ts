import { E2E_RESERVATION_CHARGE as values } from "../constants/E2eReservationCharge.constants";
import { E2E_RESERVATION_CHARGE_SQL as sql } from "../constants/E2eReservationChargeSql.constants";
import type { ActiveWorker } from "./models/ActiveWorker.interface";
import { removeReservationsForWorker } from "./removeReservationsForWorker";
import { runWorkerSql } from "./runWorkerSql";

export const removeReservationChargeFixtures = async (
  activeWorker: ActiveWorker
): Promise<void> => {
  try {
    await runWorkerSql(
      values.FIXTURE_OPERATION,
      sql.CLEANUP,
      activeWorker.id
    );
  } finally {
    await removeReservationsForWorker(activeWorker);
  }
};
