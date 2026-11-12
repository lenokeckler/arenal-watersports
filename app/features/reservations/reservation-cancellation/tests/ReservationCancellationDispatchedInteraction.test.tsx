import { act, waitFor } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { cancelReservationAction } from "../actions/cancelReservationAction";
import { RESERVATION_CANCELLATION_CAUSE } from "../constants/ReservationCancellationCause.constants";
import { RESERVATION_CANCELLATION_CAUSE_COPY } from "../constants/ReservationCancellationCauseCopy.constants";
import { RESERVATION_CANCELLATION_FEEDBACK_COPY as FEEDBACK } from "../constants/ReservationCancellationFeedbackCopy.constants";
import type { ReservationCancellationActionResult } from "../models/ReservationCancellationActionResult.type";
import {
  CANCELLATION_REASON,
  EXPECTED_DISPATCHED,
} from "./ReservationCancellation.constants";
import { renderReservationCancellationView as renderView } from "./renderReservationCancellationView";

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

describe("ReservationCancellationView dispatched interaction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("selects the next cause with the arrow key", async () => {
    const page = renderView();

    await page.selectCause(WEATHER_OPTION.label);
    await page.pressKey("{ArrowDown}");

    expect(
      page.getCause(TRIP_PROBLEM_OPTION.label)
    ).toBeChecked();
    expect(
      page.getCause(WEATHER_OPTION.label)
    ).not.toBeChecked();
  });

  it("keeps the chosen cause and blocks a second send after a stale refusal", async () => {
    vi.mocked(cancelReservationAction).mockResolvedValue({
      ok: false,
      errors: {},
      formError: FEEDBACK.STALE,
    });
    const page = renderView();

    await page.selectCause(TRIP_PROBLEM_OPTION.label);
    await page.typeReason(CANCELLATION_REASON);
    await page.submit();

    await waitFor(() =>
      expect(page.getAlertText()).toBe(FEEDBACK.STALE)
    );
    await page.selectCause(WEATHER_OPTION.label);
    expect(page.getAlertText()).toBe(FEEDBACK.STALE);
    expect(page.getSubmit()).toBeDisabled();
    expect(cancelReservationAction).toHaveBeenCalledTimes(
      1
    );
  });

  it("locks the causes and sends once while the cancellation is pending", async () => {
    let finish: (
      result: ReservationCancellationActionResult
    ) => void = () => undefined;
    vi.mocked(cancelReservationAction).mockReturnValue(
      new Promise((resolve) => {
        finish = resolve;
      })
    );
    const page = renderView();

    await page.selectCause(WEATHER_OPTION.label);
    await page.typeReason(CANCELLATION_REASON);
    await page.submit();

    expect(
      page.getCause(TRIP_PROBLEM_OPTION.label)
    ).toBeDisabled();
    expect(cancelReservationAction).toHaveBeenCalledTimes(
      1
    );

    await act(() => {
      finish({
        ok: true,
        reservationId: EXPECTED_DISPATCHED.id,
      });
      return Promise.resolve();
    });
  });
});
