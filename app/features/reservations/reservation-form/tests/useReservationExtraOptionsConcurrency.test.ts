import {
  act,
  renderHook,
  waitFor,
} from "@testing-library/react";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { getReservationExtrasAction } from "../actions/getReservationExtrasAction";
import { useReservationExtraOptions } from "../hooks/useReservationExtraOptions";
import type { ReservationExtraOption } from "../models/ReservationExtraOption.interface";
import {
  createDeferred,
  RESERVATION_EXTRA_OPTIONS_TEST,
} from "./useReservationExtraOptions.constants";

vi.mock("../actions/getReservationExtrasAction", () => ({
  getReservationExtrasAction: vi.fn(),
}));

describe("useReservationExtraOptions request freshness", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal("reportError", vi.fn());
  });
  afterEach(() => vi.unstubAllGlobals());

  it("ignores a stale response after switching units", async () => {
    const staleOptions =
      createDeferred<ReservationExtraOption[]>();
    vi.mocked(getReservationExtrasAction)
      .mockReturnValueOnce(staleOptions.promise)
      .mockResolvedValueOnce([
        RESERVATION_EXTRA_OPTIONS_TEST.OPTION,
      ]);
    const { result, rerender } = renderHook(
      ({ unitId }: { unitId: string }) =>
        useReservationExtraOptions(unitId, "rental"),
      {
        initialProps: {
          unitId:
            RESERVATION_EXTRA_OPTIONS_TEST.FIRST_UNIT_ID,
        },
      }
    );
    rerender({
      unitId: RESERVATION_EXTRA_OPTIONS_TEST.SECOND_UNIT_ID,
    });
    await waitFor(() =>
      expect(result.current.options).toEqual([
        RESERVATION_EXTRA_OPTIONS_TEST.OPTION,
      ])
    );
    await act(async () => {
      staleOptions.resolve([
        RESERVATION_EXTRA_OPTIONS_TEST.STALE_OPTION,
      ]);
      await staleOptions.promise;
    });
    expect(result.current.options).toEqual([
      RESERVATION_EXTRA_OPTIONS_TEST.OPTION,
    ]);
  });

  it("does not expose cached options while refreshing a revisited unit", async () => {
    const refreshedOptions =
      createDeferred<ReservationExtraOption[]>();
    vi.mocked(getReservationExtrasAction)
      .mockResolvedValueOnce([
        RESERVATION_EXTRA_OPTIONS_TEST.OPTION,
      ])
      .mockResolvedValueOnce([
        RESERVATION_EXTRA_OPTIONS_TEST.STALE_OPTION,
      ])
      .mockReturnValueOnce(refreshedOptions.promise);
    const { result, rerender } = renderHook(
      ({ unitId }: { unitId: string }) =>
        useReservationExtraOptions(unitId, "rental"),
      {
        initialProps: {
          unitId:
            RESERVATION_EXTRA_OPTIONS_TEST.FIRST_UNIT_ID,
        },
      }
    );
    await waitFor(() =>
      expect(result.current.options).toEqual([
        RESERVATION_EXTRA_OPTIONS_TEST.OPTION,
      ])
    );
    rerender({
      unitId: RESERVATION_EXTRA_OPTIONS_TEST.SECOND_UNIT_ID,
    });
    await waitFor(() =>
      expect(result.current.options).toEqual([
        RESERVATION_EXTRA_OPTIONS_TEST.STALE_OPTION,
      ])
    );
    rerender({
      unitId: RESERVATION_EXTRA_OPTIONS_TEST.FIRST_UNIT_ID,
    });
    expect(result.current.isLoading).toBe(true);
    expect(result.current.options).toEqual([]);
    await act(async () => {
      refreshedOptions.resolve([
        RESERVATION_EXTRA_OPTIONS_TEST.OPTION,
      ]);
      await refreshedOptions.promise;
    });
    await waitFor(() =>
      expect(result.current.isLoading).toBe(false)
    );
    expect(result.current.options).toEqual([
      RESERVATION_EXTRA_OPTIONS_TEST.OPTION,
    ]);
  });
});
