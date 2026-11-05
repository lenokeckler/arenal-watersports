import { STRING } from "@/app/constants";
import type { ReservationFormEquipmentSelectionProps } from "../models/ReservationFormEquipmentSelectionProps.interface";

export const getReservationEquipmentSelectionInvalidation =
  (input: ReservationFormEquipmentSelectionProps) => {
    const noInvalidation = {
      shouldClearCategory: false,
      shouldClearUnit: false,
    };
    if (
      input.isEligibilityLoading ||
      input.hasEligibilityError
    ) {
      return noInvalidation;
    }
    const selectedCategory = input.categories.find(
      (category) => category.id === input.categoryId
    );
    if (!selectedCategory) {
      return {
        ...noInvalidation,
        shouldClearCategory:
          input.categoryId !== STRING.Empty,
      };
    }
    return {
      ...noInvalidation,
      shouldClearUnit:
        selectedCategory.isInterchangeable === false &&
        input.unitId !== STRING.Empty &&
        !input.equipment.isAvailabilityLoading &&
        !input.equipment.hasAvailabilityError &&
        !input.equipment.availableUnits.some(
          (unit) => unit.id === input.unitId
        ),
    };
  };
