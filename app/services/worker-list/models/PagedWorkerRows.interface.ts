import type { WorkerListWorkerRow } from "./WorkerListWorkerRow.type";

export interface PagedWorkerRows {
  pageCount: number;
  pageIndex: number;
  rows: WorkerListWorkerRow[];
  totalCount: number;
}
