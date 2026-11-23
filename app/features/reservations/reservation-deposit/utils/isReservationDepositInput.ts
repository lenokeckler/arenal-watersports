import { TYPE_OF, UUID_PATTERN } from "@/app/constants";
import { isCurrencyCode } from "@/app/utils/money/isCurrencyCode";
import type { ReservationDepositInput } from "../models/ReservationDepositInput.interface";

const isObject = (value: unknown): value is object =>
  typeof value === TYPE_OF.OBJECT && value !== null;

const isString = (value: unknown): value is string =>
  typeof value === TYPE_OF.STRING;

const isBoolean = (value: unknown): value is boolean =>
  typeof value === TYPE_OF.BOOLEAN;

export const isReservationDepositInput = (
  input: unknown
): input is ReservationDepositInput =>
  isObject(input) &&
  "reservationId" in input &&
  isString(input.reservationId) &&
  UUID_PATTERN.test(input.reservationId) &&
  "amountText" in input &&
  isString(input.amountText) &&
  "currency" in input &&
  isCurrencyCode(input.currency) &&
  "hasDeposit" in input &&
  isBoolean(input.hasDeposit);
