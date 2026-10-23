import { useMemo, useState } from "react";
import { STRING } from "@/app/constants";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import { useReservationEquipmentViewModel } from "./useReservationEquipmentViewModel";
import { useReservationFormState } from "./useReservationFormState";
import { useReservationEquipmentEligibility } from "./useReservationEquipmentEligibility";
import { useReservationEquipmentSelectionSync } from "./useReservationEquipmentSelectionSync";
import { useReservationExtrasViewModel } from "./useReservationExtrasViewModel";

export const useReservationFormResources = (
  initialDate: string,
  categories: ReservationCategoryOption[]
) => {
  const [
    hasEquipmentSelectionChanged,
    setHasEquipmentSelectionChanged,
  ] = useState(false);
  const state = useReservationFormState(
    initialDate,
    STRING.Empty,
    categories
  );
  const eligibility =
    useReservationEquipmentEligibility(categories);
  const resolvedDurationHours =
    state.duration.resolveDurationHours(
      state.fields.values.durationHours
    );
  const extraIds = useMemo(
    () => state.fields.values.extraIds ?? [],
    [state.fields.values.extraIds]
  );
  const extras = useReservationExtrasViewModel({
    durationHours: resolvedDurationHours,
    extraIds,
    reservationType: state.fields.values.reservationType,
    unitId: state.fields.values.unitId,
  });
  const equipment = useReservationEquipmentViewModel(
    eligibility.categories,
    state.fields.values,
    resolvedDurationHours,
    eligibility.refreshKey
  );
  useReservationEquipmentSelectionSync({
    availableUnits: equipment.availableUnits,
    categories: eligibility.categories,
    categoryId: state.fields.values.categoryId,
    hasAvailabilityError: equipment.hasAvailabilityError,
    hasEligibilityError: eligibility.hasError,
    isAvailabilityLoading: equipment.isAvailabilityLoading,
    isEligibilityLoading: eligibility.isLoading,
    onCategoryChange: state.fields.handleCategoryChange,
    onUnitChange: state.fields.handleUnitChange,
    setHasSelectionChanged: setHasEquipmentSelectionChanged,
    unitId: state.fields.values.unitId,
  });
  return {
    eligibility,
    equipment,
    extras,
    hasEquipmentSelectionChanged,
    resolvedDurationHours,
    setHasEquipmentSelectionChanged,
    state,
  };
};
