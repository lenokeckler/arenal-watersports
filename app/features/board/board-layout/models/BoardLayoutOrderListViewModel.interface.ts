import type { RefObject } from "react";
import type { NullableRef } from "@/app/types";
import type { BoardLayoutHandleProps } from "./BoardLayoutHandleProps.interface";

export interface BoardLayoutOrderListViewModel {
  draggedId: NullableRef<string>;
  getHandleProps: (
    id: string,
    index: number
  ) => BoardLayoutHandleProps;
  listRef: RefObject<NullableRef<HTMLDivElement>>;
}
