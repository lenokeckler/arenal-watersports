import { LENGTH } from "@/app/constants";
import type { NullableUndefined } from "@/app/types";

export const readFirstSearchParam = (
  rawParam: NullableUndefined<string | string[]>
): NullableUndefined<string> =>
  Array.isArray(rawParam)
    ? rawParam[LENGTH.ZERO]
    : rawParam;
