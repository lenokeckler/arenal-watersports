import type { ReservationFormViewModel } from "../models/ReservationFormViewModel.interface";
import type { ReservationFormSubmitOptions } from "../models/ReservationFormSubmitOptions.interface";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import { RESERVATION_FORM_COPY } from "../constants/ReservationFormCopy.constants";

export const createReservationFormSubmitHandler =
  (
    options: ReservationFormSubmitOptions
  ): ReservationFormViewModel["handleSubmit"] =>
  (event) => {
    event.preventDefault();
    if (
      options.requiresConcreteUnit &&
      !options.values.unitId.trim()
    ) {
      options.setFieldError(
        RESERVATION_FORM_FIELD.UNIT_ID,
        RESERVATION_FORM_COPY[
          RESERVATION_FORM_FIELD.UNIT_ID
        ]
      );
      return;
    }
    options.submitReservation({
      ...options.values,
      durationHours: options.resolvedDurationHours,
    });
  };
