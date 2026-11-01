import type { BoardCategory } from "../models/BoardCategory.interface";
import { createBoardCategory } from "./createBoardCategory";
import {
  BOARD_CATEGORY_NAME,
  BOARD_GROUP_NAME,
} from "./EquipmentBoardUtils.constants";

export const createKayakDouble = (): BoardCategory =>
  createBoardCategory({
    freeCount: 2,
    groupName: BOARD_GROUP_NAME.KAYAK,
    id: "kayak-double",
    inUseCount: 1,
    name: BOARD_CATEGORY_NAME.KAYAK_DOUBLE,
    totalCount: 4,
  });

export const createKayakIndividual = (): BoardCategory =>
  createBoardCategory({
    freeCount: 3,
    groupName: BOARD_GROUP_NAME.KAYAK_LOWER,
    id: "kayak-individual",
    inUseCount: 2,
    name: BOARD_CATEGORY_NAME.KAYAK_INDIVIDUAL,
    totalCount: 6,
  });
