import { startTransition, useEffect } from "react";
import { STRING } from "@/app/constants";
import type { ReservationEquipmentSelectionSyncProps } from "../models/ReservationEquipmentSelectionSyncProps.interface";

export const useReservationEquipmentSelectionSync = ({
  availableUnits,
  categories,
  categoryId,
  hasAvailabilityError,
  hasEligibilityError,
  isAvailabilityLoading,
  isEligibilityLoading,
  onCategoryChange,
  onUnitChange,
  setHasSelectionChanged,
  unitId,
}: ReservationEquipmentSelectionSyncProps): void => {
  useEffect(() => {
    if (isEligibilityLoading || hasEligibilityError) {
      return;
    }
    const selectedCategory = categories.find(
      (category) => category.id === categoryId
    );
    if (!selectedCategory && categoryId !== STRING.Empty) {
      onCategoryChange(STRING.Empty);
      startTransition(() => setHasSelectionChanged(true));
      return;
    }
    if (
      selectedCategory?.isInterchangeable === false &&
      unitId !== STRING.Empty &&
      !isAvailabilityLoading &&
      !hasAvailabilityError &&
      !availableUnits.some((unit) => unit.id === unitId)
    ) {
      onUnitChange(STRING.Empty);
      startTransition(() => setHasSelectionChanged(true));
    }
  }, [
    availableUnits,
    categoryId,
    categories,
    hasAvailabilityError,
    hasEligibilityError,
    isAvailabilityLoading,
    isEligibilityLoading,
    onCategoryChange,
    onUnitChange,
    setHasSelectionChanged,
    unitId,
  ]);
};
