import { startTransition, useEffect } from "react";
import { STRING } from "@/app/constants";
import type { ReservationEquipmentSelectionReconciliationOptions } from "../models/ReservationEquipmentSelectionReconciliationOptions.interface";

export const useReservationEquipmentSelectionReconciliation =
  ({
    availableUnits,
    categories,
    handleCategoryChange,
    handleUnitChange,
    isAvailabilityResolved,
    isEligibilityError,
    isEligibilityLoading,
    selectedCategoryId,
    selectedUnitId,
    setHasSelectionChanged,
  }: ReservationEquipmentSelectionReconciliationOptions): void => {
    useEffect(() => {
      if (isEligibilityLoading || isEligibilityError) {
        return;
      }
      const selectedCategory = categories.find(
        (category) => category.id === selectedCategoryId
      );
      if (
        !selectedCategory &&
        selectedCategoryId !== STRING.Empty
      ) {
        handleCategoryChange(STRING.Empty);
        startTransition(() => setHasSelectionChanged(true));
        return;
      }
      if (
        selectedCategory?.isInterchangeable === false &&
        selectedUnitId !== STRING.Empty &&
        isAvailabilityResolved &&
        !availableUnits.some(
          (unit) => unit.id === selectedUnitId
        )
      ) {
        handleUnitChange(STRING.Empty);
        startTransition(() => setHasSelectionChanged(true));
      }
    }, [
      availableUnits,
      categories,
      handleCategoryChange,
      handleUnitChange,
      isAvailabilityResolved,
      isEligibilityError,
      isEligibilityLoading,
      selectedCategoryId,
      selectedUnitId,
      setHasSelectionChanged,
    ]);
  };
