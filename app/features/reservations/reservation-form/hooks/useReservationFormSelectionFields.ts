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
    updateValue("categoryId", value);
    updateValue("unitId", STRING.Empty);
  },
  handleReservationTypeChange: (
    value: ReservationType
  ): void => {
    updateValue("reservationType", value);
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
  handleUnitChange: (value: string): void =>
    updateValue("unitId", value),
});
