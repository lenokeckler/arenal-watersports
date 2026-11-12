import {
  act,
  renderHook,
  waitFor,
} from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { postponeReservationAction } from "../actions/postponeReservationAction";
import { RESERVATION_POSTPONEMENT_CAUSE } from "../constants/ReservationPostponementCause.constants";
import { RESERVATION_POSTPONEMENT_FEEDBACK_COPY as COPY } from "../constants/ReservationPostponementFeedbackCopy.constants";
import { useReservationPostponementViewModel } from "../hooks/useReservationPostponementViewModel";
import type { ReservationPostponement } from "../models/ReservationPostponement.interface";
import {
  DISPATCHED_POSTPONEMENT,
  FUEL_ITEM_ID,
  KILOMETERS_ITEM_ID,
  NEW_DATE,
  NEW_TIME,
  SCHEDULED_POSTPONEMENT,
} from "./ReservationPostponementDraft.constants";

vi.mock("../actions/postponeReservationAction", () => ({
  postponeReservationAction: vi.fn(),
}));

const renderViewModel = (
  postponement: ReservationPostponement
) =>
  renderHook(() =>
    useReservationPostponementViewModel(postponement)
  );

describe("useReservationPostponementViewModel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("offers only weather causes for a dispatched reservation", () => {
    const { result } = renderViewModel(
      DISPATCHED_POSTPONEMENT
    );

    expect(result.current.causes).toEqual([
      RESERVATION_POSTPONEMENT_CAUSE.HEAVY_RAIN,
      RESERVATION_POSTPONEMENT_CAUSE.STORM,
    ]);
  });

  it("shows the client errors on submit without calling the action", () => {
    const { result } = renderViewModel(
      SCHEDULED_POSTPONEMENT
    );

    act(() => result.current.handleSubmit());

    expect(result.current.errors.cause).toBe(
      COPY.CAUSE_REQUIRED
    );
    expect(
      postponeReservationAction
    ).not.toHaveBeenCalled();
  });

  it("clears the error of the field the worker fixes", () => {
    const { result } = renderViewModel(
      SCHEDULED_POSTPONEMENT
    );

    act(() => result.current.handleSubmit());
    act(() =>
      result.current.setCause(
        RESERVATION_POSTPONEMENT_CAUSE.STORM
      )
    );

    expect(result.current.errors.cause).toBeUndefined();
    expect(result.current.draft.cause).toBe(
      RESERVATION_POSTPONEMENT_CAUSE.STORM
    );
  });

  it("sends the readings typed for each dispatched unit", async () => {
    vi.mocked(postponeReservationAction).mockResolvedValue({
      ok: true,
      reservationId: DISPATCHED_POSTPONEMENT.id,
    });
    const { result } = renderViewModel(
      DISPATCHED_POSTPONEMENT
    );

    act(() => {
      result.current.setDate(NEW_DATE);
      result.current.setTime(NEW_TIME);
      result.current.setCause(
        RESERVATION_POSTPONEMENT_CAUSE.HEAVY_RAIN
      );
      result.current.setReading(
        FUEL_ITEM_ID,
        "fuelIn",
        "5"
      );
      result.current.setReading(
        FUEL_ITEM_ID,
        "usageIn",
        "1260"
      );
      result.current.setReading(
        KILOMETERS_ITEM_ID,
        "usageIn",
        "8200"
      );
    });
    act(() => result.current.handleSubmit());

    await waitFor(() =>
      expect(result.current.isSubmitted).toBe(true)
    );
    expect(postponeReservationAction).toHaveBeenCalledWith(
      expect.objectContaining({
        cause: RESERVATION_POSTPONEMENT_CAUSE.HEAVY_RAIN,
        date: NEW_DATE,
        readings: [
          {
            fuelIn: 5,
            itemId: FUEL_ITEM_ID,
            usageIn: 1260,
          },
          {
            fuelIn: null,
            itemId: KILOMETERS_ITEM_ID,
            usageIn: 8200,
          },
        ],
        time: NEW_TIME,
      })
    );
    expect(result.current.isSubmitted).toBe(true);
    expect(result.current.isSubmitDisabled).toBe(true);
  });

  it("ignores a second submit after the reservation was postponed", async () => {
    vi.mocked(postponeReservationAction).mockResolvedValue({
      ok: true,
      reservationId: SCHEDULED_POSTPONEMENT.id,
    });
    const { result } = renderViewModel(
      SCHEDULED_POSTPONEMENT
    );

    act(() =>
      result.current.setCause(
        RESERVATION_POSTPONEMENT_CAUSE.STORM
      )
    );
    act(() => result.current.handleSubmit());
    await waitFor(() =>
      expect(result.current.isSubmitted).toBe(true)
    );
    act(() => result.current.handleSubmit());

    expect(postponeReservationAction).toHaveBeenCalledTimes(
      1
    );
  });
});
