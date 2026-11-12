import { TYPE_OF, UUID_PATTERN } from "@/app/constants";
import { isCurrencyCode } from "@/app/utils/money/isCurrencyCode";
import type { ReservationChargeInput } from "../models/ReservationChargeInput.interface";

const isObject = (value: unknown): value is object =>
  typeof value === TYPE_OF.OBJECT && value !== null;

const isString = (value: unknown): value is string =>
  typeof value === TYPE_OF.STRING;

export const isReservationChargeInput = (
  input: unknown
): input is ReservationChargeInput =>
  isObject(input) &&
  "reservationId" in input &&
  isString(input.reservationId) &&
  UUID_PATTERN.test(input.reservationId) &&
  "amountText" in input &&
  isString(input.amountText) &&
  "currency" in input &&
  isCurrencyCode(input.currency) &&
  "paymentMethod" in input &&
  isString(input.paymentMethod);
