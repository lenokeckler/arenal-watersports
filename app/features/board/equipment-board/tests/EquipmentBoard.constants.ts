import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import type { BoardCategoryRow } from "@/app/services/board";
import { buildBoardCards } from "../utils/buildBoardCards";
import { createBoardCategory } from "./createBoardCategory";
import {
  createKayakDouble,
  createKayakIndividual,
} from "./createKayakCategories";
import {
  BOARD_CATEGORY_NAME,
  BOARD_GROUP_NAME,
} from "./EquipmentBoardUtils.constants";

export const DEFAULT_BOARD_ROW: BoardCategoryRow = {
  category_id: "jet-ski",
  category_name: "Jet ski",
  free_count: 2,
  group_name: null,
  in_use_count: 1,
  total_count: 4,
};

export const KAYAK_DOUBLE_ROW: BoardCategoryRow = {
  category_id: "kayak-double",
  category_name: BOARD_CATEGORY_NAME.KAYAK_DOUBLE,
  free_count: 2,
  group_name: BOARD_GROUP_NAME.KAYAK,
  in_use_count: 1,
  total_count: 4,
};

export const KAYAK_INDIVIDUAL_ROW: BoardCategoryRow = {
  category_id: "kayak-individual",
  category_name: BOARD_CATEGORY_NAME.KAYAK_INDIVIDUAL,
  free_count: 3,
  group_name: BOARD_GROUP_NAME.KAYAK_LOWER,
  in_use_count: 2,
  total_count: 6,
};

export const PADDLE_BOARD_ROW: BoardCategoryRow = {
  category_id: "paddle-board",
  category_name: BOARD_CATEGORY_NAME.PADDLE_BOARD,
  free_count: 4,
  group_name: BOARD_GROUP_NAME.PADDLE,
  in_use_count: 0,
  total_count: 4,
};

export const BOARD_ROWS_WITH_GROUP: BoardCategoryRow[] = [
  DEFAULT_BOARD_ROW,
  KAYAK_DOUBLE_ROW,
  KAYAK_INDIVIDUAL_ROW,
];

export const BOARD_CARDS = buildBoardCards([
  createBoardCategory(),
  createKayakDouble(),
  createKayakIndividual(),
]);

export const JET_SKI_LABEL = "Jet ski";

export const KAYAK_LABEL = BOARD_GROUP_NAME.KAYAK;

export const KAYAK_SUMMED = {
  FREE: 5,
  IN_USE: 3,
  TOTAL: 10,
} as const;

export const CARD_COUNT_WITH_GROUP = 2;

export const EXPECTED_BAR_WIDTHS = {
  JET_SKI: "50",
  KAYAK: "50",
} as const;

export const EN_USO_TEXT = "en uso";

export const IMAGE_ELEMENT_SELECTOR = "img";
export const IMAGE_SOURCE_ATTRIBUTE = "src";
export const JET_SKI_IMAGE_FILE = "jet-ski.webp";
export const KAYAK_IMAGE_FILE = "kayak-doble.webp";

export const SAILING_ICON_TEXT = MATERIAL_ICON_NAME.SAILING;

export const BAR_FILL_SELECTOR = "rect";
export const BAR_WIDTH_ATTRIBUTE = "width";
export const BAR_SELECTOR = "svg";
export const ARIA_HIDDEN_ATTRIBUTE = "aria-hidden";
export const ARIA_HIDDEN_TRUE = "true";
export const ARIA_BUSY_ATTRIBUTE = "aria-busy";
export const ARIA_BUSY_TRUE = "true";

export const HEADING_LEVEL_ONE = 1;
export const HEADING_LEVEL_TWO = 2;

export const READ_FAILURE_MESSAGE = "read failed";

export const FREE_LABEL_COUNTS = {
  MANY: 5,
  ONE: 1,
  ZERO: 0,
} as const;

export const FREE_LABEL_TOTAL = 4;

export const FREE_LABEL_CARD_NAMES = {
  NONE: "Tabla agotada",
  SINGLE: "Tabla única",
} as const;

export const SINGLE_FREE_ROW: BoardCategoryRow = {
  ...DEFAULT_BOARD_ROW,
  category_id: "single-free",
  category_name: FREE_LABEL_CARD_NAMES.SINGLE,
  free_count: FREE_LABEL_COUNTS.ONE,
  total_count: FREE_LABEL_TOTAL,
};

export const NO_FREE_ROW: BoardCategoryRow = {
  ...DEFAULT_BOARD_ROW,
  category_id: "no-free",
  category_name: FREE_LABEL_CARD_NAMES.NONE,
  free_count: FREE_LABEL_COUNTS.ZERO,
  total_count: FREE_LABEL_TOTAL,
};

export const CARD_NOT_FOUND_MESSAGE =
  "Board card not found for label:";
