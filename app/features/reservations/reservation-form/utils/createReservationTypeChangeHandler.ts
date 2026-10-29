import { STRING } from "@/app/constants";
import { RESERVATION_TYPE } from "../constants/ReservationType.constants";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import type { ReservationFormInput } from "../models/ReservationFormInput.interface";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import type { UpdateReservationFormValue } from "../models/UpdateReservationFormValue.type";
import type { ReservationType } from "../models/ReservationType.type";

export const createReservationTypeChangeHandler =
  (
    categories: ReservationCategoryOption[],
    values: ReservationFormInput,
    updateValue: UpdateReservationFormValue,
    onSelectionReset: (wasReset: boolean) => void
  ) =>
  (value: ReservationType) => {
    updateValue(
      RESERVATION_FORM_FIELD.RESERVATION_TYPE,
      value
    );
    const selectedCategory = categories.find(
      (category) => category.id === values.categoryId
    );
    if (
      value !== RESERVATION_TYPE.TOUR &&
      selectedCategory?.isGuideOnly
    ) {
      updateValue(
        RESERVATION_FORM_FIELD.CATEGORY_ID,
        STRING.Empty
      );
      updateValue(
        RESERVATION_FORM_FIELD.UNIT_ID,
        STRING.Empty
      );
      onSelectionReset(true);
      return;
    }
    onSelectionReset(false);
  };
