import type { NullableRef } from "@/app/types";
import type { WorkerListWorkerRow } from "./WorkerListWorkerRow.type";

export interface WorkerListRowsResult {
  count: NullableRef<number>;
  rows: WorkerListWorkerRow[];
}
