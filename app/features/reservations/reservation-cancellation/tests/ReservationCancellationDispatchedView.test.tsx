import { waitFor } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { RESERVATION_STATUS } from "@/app/constants";
import { cancelReservationAction } from "../actions/cancelReservationAction";
import { RESERVATION_CANCELLATION_CAUSE } from "../constants/ReservationCancellationCause.constants";
import { RESERVATION_CANCELLATION_CAUSE_COPY } from "../constants/ReservationCancellationCauseCopy.constants";
import { RESERVATION_CANCELLATION_FEEDBACK_COPY as FEEDBACK } from "../constants/ReservationCancellationFeedbackCopy.constants";
import { RESERVATION_CANCELLATION_FORM_COPY as COPY } from "../constants/ReservationCancellationFormCopy.constants";
import {
  CANCELLATION_CAUSE,
  CANCELLATION_REASON,
  EXPECTED_DISPATCHED,
  EXPECTED_SCHEDULED,
} from "./ReservationCancellation.constants";
import { renderReservationCancellationView } from "./renderReservationCancellationView";

vi.mock("../actions/cancelReservationAction", () => ({
  cancelReservationAction: vi.fn(),
}));

const WEATHER_OPTION =
  RESERVATION_CANCELLATION_CAUSE_COPY[
    RESERVATION_CANCELLATION_CAUSE.WEATHER
  ];
const TRIP_PROBLEM_OPTION =
  RESERVATION_CANCELLATION_CAUSE_COPY[
    RESERVATION_CANCELLATION_CAUSE.TRIP_PROBLEM
  ];

describe("ReservationCancellationView for a dispatched reservation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("explains the trip is in progress and offers both causes unselected", () => {
    const page = renderReservationCancellationView();

    expect(
      page.queryText(COPY.NOTE_DISPATCHED)
    ).not.toBeNull();
    expect(page.queryText(COPY.NOTE)).toBeNull();
    expect(page.getCauseGroup()).toBeInTheDocument();
    expect(
      page.getCause(WEATHER_OPTION.label)
    ).not.toBeChecked();
    expect(
      page.getCause(TRIP_PROBLEM_OPTION.label)
    ).not.toBeChecked();
    expect(
      page.queryText(COPY.REASON_HELPER_DISPATCHED)
    ).not.toBeNull();
  });

  it("shows no cause field for a scheduled reservation", () => {
    const page = renderReservationCancellationView(
      EXPECTED_SCHEDULED
    );

    expect(page.queryCauseGroup()).toBeNull();
    expect(page.queryText(COPY.NOTE)).not.toBeNull();
  });

  it("cancels with the chosen cause and keeps confirming that operations still records the return after the refresh", async () => {
    vi.mocked(cancelReservationAction).mockResolvedValue({
      ok: true,
      reservationId: EXPECTED_DISPATCHED.id,
    });
    const page = renderReservationCancellationView();

    await page.selectCause(WEATHER_OPTION.label);
    await page.typeReason(`  ${CANCELLATION_REASON} `);
    await page.submit();

    await waitFor(() =>
      expect(page.getStatusText()).toBe(
        COPY.SUCCESS_DISPATCHED(EXPECTED_DISPATCHED.code)
      )
    );
    expect(cancelReservationAction).toHaveBeenCalledWith({
      cause: CANCELLATION_CAUSE,
      expectedUpdatedAt:
        EXPECTED_DISPATCHED.expectedUpdatedAt,
      reason: CANCELLATION_REASON,
      reservationId: EXPECTED_DISPATCHED.id,
    });
    page.refresh({
      ...EXPECTED_DISPATCHED,
      requiresCause: false,
      status: RESERVATION_STATUS.CANCELLED,
    });
    expect(page.getStatusText()).toBe(
      COPY.SUCCESS_DISPATCHED(EXPECTED_DISPATCHED.code)
    );
  });

  it("shows a cause refused by the server under the field", async () => {
    vi.mocked(cancelReservationAction).mockResolvedValue({
      ok: false,
      errors: { cause: FEEDBACK.CAUSE_REQUIRED },
    });
    const page = renderReservationCancellationView();

    await page.selectCause(WEATHER_OPTION.label);
    await page.typeReason(CANCELLATION_REASON);
    await page.submit();

    await waitFor(() =>
      expect(
        page.queryText(FEEDBACK.CAUSE_REQUIRED)
      ).not.toBeNull()
    );
    expect(
      page.getCause(WEATHER_OPTION.label)
    ).toHaveFocus();
  });
});
