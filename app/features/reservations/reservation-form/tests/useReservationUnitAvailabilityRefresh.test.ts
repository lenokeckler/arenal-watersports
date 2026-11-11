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

describe("useReservationUnitAvailability refresh", () => {
  beforeEach(() => vi.clearAllMocks());

  it("keeps current options while refreshing the same reservation window", async () => {
    let resolveRefresh: (
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
            resolveRefresh = resolve;
          })
      );
    const request: ReservationUnitAvailabilityInput = {
      categoryId: AVAILABLE_UNIT_TEST.CATEGORY_ID,
      date: AVAILABLE_UNIT_TEST.DATE,
      durationMinutes: AVAILABLE_UNIT_TEST.DURATION_MINUTES,
      time: AVAILABLE_UNIT_TEST.TIME,
    };
    const initialRefreshKey: number =
      AVAILABLE_UNIT_TEST.REFRESH_KEY;
    const { rerender, result } = renderHook(
      ({ refreshKey }: { refreshKey: number }) =>
        useReservationUnitAvailability(request, refreshKey),
      {
        initialProps: {
          refreshKey: initialRefreshKey,
        },
      }
    );
    await waitFor(() =>
      expect(result.current.availableUnits).toHaveLength(1)
    );

    rerender({
      refreshKey: initialRefreshKey + 1,
    });
    expect(result.current.availableUnits).toHaveLength(1);
    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      resolveRefresh({
        availableQuantity: null,
        availableUnits: [],
      });
      await Promise.resolve();
    });

    await waitFor(() =>
      expect(result.current.availableUnits).toEqual([])
    );
    expect(result.current.isResolvedForCurrentRequest).toBe(
      true
    );
  });
});
