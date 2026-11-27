import type { CARD_GRID_SIZE } from "../constants/CardGrid.constants";

export type CardGridSize =
  (typeof CARD_GRID_SIZE)[keyof typeof CARD_GRID_SIZE];
