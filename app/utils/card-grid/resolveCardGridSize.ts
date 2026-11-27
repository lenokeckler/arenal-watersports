import {
  CARD_GRID_SIZE,
  CARD_GRID_SIZE_LIMITS,
} from "./constants/CardGrid.constants";
import type { CardGridSize } from "./models/CardGridSize.type";

export const resolveCardGridSize = (
  itemCount: number,
  isPaginated: boolean
): CardGridSize => {
  if (
    isPaginated ||
    itemCount > CARD_GRID_SIZE_LIMITS.TRIO
  ) {
    return CARD_GRID_SIZE.STANDARD;
  }

  return itemCount > CARD_GRID_SIZE_LIMITS.PAIR
    ? CARD_GRID_SIZE.TRIO
    : CARD_GRID_SIZE.PAIR;
};
