import { act, renderHook } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { splitReservationAction } from "../actions/splitReservationAction";
import { RESERVATION_SPLIT_FEEDBACK_COPY } from "../constants/ReservationSplitFeedbackCopy.constants";
import { useReservationSplitSubmission } from "../hooks/useReservationSplitSubmission";
import {
  SPLIT_DEPARTURE_ID,
  VALID_SPLIT_INPUT,
} from "./ReservationSplit.constants";
import { SPLIT_DEPARTURE_CODE } from "./splitReservation.constants";

vi.mock("../actions/splitReservationAction", () => ({
  splitReservationAction: vi.fn(),
}));

const submitInput = async () => {
  const hook = renderHook(() =>
    useReservationSplitSubmission()
  );
  await act(() =>
    hook.result.current.submit(VALID_SPLIT_INPUT)
  );
  return hook;
};

describe("useReservationSplitSubmission", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("exposes the created departures after a success", async () => {
    const departures = [
      {
        code: SPLIT_DEPARTURE_CODE,
        reservationId: SPLIT_DEPARTURE_ID,
      },
    ];
    vi.mocked(splitReservationAction).mockResolvedValue({
      departures,
      ok: true,
    });

    const { result } = await submitInput();

    expect(result.current.createdDepartures).toEqual(
      departures
    );
    expect(result.current.formError).toBe("");
  });

  it("marks a stale result and keeps it through later edits", async () => {
    vi.mocked(splitReservationAction).mockResolvedValue({
      errors: { departures: [] },
      formError: RESERVATION_SPLIT_FEEDBACK_COPY.STALE,
      ok: false,
    });

    const { result } = await submitInput();
    act(() => result.current.clearErrors());

    expect(result.current.isStale).toBe(true);
    expect(result.current.formError).toBe(
      RESERVATION_SPLIT_FEEDBACK_COPY.STALE
    );
  });

  it("shows the network copy when the action throws", async () => {
    vi.mocked(splitReservationAction).mockRejectedValue(
      new Error("offline")
    );

    const { result } = await submitInput();

    expect(result.current.formError).toBe(
      RESERVATION_SPLIT_FEEDBACK_COPY.NETWORK_ERROR
    );
    expect(result.current.isPending).toBe(false);
  });

  it("clears only the edited field error of one departure", async () => {
    const timeError = "time error";
    const peopleError = "people error";
    vi.mocked(splitReservationAction).mockResolvedValue({
      errors: {
        departures: [
          { peopleCount: peopleError, time: timeError },
        ],
      },
      ok: false,
    });

    const { result } = await submitInput();
    act(() =>
      result.current.clearDepartureError(0, "time")
    );

    expect(result.current.errors.departures[0]).toEqual({
      peopleCount: peopleError,
      time: undefined,
    });
  });
});
