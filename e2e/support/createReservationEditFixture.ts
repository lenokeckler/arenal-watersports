import {
  E2E_RESERVATION_EDIT,
  E2E_RESERVATION_EDIT_SEED,
  E2E_RESERVATION_EDIT_SQL,
} from "../constants/E2eReservationEdit.constants";
import { buildE2eCustomerName } from "./buildE2eCustomerName";
import type { ReservationEditFixture } from "./models/ReservationEditFixture.interface";
import { runWorkerSql } from "./runWorkerSql";

export const createReservationEditFixture = async (
  workerId: string,
  overrides: Readonly<Record<string, string>> = {}
): Promise<ReservationEditFixture> => {
  const customerName = buildE2eCustomerName();
  const id = await runWorkerSql(
    E2E_RESERVATION_EDIT.SEED_OPERATION,
    E2E_RESERVATION_EDIT_SQL.SEED,
    workerId,
    {
      ...E2E_RESERVATION_EDIT_SEED.SCHEDULED,
      ...overrides,
      customer: customerName,
    }
  );
  return { customerName, id };
};
