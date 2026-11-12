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
import { getReservationExtrasPricingAction } from "../actions/getReservationExtrasPricingAction";
import { useReservationExtrasViewModel } from "../hooks/useReservationExtrasViewModel";
import { RESERVATION_EXTRAS_VIEW_MODEL_TEST } from "./useReservationExtrasViewModel.constants";

vi.mock("../actions/getReservationExtrasAction", () => ({
  getReservationExtrasAction: vi.fn(),
}));
vi.mock(
  "../actions/getReservationExtrasPricingAction",
  () => ({
    getReservationExtrasPricingAction: vi.fn(),
  })
);

describe("useReservationExtrasViewModel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal("reportError", vi.fn());
  });
  afterEach(() => vi.unstubAllGlobals());

  it("loads compatible extras and requests the authoritative quote", async () => {
    vi.mocked(getReservationExtrasAction).mockResolvedValue(
      [RESERVATION_EXTRAS_VIEW_MODEL_TEST.OPTION]
    );
    vi.mocked(
      getReservationExtrasPricingAction
    ).mockResolvedValue({
      ok: true,
      pricing: RESERVATION_EXTRAS_VIEW_MODEL_TEST.PRICING,
    });
    const { result } = renderHook(() =>
      useReservationExtrasViewModel(
        RESERVATION_EXTRAS_VIEW_MODEL_TEST.FIRST_INPUT
      )
    );
    await waitFor(() =>
      expect(result.current.isLoading).toBe(false)
    );
    await waitFor(() =>
      expect(result.current.isPricingLoading).toBe(false)
    );
    expect(result.current.options).toEqual([
      RESERVATION_EXTRAS_VIEW_MODEL_TEST.OPTION,
    ]);
    expect(result.current.pricing).toEqual(
      RESERVATION_EXTRAS_VIEW_MODEL_TEST.PRICING
    );
    expect(getReservationExtrasAction).toHaveBeenCalledWith(
      {
        unitId:
          RESERVATION_EXTRAS_VIEW_MODEL_TEST.FIRST_INPUT
            .unitId,
      }
    );
    expect(
      getReservationExtrasPricingAction
    ).toHaveBeenCalledWith(
      RESERVATION_EXTRAS_VIEW_MODEL_TEST.FIRST_INPUT
    );
  });

  it("loads options while an invalid duration blocks quote requests", async () => {
    vi.mocked(getReservationExtrasAction).mockResolvedValue(
      []
    );
    renderHook(() =>
      useReservationExtrasViewModel(
        RESERVATION_EXTRAS_VIEW_MODEL_TEST.INVALID_DURATION_INPUT
      )
    );
    await waitFor(() =>
      expect(getReservationExtrasAction).toHaveBeenCalled()
    );
    expect(
      getReservationExtrasPricingAction
    ).not.toHaveBeenCalled();
  });

  it("skips requests without a supported type or valid unit", () => {
    renderHook(() =>
      useReservationExtrasViewModel(
        RESERVATION_EXTRAS_VIEW_MODEL_TEST.COMBO_INPUT
      )
    );
    renderHook(() =>
      useReservationExtrasViewModel(
        RESERVATION_EXTRAS_VIEW_MODEL_TEST.INVALID_UNIT_INPUT
      )
    );
    expect(
      getReservationExtrasAction
    ).not.toHaveBeenCalled();
    expect(
      getReservationExtrasPricingAction
    ).not.toHaveBeenCalled();
  });
});
