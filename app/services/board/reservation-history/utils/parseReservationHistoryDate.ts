import {
  ISO_DATE_PATTERN,
  ISO_DATE_UTC_MIDNIGHT_SUFFIX,
} from "@/app/constants";
import type {
  NullableRef,
  NullableUndefined,
} from "@/app/types";
import { readFirstSearchParam } from "./readFirstSearchParam";

export const parseReservationHistoryDate = (
  rawParam: NullableUndefined<string | string[]>
): NullableRef<string> => {
  const candidate = readFirstSearchParam(rawParam);

  if (
    candidate === undefined ||
    !ISO_DATE_PATTERN.test(candidate)
  ) {
    return null;
  }

  const parsedDate = new Date(
    `${candidate}${ISO_DATE_UTC_MIDNIGHT_SUFFIX}`
  );

  return !Number.isNaN(parsedDate.getTime()) &&
    parsedDate.toISOString().startsWith(candidate)
    ? candidate
    : null;
};
