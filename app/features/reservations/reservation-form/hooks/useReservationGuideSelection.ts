import type { ReservationFormInput } from "../models/ReservationFormInput.interface";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import type { UpdateReservationFormValue } from "../models/UpdateReservationFormValue.type";

export const useReservationGuideSelection = (
  values: ReservationFormInput,
  updateValue: UpdateReservationFormValue
) => {
  const handleGuideToggle = (guideId: string): void => {
    const selectedGuideIds = values.guideIds ?? [];
    const nextGuideIds = selectedGuideIds.includes(guideId)
      ? selectedGuideIds.filter(
          (selectedGuideId) => selectedGuideId !== guideId
        )
      : [...selectedGuideIds, guideId];
    updateValue(
      RESERVATION_FORM_FIELD.GUIDE_IDS,
      nextGuideIds
    );
  };
  const handleGuideIdsChange = (
    guideIds: string[]
  ): void => {
    updateValue(RESERVATION_FORM_FIELD.GUIDE_IDS, guideIds);
  };

  const reconcileGuideSelection = (
    availableGuideIds: string[]
  ): void => {
    const selectedGuideIds = values.guideIds ?? [];
    const availableGuideIdSet = new Set(availableGuideIds);
    const nextGuideIds = selectedGuideIds.filter(
      (guideId) => availableGuideIdSet.has(guideId)
    );
    if (nextGuideIds.length !== selectedGuideIds.length) {
      updateValue(
        RESERVATION_FORM_FIELD.GUIDE_IDS,
        nextGuideIds
      );
    }
  };

  return {
    handleGuideIdsChange,
    handleGuideToggle,
    reconcileGuideSelection,
  };
};
