import type { RefObject } from "react";
import type { NullableRef } from "@/app/types";
import type { BoardCardDragItemProps } from "./BoardCardDragItemProps.interface";

export interface BoardCardDragViewModel {
  draggedId: NullableRef<string>;
  getItemDragProps: (id: string) => BoardCardDragItemProps;
  gridRef: RefObject<NullableRef<HTMLDivElement>>;
}
