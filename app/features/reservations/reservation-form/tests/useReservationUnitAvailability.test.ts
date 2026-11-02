import {
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
import { getAvailableReservationUnitsAction } from "../actions/getAvailableReservationUnitsAction";
import { useReservationUnitAvailability } from "../hooks/useReservationUnitAvailability";
import type { ReservationUnitAvailabilityInput } from "../models/ReservationUnitAvailabilityInput.interface";
import { AVAILABLE_UNIT_TEST } from "./getAvailableReservationUnits.constants";
import { RESERVATION_EDIT_TEST } from "./ReservationEdit.constants";

vi.mock(
  "../actions/getAvailableReservationUnitsAction",
  () => ({
    getAvailableReservationUnitsAction: vi.fn(),
  })
);

describe("useReservationUnitAvailability", () => {
  beforeEach(() => vi.clearAllMocks());

  it("refreshes available units when the reservation interval changes", async () => {
    vi.mocked(
      getAvailableReservationUnitsAction
    ).mockResolvedValue({
      availableQuantity: null,
      availableUnits: [
        {
          code: AVAILABLE_UNIT_TEST.UNIT_CODE,
          id: AVAILABLE_UNIT_TEST.UNIT_ID,
        },
      ],
    });
    const initialRequest: ReservationUnitAvailabilityInput =
      {
        categoryId: AVAILABLE_UNIT_TEST.CATEGORY_ID,
        date: AVAILABLE_UNIT_TEST.DATE,
        durationMinutes:
          AVAILABLE_UNIT_TEST.DURATION_MINUTES,
        time: AVAILABLE_UNIT_TEST.TIME,
      };
    const { rerender, result } = renderHook(
      ({ request }) =>
        useReservationUnitAvailability(request, 0),
      { initialProps: { request: initialRequest } }
    );
    await waitFor(() =>
      expect(result.current.availableUnits).toHaveLength(1)
    );

    const nextRequest = {
      ...initialRequest,
      date: "2030-01-02",
      durationMinutes: 90,
      time: "10:30",
    };
    rerender({ request: nextRequest });

    await waitFor(() =>
      expect(
        getAvailableReservationUnitsAction
      ).toHaveBeenLastCalledWith(nextRequest)
    );
    await waitFor(() =>
      expect(result.current.availableUnits).toHaveLength(1)
    );
    expect(result.current.availableUnits).toEqual([
      {
        code: AVAILABLE_UNIT_TEST.UNIT_CODE,
        id: AVAILABLE_UNIT_TEST.UNIT_ID,
      },
    ]);
  });

  it("re-fetches when the excluded reservation changes", async () => {
    vi.mocked(
      getAvailableReservationUnitsAction
    ).mockResolvedValue({
      availableQuantity: null,
      availableUnits: [],
    });
    const request: ReservationUnitAvailabilityInput = {
      categoryId: AVAILABLE_UNIT_TEST.CATEGORY_ID,
      date: AVAILABLE_UNIT_TEST.DATE,
      durationMinutes: AVAILABLE_UNIT_TEST.DURATION_MINUTES,
      excludeReservationId:
        RESERVATION_EDIT_TEST.RESERVATION_ID,
      time: AVAILABLE_UNIT_TEST.TIME,
    };
    const { rerender } = renderHook(
      (input) => useReservationUnitAvailability(input, 0),
      { initialProps: request }
    );
    const nextRequest = {
      ...request,
      excludeReservationId: RESERVATION_EDIT_TEST.UNIT_ID,
    };

    rerender(nextRequest);

    await waitFor(() =>
      expect(
        getAvailableReservationUnitsAction
      ).toHaveBeenLastCalledWith(nextRequest)
    );
  });
});
