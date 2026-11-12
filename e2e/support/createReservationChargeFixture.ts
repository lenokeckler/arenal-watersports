import { RESERVATION_STATUS } from "@/app/constants";
import {
  E2E_RESERVATION_CHARGE as values,
  E2E_RESERVATION_CHARGE_SEED as seed,
  E2E_RESERVATION_CHARGE_SLOT_BY_PROJECT as slotByProject,
} from "../constants/E2eReservationCharge.constants";
import { E2E_RESERVATION_CHARGE_SQL as sql } from "../constants/E2eReservationChargeSql.constants";
import { buildE2eCustomerName } from "./buildE2eCustomerName";
import { failE2eOperation } from "./failE2eOperation";
import type { ReservationChargeFixture } from "./models/ReservationChargeFixture.interface";
import type { ReservationChargeFixtureStatus } from "./models/ReservationChargeFixtureStatus.type";
import { runWorkerSql } from "./runWorkerSql";

export const createReservationChargeFixture = async (
  workerId: string,
  projectName: string,
  status: ReservationChargeFixtureStatus = RESERVATION_STATUS.SCHEDULED
): Promise<ReservationChargeFixture> => {
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
      people: values.PEOPLE_COUNT,
      unit: slot.unit,
    }
  );
  const [id, code] = created.split(
    values.ID_CODE_SEPARATOR
  );
  if (status !== RESERVATION_STATUS.SCHEDULED) {
    await runWorkerSql(
      values.STATUS_OPERATION,
      sql.SET_STATUS,
      workerId,
      {
        reason: values.CANCELLATION_REASON,
        reservation: id,
        status,
      }
    );
  }

  return { code, customerName, id };
};
