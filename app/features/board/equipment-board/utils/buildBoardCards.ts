import type { BoardCard } from "../models/BoardCard.interface";
import type { BoardCategory } from "../models/BoardCategory.interface";
import { buildBoardCard } from "./buildBoardCard";
import { compareBoardCards } from "./compareBoardCards";
import { groupBoardCategories } from "./groupBoardCategories";

export const buildBoardCards = (
  categories: BoardCategory[]
): BoardCard[] =>
  groupBoardCategories(categories)
    .map(buildBoardCard)
    .sort(compareBoardCards);
