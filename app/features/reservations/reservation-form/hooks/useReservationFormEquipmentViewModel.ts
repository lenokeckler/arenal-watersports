import { RESERVATION_TYPE } from "../constants/ReservationType.constants";
import type { ReservationFormEquipmentViewModel } from "../models/ReservationFormEquipmentViewModel.interface";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import type { ReservationFormFieldsViewModel } from "../models/ReservationFormFieldsViewModel.interface";
import { filterReservationCategoriesByType } from "../utils/filterReservationCategoriesByType";
import { useReservationEquipmentEligibility } from "./useReservationEquipmentEligibility";
import { useReservationEquipmentViewModel } from "./useReservationEquipmentViewModel";
import { useReservationFormEquipmentSelection } from "./useReservationFormEquipmentSelection";

export const useReservationFormEquipmentViewModel = (
  categories: ReservationCategoryOption[],
  fields: ReservationFormFieldsViewModel,
  durationHours: number
): ReservationFormEquipmentViewModel => {
  const eligibility =
    useReservationEquipmentEligibility(categories);
  const equipment = useReservationEquipmentViewModel(
    eligibility.categories,
    fields.values,
    durationHours,
    eligibility.refreshKey
  );
  const selection = useReservationFormEquipmentSelection({
    categories: eligibility.categories,
    categoryId: fields.values.categoryId,
    equipment,
    handleCategoryChange: fields.handleCategoryChange,
    handleUnitChange: fields.handleUnitChange,
    hasEligibilityError: eligibility.hasError,
    isEligibilityLoading: eligibility.isLoading,
    unitId: fields.values.unitId,
  });
  return {
    ...equipment,
    ...selection,
    categories: filterReservationCategoriesByType(
      eligibility.categories,
      fields.values.reservationType ??
        RESERVATION_TYPE.RENTAL
    ),
    handleRetryEquipmentEligibility: eligibility.retry,
    hasEquipmentEligibilityError: eligibility.hasError,
    isEquipmentEligibilityLoading: eligibility.isLoading,
  };
};
