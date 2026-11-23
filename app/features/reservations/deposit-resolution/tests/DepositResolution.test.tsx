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
  DEPOSIT_STATUS,
  RESERVATION_STATUS,
} from "@/app/constants";
import { assertReservationCalendarAccess } from "@/app/services/reservations/assertReservationCalendarAccess";
import DepositResolution from "../DepositResolution";
import { DEPOSIT_RESOLUTION_FORM_COPY as COPY } from "../constants/DepositResolutionFormCopy.constants";
import { DEPOSIT_RESOLUTION_UNAVAILABLE_COPY as UNAVAILABLE } from "../constants/DepositResolutionUnavailableCopy.constants";
import { getDepositResolution } from "../services/getDepositResolution";
import {
  CLOSED_DEPOSIT,
  RESOLUTION_DEPOSIT_ID,
} from "./DepositResolution.constants";
import { RESOLUTION_ACCESS_REDIRECT } from "./DepositResolutionAction.constants";

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
vi.mock("../services/getDepositResolution", () => ({
  getDepositResolution: vi.fn(),
}));

const renderEntry = () =>
  DepositResolution({ depositId: RESOLUTION_DEPOSIT_ID });

describe("DepositResolution", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(
      assertReservationCalendarAccess
    ).mockResolvedValue(undefined);
  });

  it("checks reservations access before reading", async () => {
    vi.mocked(
      assertReservationCalendarAccess
    ).mockRejectedValue(RESOLUTION_ACCESS_REDIRECT);

    await expect(renderEntry()).rejects.toBe(
      RESOLUTION_ACCESS_REDIRECT
    );
    expect(getDepositResolution).not.toHaveBeenCalled();
  });

  it("answers not found for an unknown deposit", async () => {
    vi.mocked(getDepositResolution).mockResolvedValue(null);

    await expect(renderEntry()).rejects.toThrow(
      SCREEN_NOT_FOUND
    );
    expect(notFound).toHaveBeenCalledTimes(1);
  });

  it("shows the form for a held deposit of a closed trip", async () => {
    vi.mocked(getDepositResolution).mockResolvedValue(
      CLOSED_DEPOSIT
    );

    render(await renderEntry());

    expect(
      screen.getByRole(ARIA_ROLE.GROUP, {
        name: COPY.CHOICE_LEGEND,
      })
    ).toBeDefined();
  });

  it.each([
    [
      "trip_not_closed",
      {
        ...CLOSED_DEPOSIT,
        reservationStatus: RESERVATION_STATUS.DISPATCHED,
      },
    ],
    [
      "already_resolved",
      {
        ...CLOSED_DEPOSIT,
        status: DEPOSIT_STATUS.RETURNED,
      },
    ],
  ] as const)(
    "explains %s without a form",
    async (reason, deposit) => {
      vi.mocked(getDepositResolution).mockResolvedValue(
        deposit
      );

      render(await renderEntry());

      expect(
        screen.getByText(UNAVAILABLE.TITLE[reason])
      ).toBeDefined();
      expect(
        screen.queryByRole(ARIA_ROLE.BUTTON)
      ).toBeNull();
    }
  );
});
