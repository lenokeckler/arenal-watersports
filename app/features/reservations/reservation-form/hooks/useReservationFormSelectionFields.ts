import { STRING } from "@/app/constants";
import { RESERVATION_TYPE } from "../constants/ReservationType.constants";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import type { ReservationFormInput } from "../models/ReservationFormInput.interface";
import type { ReservationFormValueUpdater } from "../models/ReservationFormValueUpdater.type";
import type { ReservationType } from "../models/ReservationType.type";

function clearGuideOnlyCategory(
  updateValue: ReservationFormValueUpdater,
  values: ReservationFormInput,
  categories: ReservationCategoryOption[]
): void {
  const selectedCategory = categories.find(
    (category) => category.id === values.categoryId
  );
  if (!selectedCategory?.isGuideOnly) {
    return;
  }
  updateValue("categoryId", STRING.Empty);
  updateValue("unitId", STRING.Empty);
}

export const useReservationFormSelectionFields = (
  updateValue: ReservationFormValueUpdater,
  values: ReservationFormInput,
  categories: ReservationCategoryOption[]
) => ({
  handleCategoryChange: (value: string): void => {
    if (values.categoryId === value) {
      return;
    }
    updateValue("categoryId", value);
    updateValue("unitId", STRING.Empty);
    updateValue("extraIds", []);
  },
  handleReservationTypeChange: (
    value: ReservationType
  ): void => {
    updateValue("reservationType", value);
    if (value === RESERVATION_TYPE.COMBO) {
      updateValue("extraIds", []);
    }
    if (value === RESERVATION_TYPE.TOUR) {
      return;
    }
    updateValue("guideIds", []);
    clearGuideOnlyCategory(updateValue, values, categories);
  },
  handleGuideToggle: (guideId: string): void => {
    const currentGuideIds = values.guideIds ?? [];
    const nextGuideIds = currentGuideIds.includes(guideId)
      ? currentGuideIds.filter(
          (selectedId) => selectedId !== guideId
        )
      : [...currentGuideIds, guideId];
    updateValue("guideIds", nextGuideIds);
  },
  handleExtraToggle: (extraId: string): void => {
    const currentExtraIds = values.extraIds ?? [];
    const nextExtraIds = currentExtraIds.includes(extraId)
      ? currentExtraIds.filter(
          (selectedId) => selectedId !== extraId
        )
      : [...currentExtraIds, extraId];
    updateValue("extraIds", nextExtraIds);
  },
  handleGuideIdsChange: (guideIds: string[]): void =>
    updateValue("guideIds", guideIds),
  handleUnitChange: (value: string): void => {
    if (values.unitId === value) {
      return;
    }
    updateValue("unitId", value);
    updateValue("extraIds", []);
  },
});
