import {
  PAGINATION,
  STRING,
  WORK_AREA_LABEL,
  WORKER_LIST_STATUS,
} from "@/app/constants";
import type { WorkerListRow } from "@/app/services/worker-list/models/WorkerListRow.interface";
import { WORKER_LIST_DATE_FORMAT } from "../constants/WorkerListDateFormat.constants";
import {
  WORKER_LIST_COPY,
  WORKER_LIST_MARK_LABEL,
  WORKER_LIST_ROLE_LABEL,
  WORKER_LIST_STATUS_LABEL,
} from "../constants/WorkerListCopy.constants";
import type { WorkerListDisplayRow } from "../models/WorkerListDisplayRow.interface";

const expiryDateFormatter = new Intl.DateTimeFormat(
  WORKER_LIST_DATE_FORMAT.LOCALE,
  WORKER_LIST_DATE_FORMAT.OPTIONS
);

const formatExpiryDate = (expiresAt: string): string =>
  expiryDateFormatter.format(new Date(expiresAt));

const resolveExpiryDate = (
  expiresAt: WorkerListRow["expiresAt"]
): string =>
  expiresAt
    ? formatExpiryDate(expiresAt)
    : WORKER_LIST_COPY.NO_EXPIRY;

const resolveStatus = (worker: WorkerListRow): string => {
  if (!worker.isExternalGuide) {
    return WORKER_LIST_STATUS_LABEL[worker.accountStatus];
  }

  const guideStatus =
    worker.accountStatus === WORKER_LIST_STATUS.ACTIVE
      ? WORKER_LIST_COPY.TEMPORARY_GUIDE_ACTIVE
      : WORKER_LIST_COPY.TEMPORARY_GUIDE_INACTIVE;

  return [
    WORKER_LIST_COPY.EXTERNAL_GUIDE,
    guideStatus,
  ].join(
    `${STRING.SPACE}${STRING.MIDDLE_DOT}${STRING.SPACE}`
  );
};

const joinValues = (values: readonly string[]): string =>
  values.length > PAGINATION.ZERO_RESULTS
    ? values.join(STRING.COMMA_SPACE)
    : WORKER_LIST_COPY.EMPTY_VALUE;

export const buildWorkerListDisplayRows = (
  workers: readonly WorkerListRow[]
): WorkerListDisplayRow[] =>
  workers.map((worker) => ({
    additionalAreas: joinValues(
      worker.additionalAreas.map(
        (area) => WORK_AREA_LABEL[area]
      )
    ),
    baseRole: WORKER_LIST_ROLE_LABEL[worker.baseRole],
    expiresAt: resolveExpiryDate(worker.expiresAt),
    fullName: worker.fullName,
    id: worker.id,
    marks: joinValues(
      worker.marks.map(
        (mark) => WORKER_LIST_MARK_LABEL[mark]
      )
    ),
    status: resolveStatus(worker),
    username: worker.username,
  }));
