import { RESERVATION_TYPE } from "../constants/ReservationType.constants";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import type { ReservationPredefinedCombo } from "../models/ReservationPredefinedCombo.interface";
import type { ReservationType } from "../models/ReservationType.type";
import { useReservationFormViewModelDependencies } from "./useReservationFormViewModelDependencies";
import { createReservationFormSubmitHandler } from "../utils/createReservationFormSubmitHandler";
import type { ReservationFormViewModelSetup } from "../models/ReservationFormViewModelSetup.interface";
import { useReservationFormComboViewModels } from "./useReservationFormComboViewModels";
import { createReservationFormSubmitOptions } from "../utils/createReservationFormSubmitOptions";

export const useReservationFormViewModelComposition = (
  initialDate: string,
  categories: ReservationCategoryOption[],
  predefinedCombos: ReservationPredefinedCombo[]
): ReservationFormViewModelSetup => {
  const dependencies =
    useReservationFormViewModelDependencies(
      initialDate,
      categories
    );
  const comboViewModels = useReservationFormComboViewModels(
    {
      dependencies,
      predefinedCombos,
    }
  );
  const handleSubmit = createReservationFormSubmitHandler(
    createReservationFormSubmitOptions({
      dependencies,
      ...comboViewModels,
    })
  );
  const handleReservationTypeChange = (
    value: ReservationType
  ): void => {
    if (value !== RESERVATION_TYPE.COMBO) {
      comboViewModels.predefinedCombo.reset();
    }
    dependencies.resources.state.fields.handleReservationTypeChange(
      value
    );
  };

  return {
    dependencies,
    ...comboViewModels,
    handleSubmit,
    handleReservationTypeChange,
  };
};
