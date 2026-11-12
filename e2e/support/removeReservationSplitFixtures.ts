import {
  E2E_RESERVATION_SPLIT as values,
  E2E_RESERVATION_SPLIT_SQL as sql,
} from "../constants/E2eReservationSplit.constants";
import type { ActiveWorker } from "./models/ActiveWorker.interface";
import { removeReservationsForWorker } from "./removeReservationsForWorker";
import { runWorkerSql } from "./runWorkerSql";

export const removeReservationSplitFixtures = async (
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
