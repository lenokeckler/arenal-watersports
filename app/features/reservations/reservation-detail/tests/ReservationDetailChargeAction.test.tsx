import { describe, expect, it } from "vitest";
import { RESERVATION_STATUS } from "@/app/constants";
import { RESERVATION_DETAIL_SOURCE_FIXTURE } from "./ReservationDetailSourceFixture.constants";
import { RESERVATION_DETAIL_TEST } from "./ReservationDetailTest.constants";
import { renderReservationDetail } from "./ReservationDetailTestRenderer";
import { createReservationDetailChargesPage } from "./ReservationDetailCharges.page";

const CHARGE_HREF = `/reservations/${RESERVATION_DETAIL_TEST.RESERVATION_ID}/charge`;

describe("reservation detail charge link", (): void => {
  it.each([
    RESERVATION_STATUS.SCHEDULED,
    RESERVATION_STATUS.DISPATCHED,
    RESERVATION_STATUS.CLOSED,
  ])(
    "links to the charge screen when %s",
    (status): void => {
      renderReservationDetail({
        ...RESERVATION_DETAIL_SOURCE_FIXTURE,
        status,
      });

      expect(
        createReservationDetailChargesPage().getChargeLink()
      ).toHaveAttribute("href", CHARGE_HREF);
    }
  );

  it("hides the link when the reservation is cancelled", (): void => {
    renderReservationDetail({
      ...RESERVATION_DETAIL_SOURCE_FIXTURE,
      status: RESERVATION_STATUS.CANCELLED,
    });

    expect(
      createReservationDetailChargesPage().queryChargeLink()
    ).toBeNull();
  });

  it("hides the link when the reservation is a split child", (): void => {
    renderReservationDetail({
      ...RESERVATION_DETAIL_SOURCE_FIXTURE,
      parent_reservation_id:
        RESERVATION_DETAIL_TEST.PARENT_RESERVATION_ID,
    });

    expect(
      createReservationDetailChargesPage().queryChargeLink()
    ).toBeNull();
  });
});
