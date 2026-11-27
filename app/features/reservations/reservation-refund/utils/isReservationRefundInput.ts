import { TYPE_OF, UUID_PATTERN } from "@/app/constants";
import { isCurrencyCode } from "@/app/utils/money/isCurrencyCode";
import { RESERVATION_REFUND_REASON } from "../constants/ReservationRefundReason.constants";
import type { ReservationRefundInput } from "../models/ReservationRefundInput.interface";

const isObject = (value: unknown): value is object =>
  typeof value === TYPE_OF.OBJECT && value !== null;

const isString = (value: unknown): value is string =>
  typeof value === TYPE_OF.STRING;

const isReasonChoice = (value: unknown): boolean =>
  value === null ||
  Object.values(RESERVATION_REFUND_REASON).some(
    (reason) => reason === value
  );

export const isReservationRefundInput = (
  input: unknown
): input is ReservationRefundInput =>
  isObject(input) &&
  "reservationId" in input &&
  isString(input.reservationId) &&
  UUID_PATTERN.test(input.reservationId) &&
  "amountText" in input &&
  isString(input.amountText) &&
  "currency" in input &&
  isCurrencyCode(input.currency) &&
  "reason" in input &&
  isReasonChoice(input.reason) &&
  "otherReasonText" in input &&
  isString(input.otherReasonText);
