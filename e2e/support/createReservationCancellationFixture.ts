import {
  E2E_RESERVATION_CANCELLATION as values,
  E2E_RESERVATION_CANCELLATION_SEED as seed,
  E2E_RESERVATION_CANCELLATION_SLOT_BY_PROJECT as slotByProject,
  E2E_RESERVATION_CANCELLATION_SQL as sql,
} from "../constants/E2eReservationCancellation.constants";
import { buildE2eCustomerName } from "./buildE2eCustomerName";
import { failE2eOperation } from "./failE2eOperation";
import type { ReservationCancellationFixture } from "./models/ReservationCancellationFixture.interface";
import { runWorkerSql } from "./runWorkerSql";

export const createReservationCancellationFixture = async (
  workerId: string,
  projectName: string
): Promise<ReservationCancellationFixture> => {
  const slot = slotByProject[projectName];
  if (!slot) {
    return failE2eOperation(
      values.FIXTURE_OPERATION,
      `${values.MISSING_SLOT}: ${projectName}`
    );
  }
  const customerName = buildE2eCustomerName();
  const created = await runWorkerSql(
    values.FIXTURE_OPERATION,
    sql.SEED,
    workerId,
    {
      ...seed,
      customer: customerName,
      hour: slot.hour,
      unit: slot.unit,
    }
  );
  const [id, code] = created.split(
    values.ID_CODE_SEPARATOR
  );

  return { code, customerName, id };
};
