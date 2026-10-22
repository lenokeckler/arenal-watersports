import { RESERVATION_SCHEDULE } from "../constants/ReservationSchedule.constants";
import {
  PREDEFINED_COMBO_RESERVATION,
  PREDEFINED_COMBO_RESERVATION_COPY,
} from "../constants/PredefinedComboReservation.constants";
import { RESERVATION_FORM_COPY } from "../constants/ReservationFormCopy.constants";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import type { PredefinedComboReservationField } from "../models/PredefinedComboReservationField.constants";
import { PREDEFINED_COMBO_RESERVATION_FIELD } from "../models/PredefinedComboReservationField.constants";
import type { PredefinedComboReservationInput } from "../models/PredefinedComboReservationInput.interface";
import type { PredefinedComboReservationValidation } from "../models/PredefinedComboReservationValidation.interface";
import type { ValidatedPredefinedComboReservationInput } from "../models/ValidatedPredefinedComboReservationInput.interface";
import {
  isValidReservationDate,
  isValidReservationDuration,
  isValidReservationTime,
} from "./validateReservationSchedule";

const addError = (
  errors: PredefinedComboReservationValidation["errors"],
  field: PredefinedComboReservationField,
  isValid: boolean,
  message: string
): void => {
  if (!isValid) {
    errors[field] = message;
  }
};

const buildValidatedInput = (
  input: PredefinedComboReservationInput
): ValidatedPredefinedComboReservationInput => ({
  comboId: input.comboId,
  customerName: input.customerName.trim(),
  date: input.date,
  durationMinutes:
    input.durationHours *
    RESERVATION_SCHEDULE.MINUTES_PER_HOUR,
  guideIds: input.guideIds ?? [],
  peopleCount: input.peopleCount,
  time: input.time,
});

const createComboAndCustomerErrors = (
  input: PredefinedComboReservationInput
): PredefinedComboReservationValidation["errors"] => {
  const errors: PredefinedComboReservationValidation["errors"] =
    {};

  addError(
    errors,
    PREDEFINED_COMBO_RESERVATION_FIELD.COMBO_ID,
    PREDEFINED_COMBO_RESERVATION.UUID_PATTERN.test(
      input.comboId
    ),
    PREDEFINED_COMBO_RESERVATION_COPY.COMBO_ID
  );
  addError(
    errors,
    PREDEFINED_COMBO_RESERVATION_FIELD.CUSTOMER_NAME,
    Boolean(input.customerName.trim()),
    RESERVATION_FORM_COPY[
      RESERVATION_FORM_FIELD.CUSTOMER_NAME
    ]
  );
  return errors;
};

const createScheduleErrors = (
  input: PredefinedComboReservationInput
): PredefinedComboReservationValidation["errors"] => {
  const errors: PredefinedComboReservationValidation["errors"] =
    {};

  addError(
    errors,
    PREDEFINED_COMBO_RESERVATION_FIELD.DATE,
    isValidReservationDate(input.date),
    RESERVATION_FORM_COPY[RESERVATION_FORM_FIELD.DATE]
  );
  addError(
    errors,
    PREDEFINED_COMBO_RESERVATION_FIELD.DURATION_HOURS,
    isValidReservationDuration(input.durationHours),
    RESERVATION_FORM_COPY[
      RESERVATION_FORM_FIELD.DURATION_HOURS
    ]
  );
  addError(
    errors,
    PREDEFINED_COMBO_RESERVATION_FIELD.TIME,
    isValidReservationTime(input.time),
    RESERVATION_FORM_COPY[RESERVATION_FORM_FIELD.TIME]
  );

  return errors;
};

const createPeopleCountErrors = (
  input: PredefinedComboReservationInput
): PredefinedComboReservationValidation["errors"] => {
  const errors: PredefinedComboReservationValidation["errors"] =
    {};

  addError(
    errors,
    PREDEFINED_COMBO_RESERVATION_FIELD.PEOPLE_COUNT,
    Number.isInteger(input.peopleCount) &&
      input.peopleCount > 0,
    RESERVATION_FORM_COPY[
      RESERVATION_FORM_FIELD.PEOPLE_COUNT
    ]
  );

  return errors;
};

const createErrors = (
  input: PredefinedComboReservationInput
): PredefinedComboReservationValidation["errors"] => ({
  ...createComboAndCustomerErrors(input),
  ...createScheduleErrors(input),
  ...createPeopleCountErrors(input),
});

export const validatePredefinedComboReservationInput = (
  input: PredefinedComboReservationInput
): PredefinedComboReservationValidation => {
  const errors = createErrors(input);
  const isValid = Object.keys(errors).length === 0;

  return {
    errors,
    value: isValid ? buildValidatedInput(input) : null,
  };
};
