import { buildBoardCards } from "../utils/buildBoardCards";
import { createBoardCategory } from "./createBoardCategory";
import { createKayakDouble } from "./createKayakCategories";
import { BOARD_GROUP_NAME } from "./EquipmentBoardUtils.constants";

export const EDGE_CATEGORY_NAME = {
  ALL_FREE: "Todo libre",
  DUPLICATE: "Kayak repetido",
  LONG: "Categoría de equipo reservable con un nombre extraordinariamente largo para un teléfono de trescientos veinte píxeles",
  NONE_FREE: "Sin libres",
  SPARE: "Kayak repuesto",
  SPARE_GROUP_LEADER: "Kayak sin stock",
  UNKNOWN: "Categoría sin foto",
} as const;

export const EDGE_BAR_WIDTHS = {
  EMPTY: "0",
  FULL: "100",
  HALF: "50",
} as const;

export const SINGULAR_FREE_PATTERN = /1 libre(?!s)/;
export const ZERO_USAGE_PATTERN = /0 en uso de 0/;

const createSpareKayak = () =>
  createBoardCategory({
    freeCount: 0,
    groupName: BOARD_GROUP_NAME.KAYAK,
    id: "kayak-spare",
    inUseCount: 0,
    name: EDGE_CATEGORY_NAME.SPARE,
    totalCount: 0,
  });

const createDuplicateNamedKayak = (id: string) =>
  createBoardCategory({
    freeCount: 1,
    groupName: BOARD_GROUP_NAME.KAYAK,
    id,
    inUseCount: 0,
    name: EDGE_CATEGORY_NAME.DUPLICATE,
    totalCount: 1,
  });

export const CARDS_WITH_ZERO_TOTAL_MEMBER = buildBoardCards(
  [createKayakDouble(), createSpareKayak()]
);

export const CARDS_WITH_DUPLICATE_NAMES = buildBoardCards([
  createDuplicateNamedKayak("duplicate-a"),
  createDuplicateNamedKayak("duplicate-b"),
]);

export const CARDS_WITH_LONG_NAME = buildBoardCards([
  createBoardCategory({
    id: "long-name",
    name: EDGE_CATEGORY_NAME.LONG,
  }),
]);

export const CARDS_WITH_NONE_FREE_ALL_FREE_AND_EMPTY =
  buildBoardCards([
    createBoardCategory({
      freeCount: 0,
      id: "none-free",
      inUseCount: 4,
      name: EDGE_CATEGORY_NAME.NONE_FREE,
      totalCount: 4,
    }),
    createBoardCategory({
      freeCount: 4,
      id: "all-free",
      inUseCount: 0,
      name: EDGE_CATEGORY_NAME.ALL_FREE,
      totalCount: 4,
    }),
    createBoardCategory({
      freeCount: 0,
      id: "no-stock",
      inUseCount: 0,
      name: EDGE_CATEGORY_NAME.SPARE_GROUP_LEADER,
      totalCount: 0,
    }),
  ]);

export const CARDS_WITH_UNKNOWN_CATEGORY = buildBoardCards([
  createBoardCategory({
    id: "unknown-category",
    name: EDGE_CATEGORY_NAME.UNKNOWN,
  }),
]);
