import { renderHook } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { UNIT_LIST_VIEW_STATE } from "../constants/UnitListViewState.constants";
import { useUnitReservationHistoryViewModel } from "../hooks/useUnitReservationHistoryViewModel";
import { DEFAULT_UNIT_RESERVATION_ITEM } from "./UnitReservationHistory.constants";

const refreshMock = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: refreshMock }),
}));

describe("useUnitReservationHistoryViewModel", () => {
  beforeEach(() => {
    refreshMock.mockClear();
  });

  it("is in the error state when the read failed", () => {
    const { result } = renderHook(() =>
      useUnitReservationHistoryViewModel({
        fetchFailed: true,
        reservations: [],
      })
    );

    expect(result.current.viewState).toBe(
      UNIT_LIST_VIEW_STATE.ERROR
    );
  });

  it("is in the empty state when the unit has no reservations", () => {
    const { result } = renderHook(() =>
      useUnitReservationHistoryViewModel({
        fetchFailed: false,
        reservations: [],
      })
    );

    expect(result.current.viewState).toBe(
      UNIT_LIST_VIEW_STATE.EMPTY
    );
  });

  it("builds one row per reservation when the unit has reservations", () => {
    const { result } = renderHook(() =>
      useUnitReservationHistoryViewModel({
        fetchFailed: false,
        reservations: [DEFAULT_UNIT_RESERVATION_ITEM],
      })
    );

    expect(result.current.viewState).toBe(
      UNIT_LIST_VIEW_STATE.READY
    );
    expect(result.current.rows).toHaveLength(1);
    expect(result.current.rows[0]?.code).toBe(
      DEFAULT_UNIT_RESERVATION_ITEM.code
    );
  });

  it("refreshes the route on retry", () => {
    const { result } = renderHook(() =>
      useUnitReservationHistoryViewModel({
        fetchFailed: true,
        reservations: [],
      })
    );

    result.current.onRetry();

    expect(refreshMock).toHaveBeenCalledTimes(1);
  });
});
