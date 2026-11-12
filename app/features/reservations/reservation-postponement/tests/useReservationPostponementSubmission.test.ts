import { act, renderHook } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { postponeReservationAction } from "../actions/postponeReservationAction";
import { RESERVATION_POSTPONEMENT_FEEDBACK_COPY as COPY } from "../constants/ReservationPostponementFeedbackCopy.constants";
import { useReservationPostponementSubmission } from "../hooks/useReservationPostponementSubmission";
import { POSTPONEMENT_RESERVATION_ID } from "./ReservationPostponement.constants";
import { POSTPONEMENT_ITEM_ID } from "./ReservationPostponementInput.constants";
import { VALID_POSTPONEMENT_INPUT } from "./ReservationPostponementInput.constants";

vi.mock("../actions/postponeReservationAction", () => ({
  postponeReservationAction: vi.fn(),
}));

const submitInput = async () => {
  const hook = renderHook(() =>
    useReservationPostponementSubmission()
  );
  await act(() =>
    hook.result.current.submit(VALID_POSTPONEMENT_INPUT)
  );
  return hook;
};

describe("useReservationPostponementSubmission", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("marks the form as submitted after a success", async () => {
    vi.mocked(postponeReservationAction).mockResolvedValue({
      ok: true,
      reservationId: POSTPONEMENT_RESERVATION_ID,
    });

    const hook = await submitInput();

    expect(hook.result.current.isSubmitted).toBe(true);
    expect(hook.result.current.formError).toBe("");
    expect(hook.result.current.isPending).toBe(false);
  });

  it("shows the refusal of the action on its field", async () => {
    vi.mocked(postponeReservationAction).mockResolvedValue({
      ok: false,
      errors: {
        cause: COPY.CAUSE_WEATHER_ONLY,
        readings: {},
      },
    });

    const hook = await submitInput();

    expect(hook.result.current.errors.cause).toBe(
      COPY.CAUSE_WEATHER_ONLY
    );
    expect(hook.result.current.isSubmitted).toBe(false);
  });

  it("keeps the stale message while the worker edits", async () => {
    vi.mocked(postponeReservationAction).mockResolvedValue({
      ok: false,
      errors: { readings: {} },
      formError: COPY.STALE,
    });

    const hook = await submitInput();
    act(() => hook.result.current.clearFieldError("date"));

    expect(hook.result.current.isStale).toBe(true);
    expect(hook.result.current.formError).toBe(COPY.STALE);
  });

  it("shows the generic failure when the action cannot be reached", async () => {
    vi.mocked(postponeReservationAction).mockRejectedValue(
      new Error("Failed to fetch")
    );

    const hook = await submitInput();

    expect(hook.result.current.formError).toBe(
      COPY.SUBMIT_ERROR
    );
    expect(hook.result.current.isStale).toBe(false);
  });

  it("clears one reading error and the form error", async () => {
    vi.mocked(postponeReservationAction).mockResolvedValue({
      ok: false,
      errors: {
        readings: {
          [POSTPONEMENT_ITEM_ID]: {
            fuelIn: COPY.READING_FUEL_REQUIRED,
            usageIn: COPY.READING_USAGE_INVALID,
          },
        },
      },
      formError: COPY.UNIT_UNAVAILABLE,
    });

    const hook = await submitInput();
    act(() =>
      hook.result.current.clearReadingError(
        POSTPONEMENT_ITEM_ID,
        "fuelIn"
      )
    );

    expect(
      hook.result.current.errors.readings[
        POSTPONEMENT_ITEM_ID
      ]
    ).toEqual({
      fuelIn: undefined,
      usageIn: COPY.READING_USAGE_INVALID,
    });
    expect(hook.result.current.formError).toBe("");
  });

  it("reports client errors without calling the action", () => {
    const hook = renderHook(() =>
      useReservationPostponementSubmission()
    );

    act(() =>
      hook.result.current.reportErrors({
        date: COPY.DATE_REQUIRED,
        readings: {},
      })
    );

    expect(hook.result.current.errors.date).toBe(
      COPY.DATE_REQUIRED
    );
    expect(
      postponeReservationAction
    ).not.toHaveBeenCalled();
  });
});
