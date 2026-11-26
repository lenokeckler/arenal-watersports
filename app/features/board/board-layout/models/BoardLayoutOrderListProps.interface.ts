import type { BoardLayoutCard } from "@/app/types";
import type { BoardLayoutMoveHandler } from "./BoardLayoutMoveHandler.type";

export interface BoardLayoutOrderListProps {
  cards: BoardLayoutCard[];
  onMove: BoardLayoutMoveHandler;
}
