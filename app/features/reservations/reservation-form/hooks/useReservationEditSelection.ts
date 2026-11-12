import type { ReservationEditEquipmentState } from "../models/ReservationEditEquipmentState.type";
import type { ReservationEditFormState } from "../models/ReservationEditFormState.type";
import { useReservationFormEquipmentSelection } from "./useReservationFormEquipmentSelection";

export const useReservationEditSelection = (
  { fields }: ReservationEditFormState,
  equipment: ReservationEditEquipmentState
) =>
  useReservationFormEquipmentSelection({
    availableUnits: equipment.availableUnits,
    categories: equipment.categories,
    isAvailabilityResolved:
      equipment.isAvailabilityResolved,
    isEligibilityError:
      equipment.hasEquipmentEligibilityError,
    isEligibilityLoading:
      equipment.isEquipmentEligibilityLoading,
    selectedCategoryId: fields.values.categoryId,
    selectedUnitId: equipment.retainedUnitId,
    onCategoryChange: fields.handleCategoryChange,
    onUnitChange: fields.handleUnitChange,
  });
