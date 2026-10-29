import { act, renderHook } from "@testing-library/react";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { getAvailableReservationUnitsAction } from "../actions/getAvailableReservationUnitsAction";
import { RESERVATION_AVAILABILITY } from "../constants/ReservationAvailability.constants";
import { useReservationUnitAvailability } from "../hooks/useReservationUnitAvailability";
import type { ReservationUnitAvailabilityInput } from "../models/ReservationUnitAvailabilityInput.interface";
import {
  AVAILABLE_UNIT_TEST,
  RESERVATION_AVAILABILITY_INPUT_FIXTURE,
} from "./getAvailableReservationUnits.constants";

vi.mock(
  "../actions/getAvailableReservationUnitsAction",
  () => ({
    getAvailableReservationUnitsAction: vi.fn(),
  })
);

describe("useReservationUnitAvailability", () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => vi.useRealTimers());

  it("debounces rapid reservation interval changes", async () => {
    vi.useFakeTimers();
    vi.mocked(
      getAvailableReservationUnitsAction
    ).mockResolvedValue({
      availableQuantity: 1,
      availableUnits: [
        {
          code: AVAILABLE_UNIT_TEST.UNIT_CODE,
          id: AVAILABLE_UNIT_TEST.UNIT_ID,
        },
      ],
      hasRequestedQuantity: true,
    });
    const initialRequest: ReservationUnitAvailabilityInput =
      {
        ...RESERVATION_AVAILABILITY_INPUT_FIXTURE,
      };
    const { rerender, result } = renderHook(
      ({ request }) =>
        useReservationUnitAvailability(request),
      { initialProps: { request: initialRequest } }
    );
    const intermediateRequest = {
      ...initialRequest,
      date: AVAILABLE_UNIT_TEST.INTERMEDIATE_DATE,
      durationMinutes:
        AVAILABLE_UNIT_TEST.INTERMEDIATE_DURATION_MINUTES,
      time: AVAILABLE_UNIT_TEST.INTERMEDIATE_TIME,
    };
    const nextRequest = {
      ...intermediateRequest,
      date: AVAILABLE_UNIT_TEST.NEXT_DATE,
      quantity: AVAILABLE_UNIT_TEST.SECOND_QUANTITY,
    };
    rerender({ request: intermediateRequest });
    rerender({ request: nextRequest });

    expect(
      getAvailableReservationUnitsAction
    ).not.toHaveBeenCalled();
    await act(async () => {
      await vi.advanceTimersByTimeAsync(
        RESERVATION_AVAILABILITY.LOOKUP_DEBOUNCE_MS
      );
    });

    expect(
      getAvailableReservationUnitsAction
    ).toHaveBeenCalledOnce();
    expect(
      getAvailableReservationUnitsAction
    ).toHaveBeenCalledWith(nextRequest);
    expect(result.current.availableUnits).toEqual([
      {
        code: AVAILABLE_UNIT_TEST.UNIT_CODE,
        id: AVAILABLE_UNIT_TEST.UNIT_ID,
      },
    ]);
    expect(result.current.hasRequestedQuantity).toBe(true);
  });
});
