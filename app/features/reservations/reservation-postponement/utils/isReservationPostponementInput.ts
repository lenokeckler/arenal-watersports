import { TYPE_OF, UUID_PATTERN } from "@/app/constants";
import { RESERVATION_POSTPONEMENT_CAUSE } from "../constants/ReservationPostponementCause.constants";
import type { ReservationPostponementInput } from "../models/ReservationPostponementInput.interface";
import type { ReservationPostponementReadingInput } from "../models/ReservationPostponementReadingInput.interface";

const CAUSES: readonly unknown[] = Object.values(
  RESERVATION_POSTPONEMENT_CAUSE
);

const isObject = (value: unknown): value is object =>
  typeof value === TYPE_OF.OBJECT && value !== null;

const isUuid = (value: unknown): value is string =>
  typeof value === TYPE_OF.STRING &&
  UUID_PATTERN.test(`${value}`);

const isNullableNumber = (value: unknown): boolean =>
  value === null ||
  value === undefined ||
  (typeof value === TYPE_OF.NUMBER &&
    Number.isFinite(value));

const isTimestamp = (value: unknown): value is string =>
  typeof value === TYPE_OF.STRING &&
  !Number.isNaN(Date.parse(`${value}`));

const isReadingInput = (
  value: unknown
): value is ReservationPostponementReadingInput =>
  isObject(value) &&
  "itemId" in value &&
  isUuid(value.itemId) &&
  "fuelIn" in value &&
  isNullableNumber(value.fuelIn) &&
  "usageIn" in value &&
  isNullableNumber(value.usageIn);

export const isReservationPostponementInput = (
  input: unknown
): input is ReservationPostponementInput =>
  isObject(input) &&
  "cause" in input &&
  CAUSES.includes(input.cause) &&
  "date" in input &&
  typeof input.date === TYPE_OF.STRING &&
  "expectedUpdatedAt" in input &&
  isTimestamp(input.expectedUpdatedAt) &&
  "readings" in input &&
  Array.isArray(input.readings) &&
  input.readings.every(isReadingInput) &&
  "reason" in input &&
  typeof input.reason === TYPE_OF.STRING &&
  "reservationId" in input &&
  isUuid(input.reservationId) &&
  "time" in input &&
  typeof input.time === TYPE_OF.STRING;
