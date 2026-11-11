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
import { getReservationCategoryConflictsAction } from "../actions/getReservationCategoryConflictsAction";
import { useReservationCategoryConflictWarning } from "../hooks/useReservationCategoryConflictWarning";
import { RESERVATION_CATEGORY_CONFLICT_WARNING_TEST } from "./ReservationCategoryConflictWarning.constants";

vi.mock(
  "../actions/getReservationCategoryConflictsAction",
  () => ({
    getReservationCategoryConflictsAction: vi.fn(),
  })
);

describe("useReservationCategoryConflictWarning refresh", () => {
  beforeEach(() => vi.clearAllMocks());

  it("refreshes conflicts after realtime inventory changes", async () => {
    vi.mocked(getReservationCategoryConflictsAction)
      .mockResolvedValueOnce([
        RESERVATION_CATEGORY_CONFLICT_WARNING_TEST.RPC_ROW,
      ])
      .mockResolvedValueOnce([
        RESERVATION_CATEGORY_CONFLICT_WARNING_TEST.REFRESHED_RPC_ROW,
      ]);
    const { rerender, result } = renderHook(
      ({ refreshKey }) =>
        useReservationCategoryConflictWarning(
          RESERVATION_CATEGORY_CONFLICT_WARNING_TEST.REQUEST,
          refreshKey
        ),
      {
        initialProps: {
          refreshKey:
            RESERVATION_CATEGORY_CONFLICT_WARNING_TEST.INITIAL_REFRESH_KEY,
        },
      }
    );

    await waitFor(() =>
      expect(result.current.items).toHaveLength(1)
    );
    rerender({
      refreshKey:
        RESERVATION_CATEGORY_CONFLICT_WARNING_TEST.NEXT_REFRESH_KEY,
    });
    await waitFor(() =>
      expect(
        getReservationCategoryConflictsAction
      ).toHaveBeenCalledTimes(2)
    );
    await waitFor(() =>
      expect(result.current.items[0].code).toBe(
        RESERVATION_CATEGORY_CONFLICT_WARNING_TEST
          .REFRESHED_RPC_ROW.code
      )
    );
  });

  it("retries a failed conflict lookup", async () => {
    vi.mocked(getReservationCategoryConflictsAction)
      .mockRejectedValueOnce(
        new Error("Lookup unavailable")
      )
      .mockResolvedValueOnce([
        RESERVATION_CATEGORY_CONFLICT_WARNING_TEST.RPC_ROW,
      ]);
    const { result } = renderHook(() =>
      useReservationCategoryConflictWarning(
        RESERVATION_CATEGORY_CONFLICT_WARNING_TEST.REQUEST,
        RESERVATION_CATEGORY_CONFLICT_WARNING_TEST.INITIAL_REFRESH_KEY
      )
    );

    await waitFor(() =>
      expect(result.current.hasError).toBe(true)
    );
    act(() => result.current.retry());
    await waitFor(() =>
      expect(result.current.items).toHaveLength(1)
    );
    expect(
      getReservationCategoryConflictsAction
    ).toHaveBeenCalledTimes(2);
  });
});
