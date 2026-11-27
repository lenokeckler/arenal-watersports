import { RESERVATION_STATUS } from "@/app/constants";
import { createReservationChargeFixture } from "./createReservationChargeFixture";
import type { ReservationChargeFixture } from "./models/ReservationChargeFixture.interface";
import type { ReservationChargeFixtureStatus } from "./models/ReservationChargeFixtureStatus.type";
import { setE2eCategoryDeposit } from "./setE2eCategoryDeposit";

export const createReservationDepositFixture = async (
  workerId: string,
  projectName: string,
  status: ReservationChargeFixtureStatus = RESERVATION_STATUS.SCHEDULED
): Promise<ReservationChargeFixture> => {
  await setE2eCategoryDeposit(workerId, projectName, true);

  return createReservationChargeFixture(
    workerId,
    projectName,
    status
  );
};
