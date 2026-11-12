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
import { getAvailableReservationUnitsAction } from "../actions/getAvailableReservationUnitsAction";
import { useReservationUnitAvailability } from "../hooks/useReservationUnitAvailability";
import type { ReservationEquipmentAvailability } from "../models/ReservationEquipmentAvailability.interface";
import type { ReservationUnitAvailabilityInput } from "../models/ReservationUnitAvailabilityInput.interface";
import { AVAILABLE_UNIT_TEST } from "./getAvailableReservationUnits.constants";

vi.mock(
  "../actions/getAvailableReservationUnitsAction",
  () => ({
    getAvailableReservationUnitsAction: vi.fn(),
  })
);

describe("useReservationUnitAvailability window changes", () => {
  beforeEach(() => vi.clearAllMocks());

  it("clears options from a different reservation window", async () => {
    let resolveNextRequest: (
      availability: ReservationEquipmentAvailability
    ) => void = () => undefined;
    vi.mocked(getAvailableReservationUnitsAction)
      .mockResolvedValueOnce({
        availableQuantity: null,
        availableUnits: [
          {
            code: AVAILABLE_UNIT_TEST.UNIT_CODE,
            id: AVAILABLE_UNIT_TEST.UNIT_ID,
          },
        ],
      })
      .mockImplementationOnce(
        () =>
          new Promise((resolve) => {
            resolveNextRequest = resolve;
          })
      );
    const request: ReservationUnitAvailabilityInput = {
      categoryId: AVAILABLE_UNIT_TEST.CATEGORY_ID,
      date: AVAILABLE_UNIT_TEST.DATE,
      durationMinutes: AVAILABLE_UNIT_TEST.DURATION_MINUTES,
      time: AVAILABLE_UNIT_TEST.TIME,
    };
    const { rerender, result } = renderHook(
      ({ date }: { date: string }) =>
        useReservationUnitAvailability(
          { ...request, date },
          AVAILABLE_UNIT_TEST.REFRESH_KEY
        ),
      { initialProps: { date: request.date } }
    );
    await waitFor(() =>
      expect(result.current.availableUnits).toHaveLength(1)
    );

    rerender({ date: "2030-01-02" });
    expect(result.current.availableUnits).toEqual([]);
    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      resolveNextRequest({
        availableQuantity: null,
        availableUnits: [],
      });
      await Promise.resolve();
    });
    await waitFor(() =>
      expect(
        result.current.isResolvedForCurrentRequest
      ).toBe(true)
    );
  });
});
