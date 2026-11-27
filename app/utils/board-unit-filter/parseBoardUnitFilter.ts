import {
  BOARD_UNIT_FILTER,
  BOARD_UNIT_FILTER_ORDER,
  LENGTH,
  type BoardUnitFilter,
} from "@/app/constants";
import type { NullableUndefined } from "@/app/types";

const isBoardUnitFilter = (
  value: unknown
): value is BoardUnitFilter =>
  BOARD_UNIT_FILTER_ORDER.some(
    (filter) => filter === value
  );

export const parseBoardUnitFilter = (
  param: NullableUndefined<string | string[]>
): BoardUnitFilter => {
  const value = Array.isArray(param)
    ? param[LENGTH.ZERO]
    : param;

  return isBoardUnitFilter(value)
    ? value
    : BOARD_UNIT_FILTER.ALL;
};
