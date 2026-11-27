import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { ReservationCalendarPageSize } from "@/app/components/reservation-calendar/models/ReservationCalendarPageSize.type";
import { useReservationCalendarAgendaPagination } from "../hooks/useReservationCalendarAgendaPagination";
import type { ReservationCalendarAgendaPaginationOptions } from "../models/ReservationCalendarAgendaPaginationOptions.interface";

const INITIAL_PAGE_SIZE: ReservationCalendarPageSize = 10;
const NEXT_PAGE_SIZE: ReservationCalendarPageSize = 25;
const DEFAULT_OPTIONS: ReservationCalendarAgendaPaginationOptions =
  {
    initialPageSize: INITIAL_PAGE_SIZE,
    pageSizeReadError: false,
    savePageSize: vi.fn().mockResolvedValue({
      kind: "saved",
      pageSize: NEXT_PAGE_SIZE,
    }),
  };

describe("useReservationCalendarAgendaPagination", () => {
  it("resets to the first page after saving a new page size", async () => {
    const { result } = renderHook(() =>
      useReservationCalendarAgendaPagination(
        DEFAULT_OPTIONS
      )
    );

    act(() => result.current.onPageChange(2));
    await act(async () => {
      await result.current.onPageSizeChange(NEXT_PAGE_SIZE);
    });

    expect(result.current.page).toBe(1);
    expect(result.current.pageSize).toBe(NEXT_PAGE_SIZE);
    expect(result.current.saveError).toBe(false);
  });

  it("keeps the current size and reports a failed preference save", async () => {
    const options: ReservationCalendarAgendaPaginationOptions =
      {
        ...DEFAULT_OPTIONS,
        savePageSize: vi.fn().mockResolvedValue({
          kind: "failed",
        }),
      };
    const { result } = renderHook(() =>
      useReservationCalendarAgendaPagination(options)
    );

    act(() => result.current.onPageChange(2));
    await act(async () => {
      await result.current.onPageSizeChange(NEXT_PAGE_SIZE);
    });

    expect(result.current.page).toBe(2);
    expect(result.current.pageSize).toBe(INITIAL_PAGE_SIZE);
    expect(result.current.saveError).toBe(true);
  });
});
