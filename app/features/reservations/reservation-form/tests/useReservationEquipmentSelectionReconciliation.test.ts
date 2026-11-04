import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useReservationEquipmentSelectionReconciliation } from "../hooks/useReservationEquipmentSelectionReconciliation";
import type { ReservationEquipmentSelectionReconciliationOptions } from "../models/ReservationEquipmentSelectionReconciliationOptions.interface";

const buildOptions =
  (): ReservationEquipmentSelectionReconciliationOptions => ({
    availableUnits: [],
    categories: [
      {
        id: "category-1",
        isInterchangeable: false,
        name: "Lancha",
      },
    ],
    handleCategoryChange: vi.fn(),
    handleUnitChange: vi.fn(),
    isAvailabilityResolved: false,
    isEligibilityError: false,
    isEligibilityLoading: false,
    selectedCategoryId: "category-1",
    selectedUnitId: "unit-1",
    setHasSelectionChanged: vi.fn(),
  });

describe("useReservationEquipmentSelectionReconciliation", () => {
  it("waits for refreshed availability before clearing a selected unit", () => {
    const options = buildOptions();
    const { rerender } = renderHook(
      ({ currentOptions }) =>
        useReservationEquipmentSelectionReconciliation(
          currentOptions
        ),
      { initialProps: { currentOptions: options } }
    );

    expect(options.handleUnitChange).not.toHaveBeenCalled();

    act(() => {
      rerender({
        currentOptions: {
          ...options,
          isAvailabilityResolved: true,
        },
      });
    });

    expect(options.handleUnitChange).toHaveBeenCalledWith(
      ""
    );
    expect(
      options.setHasSelectionChanged
    ).toHaveBeenCalledWith(true);
  });

  it("preserves selection while eligibility is unavailable", () => {
    const options = {
      ...buildOptions(),
      isEligibilityError: true,
      isAvailabilityResolved: true,
    };

    renderHook(() =>
      useReservationEquipmentSelectionReconciliation(
        options
      )
    );

    expect(options.handleUnitChange).not.toHaveBeenCalled();
    expect(
      options.handleCategoryChange
    ).not.toHaveBeenCalled();
  });
});
