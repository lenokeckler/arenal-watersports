import type { BoardUnitFilter } from "@/app/constants";
import type { BoardUnitCounts } from "./BoardUnitCounts.interface";

export interface BoardUnitFilterProps {
  basePath: string;
  counts: BoardUnitCounts;
  current: BoardUnitFilter;
}
