import { STRING } from "@/app/constants";
import { RESERVATION_FORM_COPY } from "../constants/ReservationFormCopy.constants";
import { RESERVATION_TYPE } from "../constants/ReservationType.constants";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import type { ReservationFormViewModel } from "../models/ReservationFormViewModel.interface";
import type { ReservationCreateSubmitOptions } from "../models/ReservationCreateSubmitOptions.interface";
import { submitCustomComboDraft } from "./submitCustomComboDraft";

const submitRentalReservation = (
  options: ReservationCreateSubmitOptions
): void => {
  if (
    options.requiresConcreteUnit &&
    options.values.unitId === STRING.Empty
  ) {
    options.applyResult({
      ok: false,
      errors: {
        [RESERVATION_FORM_FIELD.UNIT_ID]:
          RESERVATION_FORM_COPY[
            RESERVATION_FORM_FIELD.UNIT_ID
          ],
      },
    });
    options.requestErrorFocus();
    return;
  }
  if (options.isQuantityUnavailable) {
    return;
  }
  options.submitReservation(
    {
      ...options.values,
      durationHours: options.durationHours,
    },
    options.onUnitUnavailable,
    options.onSuccess
  );
};

export const createReservationCreateSubmitHandler =
  (
    options: ReservationCreateSubmitOptions
  ): ReservationFormViewModel["handleSubmit"] =>
  (event) => {
    event.preventDefault();
    if (
      options.values.reservationType ===
      RESERVATION_TYPE.COMBO
    ) {
      submitCustomComboDraft({
        customCombo: options.customCombo,
        durationHours: options.durationHours,
        requestErrorFocus: options.requestErrorFocus,
        setFieldError: options.setFieldError,
        submitCustomComboReservation:
          options.submitCustomComboReservation,
        values: options.values,
      });
      return;
    }
    submitRentalReservation(options);
  };
