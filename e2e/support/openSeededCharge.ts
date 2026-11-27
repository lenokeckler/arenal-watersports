import type { Page } from "@playwright/test";
import { createReservationChargePage } from "../pages/ReservationCharge.page";
import { createReservationChargeFixture } from "./createReservationChargeFixture";
import type { ReservationChargeFixture } from "./models/ReservationChargeFixture.interface";

export const openSeededCharge = async (
  page: Page,
  workerId: string,
  projectName: string
): Promise<{
  charge: ReturnType<typeof createReservationChargePage>;
  reservation: ReservationChargeFixture;
}> => {
  const reservation = await createReservationChargeFixture(
    workerId,
    projectName
  );
  const charge = createReservationChargePage(page);
  await charge.goTo(reservation.id);

  return { charge, reservation };
};
