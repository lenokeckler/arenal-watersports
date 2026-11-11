import { render, waitFor } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { RESERVATION_STATUS } from "@/app/constants";
import { assertReservationCalendarAccess } from "@/app/services/reservations/assertReservationCalendarAccess";
import ReservationCancellation from "../ReservationCancellation";
import { cancelReservationAction } from "../actions/cancelReservationAction";
import { RESERVATION_CANCELLATION_CAUSE } from "../constants/ReservationCancellationCause.constants";
import { RESERVATION_CANCELLATION_CAUSE_COPY } from "../constants/ReservationCancellationCauseCopy.constants";
import { RESERVATION_CANCELLATION_FORM_COPY as FORM } from "../constants/ReservationCancellationFormCopy.constants";
import { getReservationCancellation } from "../services/getReservationCancellation";
import {
  CANCELLATION_REASON,
  CANCELLATION_RESERVATION_ID,
  EXPECTED_DISPATCHED,
} from "./ReservationCancellation.constants";
import { createReservationCancellationViewPage } from "./ReservationCancellationView.page";

vi.mock(
  "@/app/services/reservations/assertReservationCalendarAccess",
  () => ({ assertReservationCalendarAccess: vi.fn() })
);
vi.mock("../services/getReservationCancellation", () => ({
  getReservationCancellation: vi.fn(),
}));
vi.mock("../actions/cancelReservationAction", () => ({
  cancelReservationAction: vi.fn(),
}));

const WEATHER_OPTION =
  RESERVATION_CANCELLATION_CAUSE_COPY[
    RESERVATION_CANCELLATION_CAUSE.WEATHER
  ];

const renderEntry = () =>
  ReservationCancellation({
    reservationId: CANCELLATION_RESERVATION_ID,
  });

describe("ReservationCancellation dispatched refresh", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(
      assertReservationCalendarAccess
    ).mockResolvedValue(undefined);
  });

  it("keeps the dispatched confirmation when the action refresh renders the cancelled reservation", async () => {
    vi.mocked(getReservationCancellation).mockResolvedValue(
      EXPECTED_DISPATCHED
    );
    vi.mocked(cancelReservationAction).mockResolvedValue({
      ok: true,
      reservationId: EXPECTED_DISPATCHED.id,
    });
    const { rerender } = render(await renderEntry());
    const page = createReservationCancellationViewPage();

    await page.selectCause(WEATHER_OPTION.label);
    await page.typeReason(CANCELLATION_REASON);
    await page.submit();
    await waitFor(() =>
      expect(page.getStatusText()).toBe(
        FORM.SUCCESS_DISPATCHED(EXPECTED_DISPATCHED.code)
      )
    );
    vi.mocked(getReservationCancellation).mockResolvedValue(
      {
        ...EXPECTED_DISPATCHED,
        isCancellable: false,
        requiresCause: false,
        status: RESERVATION_STATUS.CANCELLED,
      }
    );
    rerender(await renderEntry());

    expect(page.getStatusText()).toBe(
      FORM.SUCCESS_DISPATCHED(EXPECTED_DISPATCHED.code)
    );
  });
});
