import type { Extra } from "./Extra.interface";

export interface ExtraListPage {
  extras: Extra[];
  pageCount: number;
  totalCount: number;
}
