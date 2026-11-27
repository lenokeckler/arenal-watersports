import { TYPE_OF, UUID_PATTERN } from "@/app/constants";
import { isCurrencyCode } from "@/app/utils/money/isCurrencyCode";
import type { ReservationExtraTimeInput } from "../models/ReservationExtraTimeInput.interface";
import { isPaymentChoice } from "@/app/utils/money/isPaymentChoice";
import { isReservationExtraTimeOutcome } from "./isReservationExtraTimeOutcome";

const isObject = (value: unknown): value is object =>
  typeof value === TYPE_OF.OBJECT && value !== null;

const isString = (value: unknown): value is string =>
  typeof value === TYPE_OF.STRING;

export const isReservationExtraTimeInput = (
  input: unknown
): input is ReservationExtraTimeInput =>
  isObject(input) &&
  "reservationId" in input &&
  isString(input.reservationId) &&
  UUID_PATTERN.test(input.reservationId) &&
  "outcome" in input &&
  (input.outcome === null ||
    isReservationExtraTimeOutcome(input.outcome)) &&
  "amountText" in input &&
  isString(input.amountText) &&
  "currency" in input &&
  isCurrencyCode(input.currency) &&
  "paymentChoice" in input &&
  (input.paymentChoice === null ||
    isPaymentChoice(input.paymentChoice)) &&
  "otherPaymentMethod" in input &&
  isString(input.otherPaymentMethod);
