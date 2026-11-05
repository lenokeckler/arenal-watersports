import {
  startTransition,
  useEffect,
  useState,
} from "react";
import type { ReservationFormEquipmentSelection } from "../models/ReservationFormEquipmentSelection.interface";
import type { ReservationFormEquipmentSelectionProps } from "../models/ReservationFormEquipmentSelectionProps.interface";
import { createReservationEquipmentSelectionInvalidationHandler } from "../utils/createReservationEquipmentSelectionInvalidationHandler";

export const useReservationFormEquipmentSelection = (
  props: ReservationFormEquipmentSelectionProps
): ReservationFormEquipmentSelection => {
  const {
    handleCategoryChange: onCategoryChange,
    handleUnitChange: onUnitChange,
  } = props;
  const [
    hasEquipmentSelectionChanged,
    setHasEquipmentSelectionChanged,
  ] = useState(false);
  const markEquipmentSelectionChanged = () =>
    startTransition(() =>
      setHasEquipmentSelectionChanged(true)
    );
  const handleInvalidation =
    createReservationEquipmentSelectionInvalidationHandler(
      props,
      markEquipmentSelectionChanged
    );
  useEffect(handleInvalidation, [handleInvalidation]);
  const handleCategoryChange = (value: string): void => {
    setHasEquipmentSelectionChanged(false);
    onCategoryChange(value);
  };
  const handleUnitChange = (value: string): void => {
    setHasEquipmentSelectionChanged(false);
    onUnitChange(value);
  };
  return {
    handleCategoryChange,
    handleUnitChange,
    hasEquipmentSelectionChanged,
  };
};
