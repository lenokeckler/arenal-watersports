import { render } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS } from "@/app/constants";
import { assertReservationCalendarAccess } from "@/app/services/reservations/assertReservationCalendarAccess";
import ReservationCancellation from "../ReservationCancellation";
import { RESERVATION_CANCELLATION_UNAVAILABLE_COPY as UNAVAILABLE } from "../constants/ReservationCancellationUnavailableCopy.constants";
import { getReservationCancellation } from "../services/getReservationCancellation";
import {
  CANCELLATION_RESERVATION_ID,
  EXPECTED_SCHEDULED,
  NOT_CANCELLABLE_STATUSES,
  EXPECTED_DISPATCHED,
} from "./ReservationCancellation.constants";
import { createReservationCancellationPage } from "./ReservationCancellation.page";

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

describe("ReservationCancellation by status", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(
      assertReservationCalendarAccess
    ).mockResolvedValue(undefined);
  });

  it("renders the cancellation form for a dispatched reservation", async () => {
    vi.mocked(getReservationCancellation).mockResolvedValue(
      EXPECTED_DISPATCHED
    );

    render(await renderEntry());
    const page = createReservationCancellationPage();

    expect(
      page.queryText(EXPECTED_DISPATCHED.code)
    ).not.toBeNull();
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
