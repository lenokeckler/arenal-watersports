import { TYPE_OF, UUID_PATTERN } from "@/app/constants";
import type { ReservationSplitDepartureInput } from "../models/ReservationSplitDepartureInput.interface";
import type { ReservationSplitInput } from "../models/ReservationSplitInput.interface";
import type { ReservationSplitItemInput } from "../models/ReservationSplitItemInput.interface";

const isObject = (value: unknown): value is object =>
  typeof value === TYPE_OF.OBJECT && value !== null;

const isUuid = (value: unknown): value is string =>
  typeof value === TYPE_OF.STRING &&
  UUID_PATTERN.test(`${value}`);

const isItemInput = (
  value: unknown
): value is ReservationSplitItemInput =>
  isObject(value) &&
  "itemId" in value &&
  isUuid(value.itemId) &&
  "quantity" in value &&
  typeof value.quantity === TYPE_OF.NUMBER;

const isDepartureInput = (
  value: unknown
): value is ReservationSplitDepartureInput =>
  isObject(value) &&
  "items" in value &&
  Array.isArray(value.items) &&
  value.items.every(isItemInput) &&
  "peopleCount" in value &&
  typeof value.peopleCount === TYPE_OF.NUMBER &&
  "time" in value &&
  typeof value.time === TYPE_OF.STRING;

export const isReservationSplitInput = (
  input: unknown
): input is ReservationSplitInput =>
  isObject(input) &&
  "departures" in input &&
  Array.isArray(input.departures) &&
  input.departures.every(isDepartureInput) &&
  "expectedUpdatedAt" in input &&
  typeof input.expectedUpdatedAt === TYPE_OF.STRING &&
  "reservationId" in input &&
  isUuid(input.reservationId);
