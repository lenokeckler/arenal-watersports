import { render, screen } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { notFound } from "next/navigation";
import { ARIA_ROLE } from "@/app/constants";
import { assertReservationCalendarAccess } from "@/app/services/reservations/assertReservationCalendarAccess";
import ReservationExtraTime from "../ReservationExtraTime";
import { RESERVATION_EXTRA_TIME_UNAVAILABLE_REASON as REASON } from "../constants/ReservationExtraTimeUnavailableReason.constants";
import { RESERVATION_EXTRA_TIME_UNAVAILABLE_COPY as UNAVAILABLE } from "../constants/ReservationExtraTimeUnavailableCopy.constants";
import { RESERVATION_EXTRA_TIME_UI_COPY as COPY } from "../constants/ReservationExtraTimeUiCopy.constants";
import { getReservationExtraTime } from "../services/getReservationExtraTime";
import { EXTRA_TIME_RESERVATION_ID } from "./ReservationExtraTime.constants";
import {
  EXTRA_TIME_ACCESS_REDIRECT,
  EXTRA_TIME_NOT_FOUND,
  EXTRA_TIME_RESOLVED,
  EXTRA_TIME_SCREEN,
  EXTRA_TIME_STILL_OUT,
} from "./ReservationExtraTimeScreen.constants";

vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error(EXTRA_TIME_NOT_FOUND);
  }),
}));
vi.mock(
  "@/app/services/reservations/assertReservationCalendarAccess",
  () => ({ assertReservationCalendarAccess: vi.fn() })
);
vi.mock("../services/getReservationExtraTime", () => ({
  getReservationExtraTime: vi.fn(),
}));
vi.mock(
  "../actions/recordReservationExtraTimeAction",
  () => ({
    recordReservationExtraTimeAction: vi.fn(),
  })
);

const renderEntry = async () =>
  render(
    await ReservationExtraTime({
      reservationId: EXTRA_TIME_RESERVATION_ID,
    })
  );

describe("ReservationExtraTime", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(
      assertReservationCalendarAccess
    ).mockResolvedValue(undefined);
  });

  it("checks reservations access before reading", async () => {
    vi.mocked(
      assertReservationCalendarAccess
    ).mockRejectedValue(EXTRA_TIME_ACCESS_REDIRECT);

    await expect(renderEntry()).rejects.toBe(
      EXTRA_TIME_ACCESS_REDIRECT
    );
    expect(getReservationExtraTime).not.toHaveBeenCalled();
  });

  it("answers not found for a missing reservation", async () => {
    vi.mocked(getReservationExtraTime).mockResolvedValue(
      null
    );

    await expect(renderEntry()).rejects.toThrow(
      EXTRA_TIME_NOT_FOUND
    );
    expect(notFound).toHaveBeenCalledOnce();
  });

  it("shows the groups and the form for a closed reservation with extra time", async () => {
    vi.mocked(getReservationExtraTime).mockResolvedValue(
      EXTRA_TIME_SCREEN
    );

    await renderEntry();

    expect(getReservationExtraTime).toHaveBeenCalledWith(
      EXTRA_TIME_RESERVATION_ID
    );
    expect(
      screen.getByRole(ARIA_ROLE.REGION, {
        name: COPY.GROUPS_TITLE,
      })
    ).toBeInTheDocument();
  });

  it.each([
    [
      "a group is still out",
      EXTRA_TIME_STILL_OUT,
      REASON.GROUPS_OUT,
    ],
    [
      "the decision was already made",
      EXTRA_TIME_RESOLVED,
      REASON.RESOLVED,
    ],
  ])(
    "explains why there is nothing to decide when %s",
    async (_, extraTime, reason) => {
      vi.mocked(getReservationExtraTime).mockResolvedValue(
        extraTime
      );

      await renderEntry();

      expect(
        screen.getByRole(ARIA_ROLE.STATUS)
      ).toHaveTextContent(UNAVAILABLE.BODY[reason]);
      expect(
        screen.queryAllByRole(ARIA_ROLE.RADIO)
      ).toHaveLength(0);
    }
  );
});
