import type { UnitListItem } from "./UnitListItem.interface";

export interface UnitListPage {
  units: UnitListItem[];
  pageCount: number;
}
