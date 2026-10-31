import type { WorkerListRow } from "../models/WorkerListRow.interface";
import type { WorkerListSources } from "../models/WorkerListSources.interface";
import { resolveWorkerListStatus } from "./resolveWorkerListStatus";

const groupByWorkerId = <
  TRow extends { worker_id: string },
>(
  rows: readonly TRow[]
): Map<string, TRow[]> => {
  const groupedRows = new Map<string, TRow[]>();

  for (const row of rows) {
    const workerRows = groupedRows.get(row.worker_id) ?? [];
    workerRows.push(row);
    groupedRows.set(row.worker_id, workerRows);
  }

  return groupedRows;
};

export const mapWorkerListRows = ({
  areas,
  asOf,
  marks,
  workers,
}: WorkerListSources): WorkerListRow[] => {
  const areasByWorkerId = groupByWorkerId(areas);
  const marksByWorkerId = groupByWorkerId(marks);

  return workers.map((worker) => ({
    accountStatus: resolveWorkerListStatus(worker, asOf),
    additionalAreas: (areasByWorkerId.get(worker.id) ?? [])
      .map(({ area }) => area)
      .filter((area) => area !== worker.base_role),
    baseRole: worker.base_role,
    expiresAt: worker.expires_at,
    fullName: worker.full_name,
    id: worker.id,
    isExternalGuide: worker.is_external_guide,
    marks: (marksByWorkerId.get(worker.id) ?? []).map(
      ({ mark }) => mark
    ),
    username: worker.username,
  }));
};
