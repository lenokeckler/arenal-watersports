import { UUID_PATTERN } from "@/app/constants";
import type {
  NullableRef,
  NullableUndefined,
} from "@/app/types";
import { readFirstSearchParam } from "./readFirstSearchParam";

export const parseReservationHistoryCategory = (
  rawParam: NullableUndefined<string | string[]>
): NullableRef<string> => {
  const candidate = readFirstSearchParam(rawParam);

  return candidate !== undefined &&
    UUID_PATTERN.test(candidate)
    ? candidate
    : null;
};
