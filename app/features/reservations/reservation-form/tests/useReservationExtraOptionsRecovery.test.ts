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
import { RESERVATION_EXTRA_OPTIONS_COPY } from "../constants/ReservationExtraOptionsCopy.constants";
import { useReservationExtraOptions } from "../hooks/useReservationExtraOptions";
import type { ReservationExtraOption } from "../models/ReservationExtraOption.interface";
import {
  createDeferred,
  RESERVATION_EXTRA_OPTIONS_TEST,
} from "./useReservationExtraOptions.constants";

vi.mock("../actions/getReservationExtrasAction", () => ({
  getReservationExtrasAction: vi.fn(),
}));

describe("useReservationExtraOptions recovery", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal("reportError", vi.fn());
  });
  afterEach(() => vi.unstubAllGlobals());

  it("clears a prior error after revisiting a unit successfully", async () => {
    vi.mocked(getReservationExtrasAction)
      .mockRejectedValueOnce(
        RESERVATION_EXTRA_OPTIONS_TEST.ERROR
      )
      .mockResolvedValueOnce([
        RESERVATION_EXTRA_OPTIONS_TEST.STALE_OPTION,
      ])
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
    await waitFor(() =>
      expect(result.current.error).toBe(
        RESERVATION_EXTRA_OPTIONS_COPY.ERROR
      )
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
    await waitFor(() =>
      expect(result.current.options).toEqual([
        RESERVATION_EXTRA_OPTIONS_TEST.OPTION,
      ])
    );
    expect(result.current.error).toBeNull();
  });

  it("retries a failed request without exposing its cached error", async () => {
    vi.mocked(getReservationExtrasAction)
      .mockRejectedValueOnce(
        RESERVATION_EXTRA_OPTIONS_TEST.ERROR
      )
      .mockResolvedValueOnce([
        RESERVATION_EXTRA_OPTIONS_TEST.OPTION,
      ]);
    const { result } = renderHook(() =>
      useReservationExtraOptions(
        RESERVATION_EXTRA_OPTIONS_TEST.FIRST_UNIT_ID,
        "rental"
      )
    );
    await waitFor(() =>
      expect(result.current.error).toBe(
        RESERVATION_EXTRA_OPTIONS_COPY.ERROR
      )
    );
    act(() => result.current.retry());
    await waitFor(() =>
      expect(result.current.options).toEqual([
        RESERVATION_EXTRA_OPTIONS_TEST.OPTION,
      ])
    );
    expect(result.current.error).toBeNull();
  });

  it("ignores an older request after a new request succeeds", async () => {
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
});
