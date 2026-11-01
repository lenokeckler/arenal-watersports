import { PAGINATION } from "@/app/constants";
import type { NullableUndefined } from "@/app/types";

export const readFirstSearchParam = (
  rawParam: NullableUndefined<string | string[]>
): NullableUndefined<string> =>
  Array.isArray(rawParam)
    ? rawParam[PAGINATION.DEFAULT_PAGE]
    : rawParam;
