import type { BoardUnitFilter } from "@/app/constants";

export interface CategoryUnitsPaginationProps {
  basePath: string;
  currentPage: number;
  filter: BoardUnitFilter;
  pageCount: number;
}
