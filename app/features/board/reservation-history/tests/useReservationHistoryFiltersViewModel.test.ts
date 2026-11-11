import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  HISTORY_EMPTY_FILTERS,
  HISTORY_FULL_FILTERS,
} from "@/app/services/board/reservation-history/tests/ReservationHistory.constants";
import { useReservationHistoryFiltersViewModel } from "../hooks/useReservationHistoryFiltersViewModel";
import {
  FILTER_CHANGE_FROM,
  FILTER_CHANGE_TYPE,
  FILTER_FROM_EVENT,
  FILTER_TYPE_EVENT,
  PAGE_SHOW_EVENT_NAME,
} from "./ReservationHistoryFilters.constants";

describe("useReservationHistoryFiltersViewModel", () => {
  it("starts blank when no filter is applied", () => {
    const { result } = renderHook(() =>
      useReservationHistoryFiltersViewModel({
        filters: HISTORY_EMPTY_FILTERS,
      })
    );

    expect(Object.values(result.current.values)).toEqual([
      "",
      "",
      "",
      "",
    ]);
  });

  it("starts from the applied filters", () => {
    const { result } = renderHook(() =>
      useReservationHistoryFiltersViewModel({
        filters: HISTORY_FULL_FILTERS,
      })
    );

    expect(result.current.values).toEqual({
      category: HISTORY_FULL_FILTERS.categoryId,
      from: HISTORY_FULL_FILTERS.from,
      to: HISTORY_FULL_FILTERS.to,
      type: HISTORY_FULL_FILTERS.type,
    });
  });

  it("updates only the field that changed", () => {
    const { result } = renderHook(() =>
      useReservationHistoryFiltersViewModel({
        filters: HISTORY_FULL_FILTERS,
      })
    );

    act(() => {
      result.current.handleChange(FILTER_FROM_EVENT);
    });
    act(() => {
      result.current.handleChange(FILTER_TYPE_EVENT);
    });

    expect(result.current.values).toEqual({
      category: HISTORY_FULL_FILTERS.categoryId,
      from: FILTER_CHANGE_FROM,
      to: HISTORY_FULL_FILTERS.to,
      type: FILTER_CHANGE_TYPE,
    });
  });

  it("clears pending when the page is restored from the cache", () => {
    const { result } = renderHook(() =>
      useReservationHistoryFiltersViewModel({
        filters: HISTORY_FULL_FILTERS,
      })
    );
    act(() => result.current.handleSubmit());

    act(() => {
      window.dispatchEvent(
        new PageTransitionEvent(PAGE_SHOW_EVENT_NAME, {
          persisted: true,
        })
      );
    });

    expect(result.current.isPending).toBe(false);
  });

  it("keeps pending on a page show that is not a restore", () => {
    const { result } = renderHook(() =>
      useReservationHistoryFiltersViewModel({
        filters: HISTORY_FULL_FILTERS,
      })
    );
    act(() => result.current.handleSubmit());

    act(() => {
      window.dispatchEvent(
        new PageTransitionEvent(PAGE_SHOW_EVENT_NAME, {
          persisted: false,
        })
      );
    });

    expect(result.current.isPending).toBe(true);
  });

  it("stops listening once unmounted", () => {
    const removeListener = vi.spyOn(
      window,
      "removeEventListener"
    );
    const { unmount } = renderHook(() =>
      useReservationHistoryFiltersViewModel({
        filters: HISTORY_FULL_FILTERS,
      })
    );

    unmount();

    expect(removeListener).toHaveBeenCalledWith(
      PAGE_SHOW_EVENT_NAME,
      expect.any(Function)
    );
    removeListener.mockRestore();
  });

  it("turns pending on submit without changing the values", () => {
    const { result } = renderHook(() =>
      useReservationHistoryFiltersViewModel({
        filters: HISTORY_FULL_FILTERS,
      })
    );

    act(() => result.current.handleSubmit());

    expect(result.current.isPending).toBe(true);
    expect(result.current.values.from).toBe(
      HISTORY_FULL_FILTERS.from
    );
  });
});
