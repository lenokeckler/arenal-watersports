import { E2E_RESERVATION_CANCELLATION_SLOT_BY_PROJECT as slotByProject } from "../constants/E2eReservationCancellation.constants";
import {
  E2E_RESERVATION_DISPATCHED_CANCELLATION as values,
  E2E_RESERVATION_DISPATCHED_CANCELLATION_SQL as sql,
} from "../constants/E2eReservationDispatchedCancellation.constants";
import { createReservationCancellationFixture } from "./createReservationCancellationFixture";
import type { DispatchedCancellationFixture } from "./models/DispatchedCancellationFixture.interface";
import { runWorkerSql } from "./runWorkerSql";

export const createDispatchedCancellationFixture = async (
  workerId: string,
  projectName: string
): Promise<DispatchedCancellationFixture> => {
  const reservation =
    await createReservationCancellationFixture(
      workerId,
      projectName
    );
  const { unit: unitCode } = slotByProject[projectName];

  await runWorkerSql(
    values.FIXTURE_OPERATION,
    sql.SEED_DISPATCH,
    workerId,
    {
      fuel_out: values.FUEL_OUT,
      reservation: reservation.id,
      unit: unitCode,
      usage_out: values.USAGE_OUT,
    }
  );

  return { ...reservation, unitCode };
};
