import { E2E_RESERVATION_REFUND as values } from "../constants/E2eReservationRefund.constants";
import { E2E_RESERVATION_REFUND_SQL as sql } from "../constants/E2eReservationRefundSql.constants";
import type { ActiveWorker } from "./models/ActiveWorker.interface";
import { removeReservationChargeFixtures } from "./removeReservationChargeFixtures";
import { runWorkerSql } from "./runWorkerSql";

export const removeReservationRefundFixtures = async (
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
