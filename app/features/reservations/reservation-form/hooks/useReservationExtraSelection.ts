import { useCallback } from "react";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import type { ReservationFormInput } from "../models/ReservationFormInput.interface";
import type { UpdateReservationFormValue } from "../models/UpdateReservationFormValue.type";

export const useReservationExtraSelection = (
  values: ReservationFormInput,
  updateValue: UpdateReservationFormValue
) => {
  const clearExtraSelection = useCallback((): void => {
    updateValue(RESERVATION_FORM_FIELD.EXTRA_IDS, []);
  }, [updateValue]);

  return {
    clearExtraSelection,
    handleExtraToggle: (extraId: string): void => {
      const currentExtraIds = values.extraIds ?? [];
      const nextExtraIds = currentExtraIds.includes(extraId)
        ? currentExtraIds.filter(
            (selectedId) => selectedId !== extraId
          )
        : [...currentExtraIds, extraId];
      updateValue(
        RESERVATION_FORM_FIELD.EXTRA_IDS,
        nextExtraIds
      );
    },
  };
};
