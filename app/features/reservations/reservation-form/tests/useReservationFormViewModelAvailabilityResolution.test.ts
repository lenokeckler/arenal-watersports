import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import {
  resetViewModelHarness,
  viewModelHarness,
} from "./ReservationFormViewModel.testHarness";
import { useReservationFormViewModel } from "../hooks/useReservationFormViewModel";

describe("useReservationFormViewModel availability resolution", () => {
  beforeEach(resetViewModelHarness);

  it("keeps a selected unit until its refreshed availability resolves", () => {
    viewModelHarness.equipment.current = {
      availableUnits: [],
      hasAvailabilityError: false,
      isAvailabilityResolved: false,
      isAvailabilityLoading: true,
      requiresConcreteUnit: true,
    };
    const { result, rerender } = renderHook(() =>
      useReservationFormViewModel("2030-04-12", [])
    );

    expect(
      viewModelHarness.handleUnitChange
    ).not.toHaveBeenCalled();

    viewModelHarness.equipment.current = {
      availableUnits: [],
      hasAvailabilityError: false,
      isAvailabilityResolved: true,
      isAvailabilityLoading: false,
      requiresConcreteUnit: true,
    };
    rerender();

    expect(
      viewModelHarness.handleUnitChange
    ).toHaveBeenCalledWith("");
    expect(
      result.current.hasEquipmentSelectionChanged
    ).toBe(true);
  });
});
