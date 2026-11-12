import type { WorkerListPage } from "@/app/services/worker-list/models/WorkerListPage.interface";
import type { WorkerListSearch } from "@/app/services/worker-list/models/WorkerListSearch.interface";
import type { WorkerListDisplayRow } from "./WorkerListDisplayRow.interface";

export interface WorkerListViewProps {
  page: WorkerListPage;
  rows: readonly WorkerListDisplayRow[];
  search: WorkerListSearch;
}
