import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  HISTORY_EMPTY_FILTERS,
  HISTORY_FULL_FILTERS,
} from "@/app/services/board/reservation-history/tests/ReservationHistory.constants";
import { useReservationHistoryFiltersViewModel } from "../hooks/useReservationHistoryFiltersViewModel";
import type { ReservationHistoryFilterChangeEvent } from "../models/ReservationHistoryFilterChangeEvent.type";
import {
  FILTER_CHANGE_FROM,
  FILTER_CHANGE_TYPE,
  FILTER_FROM_EVENT,
  FILTER_TYPE_EVENT,
} from "./ReservationHistoryFilters.constants";

describe("useReservationHistoryFiltersViewModel", () => {
  it("starts blank when no filter is applied", () => {
    const { result } = renderHook(() =>
      useReservationHistoryFiltersViewModel({
        filters: HISTORY_EMPTY_FILTERS,
      })
    );

    expect(result.current.values).toEqual({
      category: "",
      from: "",
      to: "",
      type: "",
    });
    expect(result.current.isPending).toBe(false);
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
      result.current.handleChange(
        FILTER_FROM_EVENT as ReservationHistoryFilterChangeEvent
      );
    });
    act(() => {
      result.current.handleChange(
        FILTER_TYPE_EVENT as ReservationHistoryFilterChangeEvent
      );
    });

    expect(result.current.values).toEqual({
      category: HISTORY_FULL_FILTERS.categoryId,
      from: FILTER_CHANGE_FROM,
      to: HISTORY_FULL_FILTERS.to,
      type: FILTER_CHANGE_TYPE,
    });
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
