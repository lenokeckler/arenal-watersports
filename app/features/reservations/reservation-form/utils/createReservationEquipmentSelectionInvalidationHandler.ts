import { STRING } from "@/app/constants";
import type { ReservationFormEquipmentSelectionProps } from "../models/ReservationFormEquipmentSelectionProps.interface";
import { getReservationEquipmentSelectionInvalidation } from "./getReservationEquipmentSelectionInvalidation";

export const createReservationEquipmentSelectionInvalidationHandler =

    (
      props: ReservationFormEquipmentSelectionProps,
      onSelectionChanged: () => void
    ): (() => void) =>
    () => {
      const invalidation =
        getReservationEquipmentSelectionInvalidation(props);
      if (invalidation.shouldClearCategory) {
        props.handleCategoryChange(STRING.Empty);
        onSelectionChanged();
        return;
      }
      if (invalidation.shouldClearUnit) {
        props.handleUnitChange(STRING.Empty);
        onSelectionChanged();
      }
    };
