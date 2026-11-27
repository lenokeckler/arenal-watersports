import type { BoardUnitFilter } from "@/app/constants";

export interface CategoryUnitsContentRequest {
  categoryId: string;
  filter: BoardUnitFilter;
  page: number;
  pageCount: number;
}
