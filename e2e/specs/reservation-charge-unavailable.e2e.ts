import { RESERVATION_STATUS } from "@/app/constants";
import { RESERVATION_CHARGE_UNAVAILABLE_COPY as unavailable } from "@/app/features/reservations/reservation-charge/constants/ReservationChargeUnavailableCopy.constants";
import { E2E_RESERVATION_CHARGE as values } from "../constants/E2eReservationCharge.constants";
import { createReservationChargePage } from "../pages/ReservationCharge.page";
import { createReservationDetailPage } from "../pages/ReservationDetail.page";
import { createReservationDetailChargePage } from "../pages/ReservationDetailCharge.page";
import { expect, test } from "../support/activeWorkerTest";
import { createReservationChargeFixture as seedCharge } from "../support/createReservationChargeFixture";
import { readReservationChargeState } from "../support/readReservationChargeState";
import { removeReservationChargeFixtures } from "../support/removeReservationChargeFixtures";
import { signInToReservationsMode } from "../support/signInToReservationsMode";

test.describe("Reservation charge unavailable", () => {
  test.describe.configure({ mode: values.TEST_MODE });

  test.beforeEach(async ({ activeWorker, page }) => {
    await signInToReservationsMode(page, activeWorker);
  });

  test.afterEach(async ({ activeWorker }) => {
    await removeReservationChargeFixtures(activeWorker);
  });

  test("shows the unavailable state for a cancelled reservation and no charge link in its detail", async ({
    activeWorker,
    page,
  }, testInfo) => {
    const reservation = await seedCharge(
      activeWorker.id,
      testInfo.project.name,
      RESERVATION_STATUS.CANCELLED
    );
    const charge = createReservationChargePage(page);
    const detail = createReservationDetailPage(page);

    await charge.goTo(reservation.id);
    await expect(
      charge.getText(unavailable.TITLE)
    ).toBeVisible();

    await detail.goTo(reservation.id);
    await expect(
      detail.getReservationHeading(reservation.customerName)
    ).toBeVisible();
    await expect(
      createReservationDetailChargePage(page).getChargeLink(
        reservation.code
      )
    ).toHaveCount(0);
    const state = await readReservationChargeState(
      activeWorker.id,
      reservation.id
    );
    expect(state.charges).toBe(0);
  });
});
