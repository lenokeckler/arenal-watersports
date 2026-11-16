import { describe, expect, it } from "vitest";
import { RESERVATION_STATUS } from "@/app/constants";
import { resolveReservationRefundPath } from "@/app/utils/reservations/resolveReservationRefundPath";
import { RESERVATION_DETAIL_CHARGES_COPY } from "../constants/ReservationDetailChargesCopy.constants";
import {
  RESERVATION_DETAIL_CHARGE_KIND,
  RESERVATION_DETAIL_CURRENCY,
} from "../constants/ReservationDetail.constants";
import { RESERVATION_DETAIL_SOURCE_FIXTURE } from "./ReservationDetailSourceFixture.constants";
import { RESERVATION_DETAIL_TEST } from "./ReservationDetailTest.constants";
import { renderReservationDetail } from "./ReservationDetailTestRenderer";
import { createReservationDetailChargesPage } from "./ReservationDetailCharges.page";
import { createReservationDetailChargeSource } from "./createReservationDetailChargeSource";
import { createReservationDetailRefundSource } from "./createReservationDetailRefundSource";

const REFUND_HREF = resolveReservationRefundPath(
  RESERVATION_DETAIL_TEST.RESERVATION_ID
);

describe("reservation detail refund link", (): void => {
  it("links to the refund screen with its label when a tariff charge was recorded", (): void => {
    renderReservationDetail(
      RESERVATION_DETAIL_SOURCE_FIXTURE
    );

    const link =
      createReservationDetailChargesPage().getRefundLink();

    expect(link).toHaveAttribute("href", REFUND_HREF);
    expect(link).toHaveAccessibleName(
      RESERVATION_DETAIL_CHARGES_COPY.RECORD_REFUND_LABEL(
        RESERVATION_DETAIL_TEST.RESERVATION_CODE
      )
    );
    expect(link).toHaveTextContent(
      RESERVATION_DETAIL_CHARGES_COPY.RECORD_REFUND
    );
  });

  it("shows the link when only an extra time charge was recorded", (): void => {
    renderReservationDetail({
      ...RESERVATION_DETAIL_SOURCE_FIXTURE,
      reservation_charges: [
        createReservationDetailChargeSource({
          kind: RESERVATION_DETAIL_CHARGE_KIND.EXTRA_TIME,
        }),
      ],
    });

    expect(
      createReservationDetailChargesPage().getRefundLink()
    ).toHaveAttribute("href", REFUND_HREF);
  });

  it("hides the link when nothing was charged", (): void => {
    renderReservationDetail({
      ...RESERVATION_DETAIL_SOURCE_FIXTURE,
      reservation_charges: [],
    });

    expect(
      createReservationDetailChargesPage().queryRefundLink()
    ).toBeNull();
  });

  it("hides the link when everything charged was refunded", (): void => {
    renderReservationDetail({
      ...RESERVATION_DETAIL_SOURCE_FIXTURE,
      refunds: [
        createReservationDetailRefundSource({
          amount: RESERVATION_DETAIL_TEST.CHARGE_CRC,
          currency: RESERVATION_DETAIL_CURRENCY.CRC,
        }),
        createReservationDetailRefundSource({
          amount: RESERVATION_DETAIL_TEST.CHARGE_USD,
          currency: RESERVATION_DETAIL_CURRENCY.USD,
        }),
      ],
    });

    expect(
      createReservationDetailChargesPage().queryRefundLink()
    ).toBeNull();
  });

  it.each([
    RESERVATION_STATUS.CLOSED,
    RESERVATION_STATUS.CANCELLED,
  ])(
    "shows the link on a %s reservation",
    (status): void => {
      renderReservationDetail({
        ...RESERVATION_DETAIL_SOURCE_FIXTURE,
        status,
      });

      expect(
        createReservationDetailChargesPage().getRefundLink()
      ).toHaveAttribute("href", REFUND_HREF);
    }
  );

  it("hides the link on a split child", (): void => {
    renderReservationDetail({
      ...RESERVATION_DETAIL_SOURCE_FIXTURE,
      parent_reservation_id:
        RESERVATION_DETAIL_TEST.PARENT_RESERVATION_ID,
    });

    expect(
      createReservationDetailChargesPage().queryRefundLink()
    ).toBeNull();
  });
});
