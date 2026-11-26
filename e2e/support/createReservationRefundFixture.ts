import { RESERVATION_STATUS } from "@/app/constants";
import { E2E_RESERVATION_REFUND as values } from "../constants/E2eReservationRefund.constants";
import { createReservationChargeFixture } from "./createReservationChargeFixture";
import { createServiceRoleClient } from "./createServiceRoleClient";
import { insertE2eCharge } from "./insertE2eCharge";
import type { E2eChargeSeed } from "./models/E2eChargeSeed.interface";
import type { ReservationChargeFixture } from "./models/ReservationChargeFixture.interface";
import type { ReservationChargeFixtureStatus } from "./models/ReservationChargeFixtureStatus.type";

export const createReservationRefundFixture = async (
  workerId: string,
  projectName: string,
  charges: readonly E2eChargeSeed[],
  status: ReservationChargeFixtureStatus = RESERVATION_STATUS.SCHEDULED
): Promise<ReservationChargeFixture> => {
  const reservation = await createReservationChargeFixture(
    workerId,
    projectName,
    status
  );
  const supabase = createServiceRoleClient();
  for (const charge of charges) {
    await insertE2eCharge(
      supabase,
      workerId,
      reservation.id,
      values.CHARGE_PAYMENT_METHOD,
      charge
    );
  }

  return reservation;
};
