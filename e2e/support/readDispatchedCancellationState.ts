import {
  E2E_RESERVATION_DISPATCHED_CANCELLATION as values,
  E2E_RESERVATION_DISPATCHED_CANCELLATION_SQL as sql,
} from "../constants/E2eReservationDispatchedCancellation.constants";
import type { DispatchedCancellationState } from "./models/DispatchedCancellationState.interface";
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
  const [
    status,
    reason,
    cause,
    openGroups,
    closedGroups,
    depositStatus,
    charges,
    fuelIn,
    usageIn,
  ] = row.split(values.FIELD_SEPARATOR);

  return {
    cause,
    charges: Number(charges),
    closedGroups: Number(closedGroups),
    depositStatus,
    fuelIn,
    openGroups: Number(openGroups),
    reason,
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
