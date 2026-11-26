import type { BoardUnitFilter } from "@/app/constants";
import type { BoardCard } from "./BoardCard.interface";

export interface EquipmentBoardContentProps {
  cards: BoardCard[];
  filter: BoardUnitFilter;
}
