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

  it("reports loading errors and skips invalid unit or combo requests", async () => {
    vi.mocked(
      getReservationExtrasAction
    ).mockRejectedValueOnce(
      RESERVATION_EXTRA_OPTIONS_TEST.ERROR
    );
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
    renderHook(() =>
      useReservationExtraOptions(
        RESERVATION_EXTRA_OPTIONS_TEST.FIRST_UNIT_ID,
        "combo"
      )
    );
    expect(
      getReservationExtrasAction
    ).toHaveBeenCalledTimes(1);
  });
});
