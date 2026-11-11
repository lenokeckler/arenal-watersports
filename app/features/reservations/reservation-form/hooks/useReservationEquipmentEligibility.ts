import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import { useReservationEquipmentEligibilityController } from "./useReservationEquipmentEligibilityController";
import { useReservationEquipmentEligibilitySnapshot } from "./useReservationEquipmentEligibilitySnapshot";

export const useReservationEquipmentEligibility = (
  initialCategories: ReservationCategoryOption[]
) => {
  const snapshot =
    useReservationEquipmentEligibilitySnapshot(
      initialCategories
    );
  const retry =
    useReservationEquipmentEligibilityController(snapshot);

  return {
    categories: snapshot.categories,
    hasError: snapshot.hasError,
    isLoading: snapshot.isLoading,
    refreshKey: snapshot.refreshKey,
    retry,
  };
};
