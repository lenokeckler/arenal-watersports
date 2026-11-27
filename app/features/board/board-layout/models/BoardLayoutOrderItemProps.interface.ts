import type { BoardLayoutCard } from "@/app/types";
import type { BoardLayoutHandleProps } from "./BoardLayoutHandleProps.interface";

export interface BoardLayoutOrderItemProps {
  card: BoardLayoutCard;
  handleProps: BoardLayoutHandleProps;
  isDragged: boolean;
}
