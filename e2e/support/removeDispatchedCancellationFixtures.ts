import { E2E_INVENTORY_SCENARIO } from "../constants/E2eInventoryScenario.constants";
import {
  E2E_RESERVATION_DISPATCHED_CANCELLATION as values,
  E2E_RESERVATION_DISPATCHED_CANCELLATION_SQL as sql,
} from "../constants/E2eReservationDispatchedCancellation.constants";
import type { ActiveWorker } from "./models/ActiveWorker.interface";
import { removeReservationCancellationFixtures } from "./removeReservationCancellationFixtures";
import { runWorkerSql } from "./runWorkerSql";

export const removeDispatchedCancellationFixtures = async (
  activeWorker: ActiveWorker
): Promise<void> => {
  try {
    await runWorkerSql(
      values.FIXTURE_OPERATION,
      sql.CLEANUP,
      activeWorker.id,
      { admin: E2E_INVENTORY_SCENARIO.ADMIN_ID }
    );
  } finally {
    await removeReservationCancellationFixtures(
      activeWorker
    );
  }
};
