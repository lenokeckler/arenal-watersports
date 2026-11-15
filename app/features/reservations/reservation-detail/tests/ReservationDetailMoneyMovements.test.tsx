import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { formatReservationCalendarDateTime } from "@/app/components/reservation-calendar/utils/formatReservationCalendarDateTime";
import ReservationDetailMoneyMovements from "../components/ReservationDetailMoneyMovements";
import { RESERVATION_DETAIL_CURRENCY } from "../constants/ReservationDetail.constants";
import { RESERVATION_DETAIL_MOVEMENTS_COPY as copy } from "../constants/ReservationDetailMovementsCopy.constants";
import { RESERVATION_DETAIL_SECTIONS_COPY } from "../constants/ReservationDetailSectionsCopy.constants";
import type { ReservationDetailWorkerName } from "../models/ReservationDetailWorkerName.interface";
import { formatReservationDetailAmount } from "../utils/formatReservationDetailAmount";
import { mapReservationDetailMoneyMovements } from "../utils/mapReservationDetailMoneyMovements";
import type { ReservationDetailMoneyMovementsPage } from "./models/ReservationDetailMoneyMovementsPage.interface";
import { createReservationDetailMoneyMovementsPage } from "./ReservationDetailMoneyMovements.page";
import { RESERVATION_DETAIL_MOVEMENTS_TEST as MOVEMENTS_TEST } from "./ReservationDetailMoneyMovementsTest.constants";
import { RESERVATION_DETAIL_SOURCE_FIXTURE } from "./ReservationDetailSourceFixture.constants";
import { createReservationDetailChargeSource } from "./createReservationDetailChargeSource";
import { createReservationDetailRefundSource } from "./createReservationDetailRefundSource";

const WORKER_NAMES: ReservationDetailWorkerName[] = [
  {
    full_name: MOVEMENTS_TEST.CHARGE_WORKER_NAME,
    worker_id: MOVEMENTS_TEST.CHARGE_WORKER_ID,
  },
];

const renderMovements = (
  workerNames: ReservationDetailWorkerName[]
): ReservationDetailMoneyMovementsPage => {
  render(
    <ReservationDetailMoneyMovements
      movements={mapReservationDetailMoneyMovements(
        {
          ...RESERVATION_DETAIL_SOURCE_FIXTURE,
          refunds: [createReservationDetailRefundSource()],
          reservation_charges: [
            createReservationDetailChargeSource(),
          ],
        },
        workerNames
      )}
    />
  );
  return createReservationDetailMoneyMovementsPage();
};

describe("ReservationDetailMoneyMovements", () => {
  it("keeps the list folded until the button is pressed", () => {
    const page = renderMovements(WORKER_NAMES);

    expect(page.getRows()).toHaveLength(0);
    expect(page.queryToggle()).toBeVisible();
  });

  it("lists the refund and the charge with their details", async (): Promise<void> => {
    const user = userEvent.setup();
    const page = renderMovements(WORKER_NAMES);

    await page.clickToggle(user);
    const [refundRow, chargeRow] = page.getRows();

    [
      formatReservationDetailAmount(
        MOVEMENTS_TEST.REFUND_AMOUNT,
        RESERVATION_DETAIL_CURRENCY.CRC
      ),
      RESERVATION_DETAIL_CURRENCY.CRC,
      copy.TYPE_REFUND,
      MOVEMENTS_TEST.REFUND_REASON,
      copy.METHOD_NOT_APPLICABLE,
      formatReservationCalendarDateTime(
        MOVEMENTS_TEST.REFUND_TIMESTAMP
      ),
      RESERVATION_DETAIL_SECTIONS_COPY.MISSING_NAME,
    ].forEach((text) =>
      expect(refundRow).toHaveTextContent(
        text.replace(
          MOVEMENTS_TEST.WHITESPACE,
          MOVEMENTS_TEST.SINGLE_SPACE
        )
      )
    );
    [
      formatReservationDetailAmount(
        MOVEMENTS_TEST.CHARGE_AMOUNT,
        RESERVATION_DETAIL_CURRENCY.CRC
      ),
      copy.TYPE_CHARGE,
      copy.TARIFF_CONCEPT,
      MOVEMENTS_TEST.CHARGE_METHOD,
      formatReservationCalendarDateTime(
        MOVEMENTS_TEST.CHARGE_TIMESTAMP
      ),
      MOVEMENTS_TEST.CHARGE_WORKER_NAME,
    ].forEach((text) =>
      expect(chargeRow).toHaveTextContent(
        text.replace(
          MOVEMENTS_TEST.WHITESPACE,
          MOVEMENTS_TEST.SINGLE_SPACE
        )
      )
    );
  });

  it("shows the empty copy without a button when there are no movements", () => {
    render(
      <ReservationDetailMoneyMovements movements={[]} />
    );
    const page =
      createReservationDetailMoneyMovementsPage();

    expect(page.queryEmpty()).toBeVisible();
    expect(page.queryToggle()).toBeNull();
  });
});
