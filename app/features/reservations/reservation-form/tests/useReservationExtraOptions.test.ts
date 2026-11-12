import {
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
import { RESERVATION_EXTRA_OPTIONS_TEST } from "./useReservationExtraOptions.constants";

vi.mock("../actions/getReservationExtrasAction", () => ({
  getReservationExtrasAction: vi.fn(),
}));

describe("useReservationExtraOptions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal("reportError", vi.fn());
  });
  afterEach(() => vi.unstubAllGlobals());

  it("loads options for the selected rental unit", async () => {
    vi.mocked(getReservationExtrasAction).mockResolvedValue(
      [RESERVATION_EXTRA_OPTIONS_TEST.OPTION]
    );
    const { result } = renderHook(() =>
      useReservationExtraOptions(
        RESERVATION_EXTRA_OPTIONS_TEST.FIRST_UNIT_ID,
        "rental"
      )
    );
    await waitFor(() =>
      expect(result.current.options).toEqual([
        RESERVATION_EXTRA_OPTIONS_TEST.OPTION,
      ])
    );
    expect(result.current.isLoading).toBe(false);
    expect(getReservationExtrasAction).toHaveBeenCalledWith(
      {
        unitId:
          RESERVATION_EXTRA_OPTIONS_TEST.FIRST_UNIT_ID,
      }
    );
  });

  it("loads options for the selected tour unit", async () => {
    vi.mocked(getReservationExtrasAction).mockResolvedValue(
      [RESERVATION_EXTRA_OPTIONS_TEST.OPTION]
    );
    const { result } = renderHook(() =>
      useReservationExtraOptions(
        RESERVATION_EXTRA_OPTIONS_TEST.FIRST_UNIT_ID,
        "tour"
      )
    );

    await waitFor(() =>
      expect(result.current.options).toEqual([
        RESERVATION_EXTRA_OPTIONS_TEST.OPTION,
      ])
    );
    expect(getReservationExtrasAction).toHaveBeenCalledWith(
      {
        unitId:
          RESERVATION_EXTRA_OPTIONS_TEST.FIRST_UNIT_ID,
      }
    );
  });

  it("reports errors, loads combo options, and skips invalid units", async () => {
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
    expect(result.current.isLoading).toBe(false);
    renderHook(() =>
      useReservationExtraOptions("", "rental")
    );
    const combo = renderHook(() =>
      useReservationExtraOptions(
        RESERVATION_EXTRA_OPTIONS_TEST.FIRST_UNIT_ID,
        "combo"
      )
    );
    await waitFor(() =>
      expect(combo.result.current.options).toEqual([
        RESERVATION_EXTRA_OPTIONS_TEST.OPTION,
      ])
    );
    expect(
      getReservationExtrasAction
    ).toHaveBeenCalledTimes(2);
  });
});
