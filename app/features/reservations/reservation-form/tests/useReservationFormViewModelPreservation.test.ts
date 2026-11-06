import { renderHook } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  resetViewModelHarness,
  viewModelHarness,
} from "./ReservationFormViewModel.testHarness";
import { useReservationFormViewModel } from "../hooks/useReservationFormViewModel";

describe("useReservationFormViewModel preservation", () => {
  beforeEach(resetViewModelHarness);

  it("preserves reservation values when realtime eligibility is unavailable", () => {
    const expectedValues = {
      ...viewModelHarness.values,
    };
    const { result, rerender } = renderHook(() =>
      useReservationFormViewModel("2030-04-12", [])
    );
    viewModelHarness.eligibility.current = {
      categories: [],
      hasError: true,
      isLoading: false,
      refreshKey: 2,
      retry: vi.fn(),
    };
    rerender();

    expect(result.current.values).toEqual(expectedValues);
    expect(
      result.current.hasEquipmentSelectionChanged
    ).toBe(false);
    expect(
      viewModelHarness.handleCategoryChange
    ).not.toHaveBeenCalled();
    expect(
      viewModelHarness.handleUnitChange
    ).not.toHaveBeenCalled();
  });
});
