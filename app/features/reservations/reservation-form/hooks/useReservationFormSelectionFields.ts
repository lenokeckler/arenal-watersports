import type { ReservationFormInput } from "../models/ReservationFormInput.interface";
import type { UpdateReservationFormValue } from "../models/UpdateReservationFormValue.type";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";

export const useReservationFormSelectionFields = (
  updateValue: UpdateReservationFormValue,
  values: ReservationFormInput
) => ({
  handleGuideToggle: (guideId: string): void => {
    const currentGuideIds = values.guideIds ?? [];
    const nextGuideIds = currentGuideIds.includes(guideId)
      ? currentGuideIds.filter(
          (selectedId) => selectedId !== guideId
        )
      : [...currentGuideIds, guideId];
    updateValue(
      RESERVATION_FORM_FIELD.GUIDE_IDS,
      nextGuideIds
    );
  },
  reconcileGuideSelection: (
    availableGuideIds: string[]
  ): void => {
    const selectedGuideIds = values.guideIds ?? [];
    const availableGuideIdSet = new Set(availableGuideIds);
    const reconciledGuideIds = selectedGuideIds.filter(
      (guideId) => availableGuideIdSet.has(guideId)
    );
    if (
      reconciledGuideIds.length !== selectedGuideIds.length
    ) {
      updateValue(
        RESERVATION_FORM_FIELD.GUIDE_IDS,
        reconciledGuideIds
      );
    }
  },
});
