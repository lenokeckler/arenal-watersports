import {
  E2E_RESERVATION_POSTPONEMENT as values,
  E2E_RESERVATION_POSTPONEMENT_SLOT_BY_PROJECT as slotByProject,
} from "../constants/E2eReservationPostponement.constants";
import { E2E_RESERVATION_POSTPONEMENT_SQL as sql } from "../constants/E2eReservationPostponementSql.constants";
import type { ActiveWorker } from "./models/ActiveWorker.interface";
import { removeReservationsForWorker } from "./removeReservationsForWorker";
import { runWorkerSql } from "./runWorkerSql";

export const removeReservationPostponementFixtures = async (
  activeWorker: ActiveWorker,
  projectName: string
): Promise<void> => {
  try {
    await runWorkerSql(
      values.FIXTURE_OPERATION,
      sql.CLEANUP,
      activeWorker.id,
      { unit: slotByProject[projectName]?.unit ?? "" }
    );
  } finally {
    await removeReservationsForWorker(activeWorker);
  }
};
