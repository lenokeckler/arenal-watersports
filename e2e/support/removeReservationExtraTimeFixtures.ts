import { E2E_RESERVATION_EXTRA_TIME as values } from "../constants/E2eReservationExtraTime.constants";
import { E2E_RESERVATION_EXTRA_TIME_SQL as sql } from "../constants/E2eReservationExtraTimeSql.constants";
import type { ActiveWorker } from "./models/ActiveWorker.interface";
import { removeReservationsForWorker } from "./removeReservationsForWorker";
import { runWorkerSql } from "./runWorkerSql";

export const removeReservationExtraTimeFixtures = async (
  activeWorker: ActiveWorker
): Promise<void> => {
  try {
    await runWorkerSql(
      values.CLEANUP_OPERATION,
      sql.CLEANUP,
      activeWorker.id
    );
  } finally {
    await removeReservationsForWorker(activeWorker);
  }
};
