import {
  BOARD_LAYOUT_STORAGE_FIELD,
  BOARD_LAYOUT_STORAGE_KEY,
  DEFAULT_BOARD_LAYOUT,
  TYPE_OF,
} from "@/app/constants";
import type { BoardLayoutPreference } from "@/app/types";
import { isBoardLayoutColumns } from "./isBoardLayoutColumns";

const isRecord = (
  value: unknown
): value is Record<string, unknown> =>
  typeof value === TYPE_OF.OBJECT &&
  value !== null &&
  !Array.isArray(value);

const parseBoardLayout = (
  storedValue: string
): BoardLayoutPreference => {
  const parsedValue: unknown = JSON.parse(storedValue);

  if (!isRecord(parsedValue)) {
    return DEFAULT_BOARD_LAYOUT;
  }

  const storedColumns =
    parsedValue[BOARD_LAYOUT_STORAGE_FIELD.COLUMNS];
  const storedOrder =
    parsedValue[BOARD_LAYOUT_STORAGE_FIELD.ORDER];

  return {
    columns: isBoardLayoutColumns(storedColumns)
      ? storedColumns
      : DEFAULT_BOARD_LAYOUT.columns,
    order: Array.isArray(storedOrder)
      ? storedOrder.filter(
          (id): id is string => typeof id === TYPE_OF.STRING
        )
      : DEFAULT_BOARD_LAYOUT.order,
  };
};

export const readStoredBoardLayout =
  (): BoardLayoutPreference => {
    if (typeof window === TYPE_OF.UNDEFINED) {
      return DEFAULT_BOARD_LAYOUT;
    }

    try {
      const storedValue = window.localStorage.getItem(
        BOARD_LAYOUT_STORAGE_KEY
      );
      return storedValue
        ? parseBoardLayout(storedValue)
        : DEFAULT_BOARD_LAYOUT;
    } catch {
      return DEFAULT_BOARD_LAYOUT;
    }
  };
