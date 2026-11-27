import { RESERVATION_STATUS } from "@/app/constants";
import { E2E_DEPOSIT_RESOLUTION as values } from "../constants/E2eDepositResolution.constants";
import { E2E_DEPOSIT_RESOLUTION_SQL as sql } from "../constants/E2eDepositResolutionSql.constants";
import { createReservationChargeFixture } from "./createReservationChargeFixture";
import type { DepositResolutionFixture } from "./models/DepositResolutionFixture.interface";
import type { ReservationChargeFixtureStatus } from "./models/ReservationChargeFixtureStatus.type";
import { runWorkerSql } from "./runWorkerSql";

export const createDepositResolutionFixture = async (
  workerId: string,
  projectName: string,
  status: ReservationChargeFixtureStatus = RESERVATION_STATUS.CLOSED
): Promise<DepositResolutionFixture> => {
  const reservation = await createReservationChargeFixture(
    workerId,
    projectName,
    status
  );
  const depositId = await runWorkerSql(
    values.SEED_OPERATION,
    sql.SEED,
    workerId,
    {
      amount: String(values.DEPOSIT_AMOUNT),
      reservation: reservation.id,
    }
  );

  return { ...reservation, depositId };
};
