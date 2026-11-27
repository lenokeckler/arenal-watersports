import type { BoardLayoutColumns } from "@/app/constants";
import type {
  BoardLayoutCard,
  NullableRef,
} from "@/app/types";
import type { BoardLayoutMoveHandler } from "./BoardLayoutMoveHandler.type";

export interface BoardLayoutControlsViewModel {
  cards: BoardLayoutCard[];
  columns: NullableRef<BoardLayoutColumns>;
  handleColumnsChange: (
    columns: BoardLayoutColumns
  ) => void;
  handleMove: BoardLayoutMoveHandler;
}
