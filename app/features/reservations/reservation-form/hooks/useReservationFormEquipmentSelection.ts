import { useCallback, useState } from "react";
import type { ReservationFormEquipmentSelectionOptions } from "../models/ReservationFormEquipmentSelectionOptions.interface";
import { useReservationEquipmentSelectionReconciliation } from "./useReservationEquipmentSelectionReconciliation";

export const useReservationFormEquipmentSelection = ({
  availableUnits,
  categories,
  isAvailabilityResolved,
  isEligibilityError,
  isEligibilityLoading,
  selectedCategoryId,
  selectedUnitId,
  onCategoryChange,
  onUnitChange,
}: ReservationFormEquipmentSelectionOptions) => {
  const [hasChanged, setHasChanged] = useState(false);
  const handleCategoryChange = useCallback(
    (value: string): void => {
      setHasChanged(false);
      onCategoryChange(value);
    },
    [onCategoryChange]
  );
  const handleUnitChange = useCallback(
    (value: string): void => {
      setHasChanged(false);
      onUnitChange(value);
    },
    [onUnitChange]
  );

  useReservationEquipmentSelectionReconciliation({
    availableUnits,
    categories,
    handleCategoryChange: onCategoryChange,
    handleUnitChange: onUnitChange,
    isAvailabilityResolved,
    isEligibilityError,
    isEligibilityLoading,
    selectedCategoryId,
    selectedUnitId,
    setHasSelectionChanged: setHasChanged,
  });

  return {
    handleCategoryChange,
    handleUnitChange,
    hasChanged,
  };
};
