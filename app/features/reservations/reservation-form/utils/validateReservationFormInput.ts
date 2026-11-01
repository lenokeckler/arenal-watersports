import { RESERVATION_FORM_COPY } from "../constants/ReservationFormCopy.constants";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import type { ReservationFormField } from "../models/ReservationFormField.constants";
import type { ReservationFormInput } from "../models/ReservationFormInput.interface";
import type { ReservationFormValidation } from "../models/ReservationFormValidation.interface";
import type { ValidatedReservationFormInput } from "../models/ValidatedReservationFormInput.interface";
import { RESERVATION_EQUIPMENT_COMMITMENT_TYPE } from "../constants/ReservationEquipmentCommitmentType.constants";
import type { NullableRef } from "@/app/types";
import {
  getReservationDurationMinutes,
  isValidReservationDate,
  isValidReservationTime,
} from "./validateReservationSchedule";

const isPositiveInteger = (value: number): boolean =>
  Number.isInteger(value) && value > 0;

const buildValidatedInput = (
  input: ReservationFormInput,
  durationMinutes: number
): ValidatedReservationFormInput => ({
  customerName: input.customerName.trim(),
  date: input.date,
  durationMinutes,
  peopleCount: input.peopleCount,
  time: input.time,
  equipmentCommitment: input.unitId.trim()
    ? {
        kind: RESERVATION_EQUIPMENT_COMMITMENT_TYPE.UNIT,
        unitId: input.unitId.trim(),
      }
    : {
        kind: RESERVATION_EQUIPMENT_COMMITMENT_TYPE.CATEGORY,
        categoryId: input.categoryId.trim(),
        quantity: input.quantity,
      },
});

const addFieldError = (
  errors: ReservationFormValidation["errors"],
  field: ReservationFormField,
  isValid: boolean
): void => {
  if (!isValid) {
    errors[field] = RESERVATION_FORM_COPY[field];
  }
};

const validateCustomerAndGroup = (
  input: ReservationFormInput
): ReservationFormValidation["errors"] => {
  const errors: ReservationFormValidation["errors"] = {};

  addFieldError(
    errors,
    RESERVATION_FORM_FIELD.CUSTOMER_NAME,
    Boolean(input.customerName.trim())
  );
  addFieldError(
    errors,
    RESERVATION_FORM_FIELD.PEOPLE_COUNT,
    isPositiveInteger(input.peopleCount)
  );
  return errors;
};

const validateSchedule = (
  input: ReservationFormInput,
  durationMinutes: NullableRef<number>
): ReservationFormValidation["errors"] => {
  const errors: ReservationFormValidation["errors"] = {};
  addFieldError(
    errors,
    RESERVATION_FORM_FIELD.DATE,
    isValidReservationDate(input.date)
  );
  addFieldError(
    errors,
    RESERVATION_FORM_FIELD.TIME,
    isValidReservationTime(input.time)
  );
  addFieldError(
    errors,
    RESERVATION_FORM_FIELD.DURATION_HOURS,
    durationMinutes !== null
  );
  return errors;
};

const validateEquipment = (
  input: ReservationFormInput
): ReservationFormValidation["errors"] => {
  const errors: ReservationFormValidation["errors"] = {};
  addFieldError(
    errors,
    RESERVATION_FORM_FIELD.CATEGORY_ID,
    Boolean(input.categoryId.trim())
  );
  if (!input.unitId.trim()) {
    addFieldError(
      errors,
      RESERVATION_FORM_FIELD.QUANTITY,
      isPositiveInteger(input.quantity)
    );
  }
  return errors;
};

const validateFields = (
  input: ReservationFormInput,
  durationMinutes: NullableRef<number>
): ReservationFormValidation["errors"] => ({
  ...validateCustomerAndGroup(input),
  ...validateSchedule(input, durationMinutes),
  ...validateEquipment(input),
});

export const validateReservationFormInput = (
  input: ReservationFormInput
): ReservationFormValidation => {
  const durationMinutes = getReservationDurationMinutes(
    input.durationHours
  );
  const errors = validateFields(input, durationMinutes);

  const value =
    Object.keys(errors).length === 0 &&
    durationMinutes !== null
      ? buildValidatedInput(input, durationMinutes)
      : null;

  return {
    errors,
    value,
  };
};
