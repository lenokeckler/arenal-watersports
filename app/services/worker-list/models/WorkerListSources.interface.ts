import type { WorkerListAreaRow } from "./WorkerListAreaRow.type";
import type { WorkerListMarkRow } from "./WorkerListMarkRow.type";
import type { WorkerListWorkerRow } from "./WorkerListWorkerRow.type";

export interface WorkerListSources {
  areas: readonly WorkerListAreaRow[];
  asOf: string;
  marks: readonly WorkerListMarkRow[];
  workers: readonly WorkerListWorkerRow[];
}
