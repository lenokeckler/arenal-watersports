import type { NullableUndefined } from "@/app/types";
import type { Extra } from "./Extra.interface";

export interface ExtraListViewProps {
  currentPage: number;
  extras: Extra[];
  fetchError?: NullableUndefined<Error>;
  fetchFailed: boolean;
  pageCount: number;
}
