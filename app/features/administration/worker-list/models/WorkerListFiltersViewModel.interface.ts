import type { WorkerListSearch } from "@/app/services/worker-list/models/WorkerListSearch.interface";
import type { WorkerListFiltersFieldChange } from "./WorkerListFiltersFieldChange.interface";

export interface WorkerListFiltersViewModel {
  handleChange: (
    event: WorkerListFiltersFieldChange
  ) => void;
  values: WorkerListSearch;
}
