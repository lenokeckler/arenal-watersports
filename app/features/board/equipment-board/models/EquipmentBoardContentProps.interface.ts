import type {
  BoardLayoutColumns,
  BoardUnitFilter,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";
import type { BoardCard } from "./BoardCard.interface";
import type { BoardCardDragViewModel } from "./BoardCardDragViewModel.interface";

export interface EquipmentBoardContentProps {
  cards: BoardCard[];
  columns?: NullableRef<BoardLayoutColumns>;
  drag?: BoardCardDragViewModel;
  filter: BoardUnitFilter;
}
