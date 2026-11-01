import { buildBoardCards } from "../utils/buildBoardCards";
import { createBoardCategory } from "./createBoardCategory";
import { createKayakDouble } from "./createKayakCategories";
import { BOARD_GROUP_NAME } from "./EquipmentBoardUtils.constants";

export const EDGE_CATEGORY_NAME = {
  DUPLICATE: "Kayak repetido",
  LONG: "Categoría de equipo reservable con un nombre extraordinariamente largo para un teléfono de trescientos veinte píxeles",
  OVERBOOKED: "Sobrevendido",
  SPARE: "Kayak repuesto",
  SPARE_GROUP_LEADER: "Kayak sin stock",
} as const;

export const EDGE_BAR_WIDTHS = {
  CLAMPED: "100",
  EMPTY: "0",
  QUARTER: "25",
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

export const CARDS_WITH_OVERBOOKED_AND_EMPTY =
  buildBoardCards([
    createBoardCategory({
      freeCount: 0,
      id: "overbooked",
      inUseCount: 9,
      name: EDGE_CATEGORY_NAME.OVERBOOKED,
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
