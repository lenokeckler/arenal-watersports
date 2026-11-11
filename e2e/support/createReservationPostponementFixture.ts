import {
  E2E_RESERVATION_POSTPONEMENT as values,
  E2E_RESERVATION_POSTPONEMENT_SEED as seed,
  E2E_RESERVATION_POSTPONEMENT_SLOT_BY_PROJECT as slotByProject,
} from "../constants/E2eReservationPostponement.constants";
import { E2E_RESERVATION_POSTPONEMENT_SQL as sql } from "../constants/E2eReservationPostponementSql.constants";
import { buildE2eCustomerName } from "./buildE2eCustomerName";
import { failE2eOperation } from "./failE2eOperation";
import type { ReservationPostponementFixture } from "./models/ReservationPostponementFixture.interface";
import { runWorkerSql } from "./runWorkerSql";

export const createReservationPostponementFixture = async (
  workerId: string,
  projectName: string,
  isDispatched = false
): Promise<ReservationPostponementFixture> => {
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

  if (isDispatched) {
    await runWorkerSql(
      values.FIXTURE_OPERATION,
      sql.DISPATCH,
      workerId,
      { ...seed, reservation: id, unit: slot.unit }
    );
  }

  return {
    code,
    customerName,
    id,
    time: slot.time,
    unit: slot.unit,
  };
};
