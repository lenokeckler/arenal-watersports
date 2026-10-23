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

describe("useReservationExtraOptions stale rejection handling", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal("reportError", vi.fn());
  });
  afterEach(() => vi.unstubAllGlobals());

  it("ignores an old rejection after a newer unit request succeeds", async () => {
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
      staleOptions.reject(
        RESERVATION_EXTRA_OPTIONS_TEST.ERROR
      );
      await expect(staleOptions.promise).rejects.toBe(
        RESERVATION_EXTRA_OPTIONS_TEST.ERROR
      );
    });

    expect(result.current.options).toEqual([
      RESERVATION_EXTRA_OPTIONS_TEST.OPTION,
    ]);
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(window.reportError).not.toHaveBeenCalled();
  });
});
