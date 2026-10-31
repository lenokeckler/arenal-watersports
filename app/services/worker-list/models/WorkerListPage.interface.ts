import type { WorkerListRow } from "./WorkerListRow.interface";

export interface WorkerListPage {
  items: readonly WorkerListRow[];
  pageCount: number;
  pageIndex: number;
  totalCount: number;
}
