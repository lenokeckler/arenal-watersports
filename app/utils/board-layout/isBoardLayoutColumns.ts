import {
  BOARD_LAYOUT_COLUMN_OPTIONS,
  type BoardLayoutColumns,
} from "@/app/constants";

export const isBoardLayoutColumns = (
  value: unknown
): value is BoardLayoutColumns =>
  BOARD_LAYOUT_COLUMN_OPTIONS.some(
    (option) => option === value
  );
