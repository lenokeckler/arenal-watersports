"use client";

import { useRouter } from "next/navigation";
import type { ReservationFormViewModel } from "../models/ReservationFormViewModel.interface";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import { useReservationFormViewModelData } from "./useReservationFormViewModelData";
import { useReservationFormEquipmentSelection } from "./useReservationFormEquipmentSelection";
import { useReservationFormViewModelActions } from "./useReservationFormViewModelActions";
import { createReservationFormViewModel } from "../utils/createReservationFormViewModel";

export const useReservationFormViewModel = (
  options: ReservationFormViewModelOptions
): ReservationFormViewModel => {
  const router = useRouter();
  const data = useReservationFormViewModelData(
    initialDate,
    categories
  );
  const selection = useReservationFormEquipmentSelection({
    availableUnits: data.equipment.availableUnits,
    categories: data.eligibleCategories,
    isAvailabilityResolved:
      data.equipment.isAvailabilityResolved,
    isEligibilityError: data.eligibility.hasError,
    isEligibilityLoading: data.eligibility.isLoading,
    onCategoryChange:
      data.state.fields.handleCategoryChange,
    onUnitChange: data.state.fields.handleUnitChange,
    selectedCategoryId: data.state.fields.values.categoryId,
    selectedUnitId: data.state.fields.values.unitId,
  });
  const actions = useReservationFormViewModelActions(data);

  return createReservationFormViewModel(
    data,
    selection,
    actions,
    router.back
  );
};
