"use server";

import { TYPE_OF } from "@/app/constants";
import { RESERVATION_EXTRA } from "../constants/ReservationExtra.constants";
import type { ReservationExtraOption } from "../models/ReservationExtraOption.interface";
import type { ReservationExtraUnitInput } from "../models/ReservationExtraUnitInput.interface";
import { getReservationExtras } from "../services/getReservationExtras";

const isRecord = (
  value: unknown
): value is Record<string, unknown> =>
  typeof value === TYPE_OF.OBJECT &&
  value !== null &&
  !Array.isArray(value);

const isString = (value: unknown): value is string =>
  typeof value === TYPE_OF.STRING;

const isReservationExtraUnitInput = (
  input: unknown
): input is ReservationExtraUnitInput => {
  if (!isRecord(input)) {
    return false;
  }

  const unitId = input.unitId;
  if (!isString(unitId)) {
    return false;
  }

  return RESERVATION_EXTRA.UUID_PATTERN.test(unitId);
};

export const getReservationExtrasAction = async (
  input: unknown
): Promise<ReservationExtraOption[]> => {
  if (!isReservationExtraUnitInput(input)) {
    return [];
  }

  return await getReservationExtras(input);
};
