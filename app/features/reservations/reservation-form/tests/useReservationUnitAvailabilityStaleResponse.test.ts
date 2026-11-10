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

describe("useReservationUnitAvailability stale responses", () => {
  beforeEach(() => vi.clearAllMocks());

  it("ignores a stale response after a newer availability request", async () => {
    const pendingResponses: Array<
      (
        availability: ReservationEquipmentAvailability
      ) => void
    > = [];
    vi.mocked(
      getAvailableReservationUnitsAction
    ).mockImplementation(
      () =>
        new Promise((resolve) =>
          pendingResponses.push(resolve)
        )
    );
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
        useReservationUnitAvailability(
          request,
          AVAILABLE_UNIT_TEST.REFRESH_KEY
        ),
      { initialProps: { request: initialRequest } }
    );
    await waitFor(() =>
      expect(pendingResponses).toHaveLength(1)
    );

    rerender({
      request: { ...initialRequest, date: "2030-01-02" },
    });
    await waitFor(() =>
      expect(pendingResponses).toHaveLength(2)
    );

    await act(async () => {
      pendingResponses[1]({
        availableQuantity: null,
        availableUnits: [
          {
            code: AVAILABLE_UNIT_TEST.UNIT_CODE,
            id: AVAILABLE_UNIT_TEST.UNIT_ID,
          },
        ],
      });
      await Promise.resolve();
    });
    await waitFor(() =>
      expect(
        result.current.isResolvedForCurrentRequest
      ).toBe(true)
    );

    await act(async () => {
      pendingResponses[0]({
        availableQuantity: null,
        availableUnits: [],
      });
      await Promise.resolve();
    });

    expect(result.current.availableUnits).toEqual([
      {
        code: AVAILABLE_UNIT_TEST.UNIT_CODE,
        id: AVAILABLE_UNIT_TEST.UNIT_ID,
      },
    ]);
    expect(result.current.isResolvedForCurrentRequest).toBe(
      true
    );
  });
});
