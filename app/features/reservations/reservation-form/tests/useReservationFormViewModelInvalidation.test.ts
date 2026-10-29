import { act, renderHook } from "@testing-library/react";
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

describe("useReservationFormViewModel selection invalidation", () => {
  beforeEach(resetViewModelHarness);

  it("preserves the selected category while eligibility is loading", () => {
    viewModelHarness.eligibility.current = {
      categories: [],
      hasError: false,
      isLoading: true,
      refreshKey: 2,
      retry: vi.fn(),
    };
    const { result } = renderHook(() =>
      useReservationFormViewModel("2030-04-12", [])
    );

    expect(result.current.values.categoryId).toBe(
      viewModelHarness.values.categoryId
    );
    expect(
      viewModelHarness.handleCategoryChange
    ).not.toHaveBeenCalled();
    expect(
      result.current.hasEquipmentSelectionChanged
    ).toBe(false);
  });

  it("clears the category without changing other reservation values", () => {
    viewModelHarness.eligibility.current = {
      categories: [],
      hasError: false,
      isLoading: false,
      refreshKey: 2,
      retry: vi.fn(),
    };
    const { result } = renderHook(() =>
      useReservationFormViewModel("2030-04-12", [])
    );

    expect(
      viewModelHarness.handleCategoryChange
    ).toHaveBeenCalledWith("");
    expect(
      result.current.hasEquipmentSelectionChanged
    ).toBe(true);
    expect(result.current.values.customerName).toBe(
      viewModelHarness.values.customerName
    );
    expect(result.current.values.date).toBe(
      viewModelHarness.values.date
    );
    expect(result.current.values.durationHours).toBe(
      viewModelHarness.values.durationHours
    );
    expect(result.current.values.peopleCount).toBe(
      viewModelHarness.values.peopleCount
    );
    expect(result.current.values.time).toBe(
      viewModelHarness.values.time
    );
  });

  it("clears only an unavailable concrete unit when its category remains eligible", () => {
    viewModelHarness.equipment.current = {
      availableUnits: [],
      hasAvailabilityError: false,
      isAvailabilityLoading: false,
      requiresConcreteUnit: true,
    };
    const { result } = renderHook(() =>
      useReservationFormViewModel("2030-04-12", [])
    );

    expect(
      viewModelHarness.handleUnitChange
    ).toHaveBeenCalledWith("");
    expect(
      viewModelHarness.handleCategoryChange
    ).not.toHaveBeenCalled();
    expect(
      result.current.hasEquipmentSelectionChanged
    ).toBe(true);
  });

  it("clears the notice after the user selects a replacement unit", () => {
    viewModelHarness.equipment.current = {
      availableUnits: [],
      hasAvailabilityError: false,
      isAvailabilityLoading: false,
      requiresConcreteUnit: true,
    };
    const { result, rerender } = renderHook(() =>
      useReservationFormViewModel("2030-04-12", [])
    );

    viewModelHarness.equipment.current = {
      availableUnits: [{ code: "LANCHA-2", id: "unit-2" }],
      hasAvailabilityError: false,
      isAvailabilityLoading: false,
      requiresConcreteUnit: true,
    };
    rerender();

    act(() => result.current.handleUnitChange("unit-2"));

    expect(
      result.current.hasEquipmentSelectionChanged
    ).toBe(false);
    expect(
      viewModelHarness.handleUnitChange
    ).toHaveBeenCalledWith("unit-2");
  });

  it("does not report an invalidated unit before one has been selected", () => {
    viewModelHarness.values.unitId = "";
    viewModelHarness.equipment.current = {
      availableUnits: [],
      hasAvailabilityError: false,
      isAvailabilityLoading: false,
      requiresConcreteUnit: true,
    };
    const { result } = renderHook(() =>
      useReservationFormViewModel("2030-04-12", [])
    );

    expect(
      viewModelHarness.handleUnitChange
    ).not.toHaveBeenCalled();
    expect(
      result.current.hasEquipmentSelectionChanged
    ).toBe(false);
  });
});
