import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useReservationFormEquipmentSelection } from "../hooks/useReservationFormEquipmentSelection";
import type { ReservationFormEquipmentSelectionOptions } from "../models/ReservationFormEquipmentSelectionOptions.interface";

const buildOptions =
  (): ReservationFormEquipmentSelectionOptions => ({
    availableUnits: [],
    categories: [
      {
        id: "category-1",
        isInterchangeable: false,
        name: "Lancha",
      },
    ],
    isAvailabilityResolved: true,
    isEligibilityError: false,
    isEligibilityLoading: false,
    selectedCategoryId: "category-1",
    selectedUnitId: "unit-1",
    onCategoryChange: vi.fn(),
    onUnitChange: vi.fn(),
  });

describe("useReservationFormEquipmentSelection", () => {
  it("clears stale units and resets the notice when a replacement is chosen", () => {
    const options = buildOptions();
    const { result } = renderHook(() =>
      useReservationFormEquipmentSelection(options)
    );

    expect(result.current.hasChanged).toBe(true);
    expect(options.onUnitChange).toHaveBeenCalledWith("");

    act(() => result.current.handleUnitChange("unit-2"));

    expect(options.onUnitChange).toHaveBeenLastCalledWith(
      "unit-2"
    );
    expect(result.current.hasChanged).toBe(false);
  });
});
