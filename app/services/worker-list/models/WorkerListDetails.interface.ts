import type { WorkerListAreaRow } from "./WorkerListAreaRow.type";
import type { WorkerListMarkRow } from "./WorkerListMarkRow.type";

export interface WorkerListDetails {
  areas: readonly WorkerListAreaRow[];
  marks: readonly WorkerListMarkRow[];
}
