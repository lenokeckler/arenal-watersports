import type { BoardLayoutColumns } from "@/app/constants";
import type { NullableRef } from "@/app/types";

export interface BoardLayoutColumnsPickerProps {
  columns: NullableRef<BoardLayoutColumns>;
  onChange: (columns: BoardLayoutColumns) => void;
}
