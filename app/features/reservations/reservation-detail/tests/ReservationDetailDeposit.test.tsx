import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  ARIA_ROLE,
  CURRENCY_CODE,
  RESERVATION_DEPOSIT_DECISION_KIND,
  RESERVATION_STATUS,
} from "@/app/constants";
import { resolveReservationDepositPath } from "@/app/utils/reservations/resolveReservationDepositPath";
import { RESERVATION_DETAIL_CHARGES_COPY as COPY } from "../constants/ReservationDetailChargesCopy.constants";
import { mapReservationDetailDeposit } from "../utils/mapReservationDetailDeposit";
import { formatReservationDetailAmount } from "../utils/formatReservationDetailAmount";
import { RESERVATION_DETAIL_SOURCE_FIXTURE } from "./ReservationDetailSourceFixture.constants";
import { RESERVATION_DETAIL_TEST } from "./ReservationDetailTest.constants";
import { renderReservationDetail } from "./ReservationDetailTestRenderer";

const DEPOSIT_LINK_QUERY = {
  name: COPY.RECORD_DEPOSIT_LABEL(
    RESERVATION_DETAIL_TEST.RESERVATION_CODE
  ),
};

const RECEIVED_DEPOSITS = [
  { amount: 175, currency: CURRENCY_CODE.USD },
];

const DECLINATION = {
  reservation_id: RESERVATION_DETAIL_TEST.RESERVATION_ID,
};

const queryDepositLink = () =>
  screen.queryByRole(ARIA_ROLE.LINK, DEPOSIT_LINK_QUERY);

describe("reservation detail deposit", (): void => {
  it("links to the deposit screen while nothing was recorded", (): void => {
    renderReservationDetail({
      ...RESERVATION_DETAIL_SOURCE_FIXTURE,
      status: RESERVATION_STATUS.SCHEDULED,
    });

    expect(queryDepositLink()).toHaveAttribute(
      "href",
      resolveReservationDepositPath(
        RESERVATION_DETAIL_TEST.RESERVATION_ID
      )
    );
    expect(queryDepositLink()).toHaveTextContent(
      COPY.RECORD_DEPOSIT
    );
    expect(screen.queryByText(COPY.DEPOSIT)).toBeNull();
  });

  it("shows the received amount and no button", (): void => {
    renderReservationDetail({
      ...RESERVATION_DETAIL_SOURCE_FIXTURE,
      deposits: RECEIVED_DEPOSITS,
      status: RESERVATION_STATUS.SCHEDULED,
    });

    expect(screen.getByText(COPY.DEPOSIT)).toBeDefined();
    expect(
      screen.getByText(
        formatReservationDetailAmount(
          175,
          CURRENCY_CODE.USD
        ),
        { normalizer: (text: string): string => text }
      )
    ).toBeDefined();
    expect(queryDepositLink()).toBeNull();
  });

  it("shows no deposit and no button after the no answer", (): void => {
    renderReservationDetail({
      ...RESERVATION_DETAIL_SOURCE_FIXTURE,
      deposit_declination: DECLINATION,
      status: RESERVATION_STATUS.SCHEDULED,
    });

    expect(
      screen.getByText(COPY.DEPOSIT_NONE)
    ).toBeDefined();
    expect(queryDepositLink()).toBeNull();
  });

  it.each([
    [
      "a closed reservation",
      { status: RESERVATION_STATUS.CLOSED },
    ],
    [
      "a split child",
      {
        parent_reservation_id:
          RESERVATION_DETAIL_TEST.CREATED_WORKER_ID,
        status: RESERVATION_STATUS.SCHEDULED,
      },
    ],
  ])("offers no button on %s", (_, overrides): void => {
    renderReservationDetail({
      ...RESERVATION_DETAIL_SOURCE_FIXTURE,
      ...overrides,
    });

    expect(queryDepositLink()).toBeNull();
  });
});

describe("mapReservationDetailDeposit", (): void => {
  it.each([
    [
      "undecided",
      { deposit_declination: null, deposits: [] },
      { kind: RESERVATION_DEPOSIT_DECISION_KIND.UNDECIDED },
    ],
    [
      "declined",
      { deposit_declination: DECLINATION, deposits: [] },
      { kind: RESERVATION_DEPOSIT_DECISION_KIND.DECLINED },
    ],
    [
      "received",
      {
        deposit_declination: null,
        deposits: RECEIVED_DEPOSITS,
      },
      {
        ...RECEIVED_DEPOSITS[0],
        kind: RESERVATION_DEPOSIT_DECISION_KIND.RECEIVED,
      },
    ],
  ])("reads an %s deposit", (_, source, expected): void => {
    expect(mapReservationDetailDeposit(source)).toEqual(
      expected
    );
  });
});
