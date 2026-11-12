import type { WorkerListSearch } from "@/app/services/worker-list/models/WorkerListSearch.interface";

export interface WorkerListPaginationProps {
  pageCount: number;
  pageIndex: number;
  search: WorkerListSearch;
}
