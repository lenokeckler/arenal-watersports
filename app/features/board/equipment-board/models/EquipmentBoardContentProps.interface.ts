import type { BoardLayoutColumns } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import type { BoardCard } from "./BoardCard.interface";

export interface EquipmentBoardContentProps {
  cards: BoardCard[];
  columns?: NullableRef<BoardLayoutColumns>;
}
