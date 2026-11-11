import { render } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { notFound } from "next/navigation";
import { PATHS } from "@/app/constants";
import { assertReservationCalendarAccess } from "@/app/services/reservations/assertReservationCalendarAccess";
import ReservationCancellation from "../ReservationCancellation";
import { RESERVATION_CANCELLATION_UI_COPY as COPY } from "../constants/ReservationCancellationUiCopy.constants";
import { RESERVATION_CANCELLATION_UNAVAILABLE_COPY as UNAVAILABLE } from "../constants/ReservationCancellationUnavailableCopy.constants";
import { getReservationCancellation } from "../services/getReservationCancellation";
import {
  CANCELLATION_ACCESS_REDIRECT,
  CANCELLATION_RESERVATION_ID,
  EXPECTED_SCHEDULED,
  NOT_CANCELLABLE_STATUSES,
} from "./ReservationCancellation.constants";
import { createReservationCancellationPage } from "./ReservationCancellation.page";

const NEXT_NOT_FOUND = "NEXT_NOT_FOUND";
const EXPECTED_DATE_TIME =
  "lunes, 2 de noviembre de 2026, 14:30";
const EXPECTED_EQUIPMENT = [
  "Kayak doblex 3",
  "Lancha BENNINGTON",
];

vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error(NEXT_NOT_FOUND);
  }),
}));
vi.mock(
  "@/app/services/reservations/assertReservationCalendarAccess",
  () => ({ assertReservationCalendarAccess: vi.fn() })
);
vi.mock("../services/getReservationCancellation", () => ({
  getReservationCancellation: vi.fn(),
}));

const renderEntry = () =>
  ReservationCancellation({
    reservationId: CANCELLATION_RESERVATION_ID,
  });

describe("ReservationCancellation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(
      assertReservationCalendarAccess
    ).mockResolvedValue(undefined);
  });

  it("checks reservations access before reading", async () => {
    vi.mocked(
      assertReservationCalendarAccess
    ).mockRejectedValue(CANCELLATION_ACCESS_REDIRECT);

    await expect(renderEntry()).rejects.toBe(
      CANCELLATION_ACCESS_REDIRECT
    );
    expect(
      getReservationCancellation
    ).not.toHaveBeenCalled();
  });

  it("answers not found for an unknown reservation", async () => {
    vi.mocked(getReservationCancellation).mockResolvedValue(
      null
    );

    await expect(renderEntry()).rejects.toThrow(
      NEXT_NOT_FOUND
    );
    expect(notFound).toHaveBeenCalledTimes(1);
  });

  it("shows the reservation to cancel under the title", async () => {
    vi.mocked(getReservationCancellation).mockResolvedValue(
      EXPECTED_SCHEDULED
    );

    render(await renderEntry());
    const page = createReservationCancellationPage();

    expect(page.getHeading(COPY.TITLE)).toBeInTheDocument();
    expect(
      page.queryText(EXPECTED_SCHEDULED.code)
    ).not.toBeNull();
    expect(
      page.queryText(EXPECTED_SCHEDULED.customerName)
    ).not.toBeNull();
    expect(
      page.queryText(EXPECTED_DATE_TIME)
    ).not.toBeNull();
    expect(page.getListItemTexts()).toEqual(
      EXPECTED_EQUIPMENT
    );
    expect(page.getCalendarLinkTargets()).toEqual([
      PATHS.RESERVATIONS.CALENDAR,
    ]);
    expect(page.queryStatus()).toBeNull();
  });

  it.each(NOT_CANCELLABLE_STATUSES)(
    "explains why a %s reservation cannot be cancelled here",
    async (status) => {
      vi.mocked(
        getReservationCancellation
      ).mockResolvedValue({
        ...EXPECTED_SCHEDULED,
        isCancellable: false,
        status,
      });

      render(await renderEntry());
      const page = createReservationCancellationPage();

      expect(page.getStatusText()).toContain(
        UNAVAILABLE.BODY[status]
      );
      expect(page.getStatusText()).toContain(
        UNAVAILABLE.RULE
      );
      expect(
        page.queryText(EXPECTED_SCHEDULED.code)
      ).toBeNull();
      expect(page.getCalendarLinkTargets()).toEqual([
        PATHS.RESERVATIONS.CALENDAR,
        PATHS.RESERVATIONS.CALENDAR,
      ]);
    }
  );
});
