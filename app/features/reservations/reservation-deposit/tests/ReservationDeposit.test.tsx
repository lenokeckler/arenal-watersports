import { render, screen } from "@testing-library/react";
import { notFound } from "next/navigation";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  ARIA_ROLE,
  RESERVATION_DEPOSIT_DECISION_KIND,
} from "@/app/constants";
import { assertReservationCalendarAccess } from "@/app/services/reservations/assertReservationCalendarAccess";
import ReservationDeposit from "../ReservationDeposit";
import { RESERVATION_DEPOSIT_FORM_COPY as COPY } from "../constants/ReservationDepositFormCopy.constants";
import { RESERVATION_DEPOSIT_UNAVAILABLE_COPY as UNAVAILABLE } from "../constants/ReservationDepositUnavailableCopy.constants";
import { getReservationDeposit } from "../services/getReservationDeposit";
import {
  DEPOSIT_RESERVATION_ID,
  UNDECIDED_DEPOSIT,
} from "./ReservationDeposit.constants";
import { DEPOSIT_ACCESS_REDIRECT } from "./ReservationDepositAction.constants";

const SCREEN_NOT_FOUND = "NEXT_NOT_FOUND";

vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error(SCREEN_NOT_FOUND);
  }),
}));
vi.mock(
  "@/app/services/reservations/assertReservationCalendarAccess",
  () => ({ assertReservationCalendarAccess: vi.fn() })
);
vi.mock("../services/getReservationDeposit", () => ({
  getReservationDeposit: vi.fn(),
}));

const renderEntry = () =>
  ReservationDeposit({
    reservationId: DEPOSIT_RESERVATION_ID,
  });

describe("ReservationDeposit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(
      assertReservationCalendarAccess
    ).mockResolvedValue(undefined);
  });

  it("checks reservations access before reading", async () => {
    vi.mocked(
      assertReservationCalendarAccess
    ).mockRejectedValue(DEPOSIT_ACCESS_REDIRECT);

    await expect(renderEntry()).rejects.toBe(
      DEPOSIT_ACCESS_REDIRECT
    );
    expect(getReservationDeposit).not.toHaveBeenCalled();
  });

  it("answers not found for an unknown reservation", async () => {
    vi.mocked(getReservationDeposit).mockResolvedValue(
      null
    );

    await expect(renderEntry()).rejects.toThrow(
      SCREEN_NOT_FOUND
    );
    expect(notFound).toHaveBeenCalledTimes(1);
  });

  it("shows the form for an undecided reservation", async () => {
    vi.mocked(getReservationDeposit).mockResolvedValue(
      UNDECIDED_DEPOSIT
    );

    render(await renderEntry());

    expect(
      screen.getByRole(ARIA_ROLE.GROUP, {
        name: COPY.DECISION_LEGEND,
      })
    ).toBeDefined();
    expect(getReservationDeposit).toHaveBeenCalledWith(
      DEPOSIT_RESERVATION_ID
    );
  });

  it("shows why a decided reservation has no form", async () => {
    vi.mocked(getReservationDeposit).mockResolvedValue({
      ...UNDECIDED_DEPOSIT,
      decision: {
        kind: RESERVATION_DEPOSIT_DECISION_KIND.DECLINED,
      },
    });

    render(await renderEntry());

    expect(
      screen.getByText(UNAVAILABLE.TITLE.already_decided)
    ).toBeDefined();
    expect(
      screen.queryByRole(ARIA_ROLE.GROUP, {
        name: COPY.DECISION_LEGEND,
      })
    ).toBeNull();
  });
});
