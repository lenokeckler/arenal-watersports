import type { CreateReservationFormHandlersProps } from "../models/CreateReservationFormHandlersProps.interface";

export const createReservationFormHandlers = ({
  equipment,
  setHasEquipmentSelectionChanged,
  state,
}: CreateReservationFormHandlersProps) => ({
  handleCategoryChange: (value: string): void => {
    setHasEquipmentSelectionChanged(false);
    state.fields.handleCategoryChange(value);
  },
  handleUnitChange: (value: string): void => {
    setHasEquipmentSelectionChanged(false);
    state.fields.handleUnitChange(value);
  },
  handleRetryCategoryAvailability:
    equipment.handleRetryCategoryAvailability,
});
