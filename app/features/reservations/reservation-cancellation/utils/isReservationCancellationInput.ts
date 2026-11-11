import { TYPE_OF, UUID_PATTERN } from "@/app/constants";
import type { ReservationCancellationInput } from "../models/ReservationCancellationInput.interface";

const isObject = (value: unknown): value is object =>
  typeof value === TYPE_OF.OBJECT && value !== null;

const isString = (value: unknown): value is string =>
  typeof value === TYPE_OF.STRING;

export const isReservationCancellationInput = (
  input: unknown
): input is ReservationCancellationInput =>
  isObject(input) &&
  "reservationId" in input &&
  isString(input.reservationId) &&
  UUID_PATTERN.test(input.reservationId) &&
  "expectedUpdatedAt" in input &&
  isString(input.expectedUpdatedAt) &&
  !Number.isNaN(Date.parse(input.expectedUpdatedAt)) &&
  "reason" in input &&
  isString(input.reason);
