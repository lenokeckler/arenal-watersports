import { RESERVATION_TYPE } from "../constants/ReservationType.constants";
import type { UseReservationFormComboViewModelsInput } from "../models/UseReservationFormComboViewModelsInput.interface";
import type { ReservationFormComboViewModels } from "../models/ReservationFormComboViewModels.interface";
import { useCustomComboForm } from "./useCustomComboForm";
import { usePredefinedComboForm } from "./usePredefinedComboForm";

export const useReservationFormComboViewModels = ({
  dependencies,
  predefinedCombos,
}: UseReservationFormComboViewModelsInput): ReservationFormComboViewModels => {
  const { state, eligibility } = dependencies.resources;
  const customCombo = useCustomComboForm(
    eligibility.categories,
    dependencies.resources.resolvedDurationHours,
    state.fields.handleGuideIdsChange,
    state.submission.clearFieldError
  );
  const isComboReservation =
    state.fields.values.reservationType ===
    RESERVATION_TYPE.COMBO;
  const predefinedCombo = usePredefinedComboForm(
    predefinedCombos,
    isComboReservation,
    state.fields.handleGuideIdsChange,
    state.submission.clearSubmissionStatus
  );

  return { customCombo, predefinedCombo };
};
