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
import type { ReservationCategoryAvailability } from "../models/ReservationCategoryAvailability.interface";
import type { ReservationUnitAvailabilityInput } from "../models/ReservationUnitAvailabilityInput.interface";
import {
  AVAILABLE_UNIT_TEST,
  CURRENT_RESERVATION_AVAILABILITY_FIXTURE,
  RESERVATION_AVAILABILITY_INPUT_FIXTURE,
  STALE_RESERVATION_AVAILABILITY_FIXTURE,
} from "./getAvailableReservationUnits.constants";

vi.mock(
  "../actions/getAvailableReservationUnitsAction",
  () => ({
    getAvailableReservationUnitsAction: vi.fn(),
  })
);

describe("useReservationUnitAvailability stale responses", () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => vi.useRealTimers());

  it("ignores an in-flight response after its request is superseded", async () => {
    vi.useFakeTimers();
    const pendingResponses: Array<
      (
        availability: ReservationCategoryAvailability
      ) => void
    > = [];
    vi.mocked(
      getAvailableReservationUnitsAction
    ).mockImplementation(
      () =>
        new Promise((resolve) => {
          pendingResponses.push(resolve);
        })
    );
    const initialRequest: ReservationUnitAvailabilityInput =
      {
        ...RESERVATION_AVAILABILITY_INPUT_FIXTURE,
      };
    const { rerender, result } = renderHook(
      ({ request }) =>
        useReservationUnitAvailability(request),
      { initialProps: { request: initialRequest } }
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(
        RESERVATION_AVAILABILITY.LOOKUP_DEBOUNCE_MS
      );
    });
    rerender({
      request: {
        ...initialRequest,
        date: AVAILABLE_UNIT_TEST.NEXT_DATE,
      },
    });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(
        RESERVATION_AVAILABILITY.LOOKUP_DEBOUNCE_MS
      );
    });
    await act(async () => {
      pendingResponses[1](
        CURRENT_RESERVATION_AVAILABILITY_FIXTURE
      );
      pendingResponses[0](
        STALE_RESERVATION_AVAILABILITY_FIXTURE
      );
      await Promise.resolve();
      await Promise.resolve();
    });

    expect(
      getAvailableReservationUnitsAction
    ).toHaveBeenCalledTimes(2);
    expect(result.current.availableUnits).toEqual(
      CURRENT_RESERVATION_AVAILABILITY_FIXTURE.availableUnits
    );
  });
});
