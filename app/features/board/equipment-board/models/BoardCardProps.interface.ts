import type { BoardUnitFilter } from "@/app/constants";
import type { BoardCard } from "./BoardCard.interface";

export interface BoardCardProps {
  card: BoardCard;
  filter: BoardUnitFilter;
  isPriorityImage: boolean;
}
