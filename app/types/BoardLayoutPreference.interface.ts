import type { BoardLayoutColumns } from "@/app/constants";
import type { NullableRef } from "./Nullable";

export interface BoardLayoutPreference {
  columns: NullableRef<BoardLayoutColumns>;
  order: string[];
}
