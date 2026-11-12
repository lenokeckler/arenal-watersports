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
import type { ReservationCategoryConflict } from "../models/ReservationCategoryConflict.type";
import { createDeferred } from "./reservationAvailability.testHarness";
import { RESERVATION_CATEGORY_CONFLICT_WARNING_TEST } from "./ReservationCategoryConflictWarning.constants";

vi.mock(
  "../actions/getReservationCategoryConflictsAction",
  () => ({
    getReservationCategoryConflictsAction: vi.fn(),
  })
);

describe("useReservationCategoryConflictWarning stale refresh", () => {
  beforeEach(() => vi.clearAllMocks());

  it("ignores stale conflicts after a realtime refresh", async () => {
    const staleLookup =
      createDeferred<ReservationCategoryConflict[]>();
    const refreshedLookup =
      createDeferred<ReservationCategoryConflict[]>();
    vi.mocked(getReservationCategoryConflictsAction)
      .mockReturnValueOnce(staleLookup.promise)
      .mockReturnValueOnce(refreshedLookup.promise);
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
      expect(
        getReservationCategoryConflictsAction
      ).toHaveBeenCalledTimes(1)
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
    await act(async () => {
      refreshedLookup.resolve([
        RESERVATION_CATEGORY_CONFLICT_WARNING_TEST.REFRESHED_RPC_ROW,
      ]);
      await refreshedLookup.promise;
    });
    await act(async () => {
      staleLookup.resolve([
        RESERVATION_CATEGORY_CONFLICT_WARNING_TEST.RPC_ROW,
      ]);
      await staleLookup.promise;
    });

    expect(result.current.items[0].code).toBe(
      RESERVATION_CATEGORY_CONFLICT_WARNING_TEST
        .REFRESHED_RPC_ROW.code
    );
  });
});
