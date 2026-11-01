import { STRING } from "@/app/constants";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import { useReservationEquipmentEligibility } from "./useReservationEquipmentEligibility";
import { useReservationEquipmentViewModel } from "./useReservationEquipmentViewModel";
import { useReservationFormState } from "./useReservationFormState";

export const useReservationFormViewModelData = (
  initialDate: string,
  categories: ReservationCategoryOption[]
) => {
  const state = useReservationFormState(
    initialDate,
    STRING.Empty
  );
  const eligibility =
    useReservationEquipmentEligibility(categories);
  const resolvedDurationHours =
    state.duration.resolveDurationHours(
      state.fields.values.durationHours
    );
  const equipment = useReservationEquipmentViewModel(
    eligibility.categories,
    state.fields.values,
    resolvedDurationHours,
    eligibility.refreshKey
  );

  return {
    eligibleCategories: eligibility.categories,
    eligibility,
    equipment,
    resolvedDurationHours,
    state,
  };
};
