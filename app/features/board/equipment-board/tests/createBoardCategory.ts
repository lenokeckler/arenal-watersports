import type { BoardCategory } from "../models/BoardCategory.interface";
import { DEFAULT_BOARD_CATEGORY } from "./EquipmentBoardUtils.constants";

export const createBoardCategory = (
  overrides: Partial<BoardCategory> = {}
): BoardCategory => ({
  ...DEFAULT_BOARD_CATEGORY,
  ...overrides,
});
