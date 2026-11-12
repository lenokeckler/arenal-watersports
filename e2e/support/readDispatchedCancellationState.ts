import {
  E2E_RESERVATION_DISPATCHED_CANCELLATION as values,
  E2E_RESERVATION_DISPATCHED_CANCELLATION_ERROR as errors,
  E2E_RESERVATION_DISPATCHED_CANCELLATION_SQL as sql,
} from "../constants/E2eReservationDispatchedCancellation.constants";
import type { DispatchedCancellationState } from "./models/DispatchedCancellationState.interface";
import { failE2eOperation } from "./failE2eOperation";
import { runWorkerSql } from "./runWorkerSql";

export const readDispatchedCancellationState = async (
  workerId: string,
  reservationId: string
): Promise<DispatchedCancellationState> => {
  const row = await runWorkerSql(
    values.READ_OPERATION,
    sql.READ,
    workerId,
    { reservation: reservationId }
  );
  const fields = row.split(values.FIELD_SEPARATOR);

  if (fields.length <= values.FIXED_FIELD_COUNT) {
    failE2eOperation(
      values.READ_OPERATION,
      errors.FIELD_COUNT(fields.length)
    );
  }

  const [
    status,
    cause,
    openGroups,
    closedGroups,
    depositStatus,
    charges,
    fuelIn,
    usageIn,
    ...reasonParts
  ] = fields;

  return {
    cause,
    charges: Number(charges),
    closedGroups: Number(closedGroups),
    depositStatus,
    fuelIn,
    openGroups: Number(openGroups),
    reason: reasonParts.join(values.FIELD_SEPARATOR),
    status,
    usageIn,
  };
};

export const readDispatchedUnitStatus = (
  workerId: string,
  unitCode: string
): Promise<string> =>
  runWorkerSql(
    values.READ_UNIT_OPERATION,
    sql.READ_UNIT,
    workerId,
    { unit: unitCode }
  );
