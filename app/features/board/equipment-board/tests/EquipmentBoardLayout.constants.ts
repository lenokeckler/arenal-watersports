import type { BoardCategoryRow } from "@/app/services/board";
import { buildBoardCards } from "../utils/buildBoardCards";
import { mapBoardCategoryRow } from "../utils/mapBoardCategoryRow";
import {
  BOARD_ROWS_WITH_GROUP,
  PADDLE_BOARD_ROW,
} from "./EquipmentBoard.constants";

export const LAYOUT_BOARD_ROWS: BoardCategoryRow[] = [
  ...BOARD_ROWS_WITH_GROUP,
  PADDLE_BOARD_ROW,
];

export const LAYOUT_CARDS = buildBoardCards(
  LAYOUT_BOARD_ROWS.map(mapBoardCategoryRow)
);

export const LAYOUT_CARD_ID_BY_LABEL: Record<
  string,
  string
> = Object.fromEntries(
  LAYOUT_CARDS.map((card) => [card.label, card.id])
);

export const LAYOUT_LABELS = {
  JET_SKI: "Jet ski",
  KAYAK: "Kayak",
  PADDLE_BOARD: "Paddle board",
} as const;

export const REMOVED_CATEGORY_ID = "removed-category";
