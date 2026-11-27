import type { BoardUnitFilter } from "@/app/constants";
import type { BoardCard } from "./BoardCard.interface";

export interface EquipmentBoardLayoutContentProps {
  cards: BoardCard[];
  filter: BoardUnitFilter;
}
