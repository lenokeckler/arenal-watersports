import {
  PAGINATION,
  STRING,
  SUPABASE_WORK_AREA,
  SUPABASE_WORKER_MARK,
  WORKER_LIST_STATUS,
  WORK_AREA_LABEL,
} from "@/app/constants";
import type { WorkerListPage } from "@/app/services/worker-list/models/WorkerListPage.interface";
import type { WorkerListRow } from "@/app/services/worker-list/models/WorkerListRow.interface";
import type { WorkerListSearch } from "@/app/services/worker-list/models/WorkerListSearch.interface";
import type { WorkerListDisplayRow } from "../models/WorkerListDisplayRow.interface";
import {
  WORKER_LIST_COPY,
  WORKER_LIST_MARK_LABEL,
} from "../constants/WorkerListCopy.constants";

export const WORKER_LIST_TEST_ACTIVE_GUIDE_STATUS = [
  WORKER_LIST_COPY.EXTERNAL_GUIDE,
  WORKER_LIST_COPY.TEMPORARY_GUIDE_ACTIVE,
].join(
  `${STRING.SPACE}${STRING.MIDDLE_DOT}${STRING.SPACE}`
);
export const WORKER_LIST_TEST_INACTIVE_GUIDE_STATUS = [
  WORKER_LIST_COPY.EXTERNAL_GUIDE,
  WORKER_LIST_COPY.TEMPORARY_GUIDE_INACTIVE,
].join(
  `${STRING.SPACE}${STRING.MIDDLE_DOT}${STRING.SPACE}`
);

export const WORKER_LIST_TEST_EXPIRY_TIMESTAMP =
  "2026-11-01T06:00:00.000Z";
export const WORKER_LIST_TEST_FORMATTED_EXPIRY =
  "1 de noviembre de 2026";
export const WORKER_LIST_REDIRECT_SIGNAL =
  "worker-list-home-redirect";
export const WORKER_LIST_TEST_SEARCH: WorkerListSearch = {
  baseRole: SUPABASE_WORK_AREA.OPERATIONS,
  pageIndex: PAGINATION.DEFAULT_PAGE,
  status: WORKER_LIST_STATUS.ACTIVE,
};

export const WORKER_LIST_TEST_UNFILTERED_SEARCH: WorkerListSearch =
  {
    baseRole: undefined,
    pageIndex: PAGINATION.DEFAULT_PAGE,
    status: undefined,
  };

export const WORKER_LIST_TEST_ROW: WorkerListRow = {
  accountStatus: WORKER_LIST_STATUS.ACTIVE,
  additionalAreas: [SUPABASE_WORK_AREA.RESERVATIONS],
  baseRole: SUPABASE_WORK_AREA.OPERATIONS,
  expiresAt: WORKER_LIST_TEST_EXPIRY_TIMESTAMP,
  fullName: "Guía de prueba",
  id: "11111111-1111-1111-1111-111111111111",
  isExternalGuide: true,
  marks: [SUPABASE_WORKER_MARK.GUIDE],
  username: "guia.prueba",
};

export const WORKER_LIST_TEST_PAGE: WorkerListPage = {
  items: [WORKER_LIST_TEST_ROW],
  pageCount: PAGINATION.ONE_PAGE + PAGINATION.ONE_PAGE,
  pageIndex: PAGINATION.DEFAULT_PAGE,
  totalCount: PAGINATION.ONE_PAGE,
};

export const WORKER_LIST_TEST_DISPLAY_ROW: WorkerListDisplayRow =
  {
    additionalAreas:
      WORK_AREA_LABEL[SUPABASE_WORK_AREA.RESERVATIONS],
    baseRole:
      WORK_AREA_LABEL[SUPABASE_WORK_AREA.OPERATIONS],
    expiresAt: WORKER_LIST_TEST_FORMATTED_EXPIRY,
    fullName: WORKER_LIST_TEST_ROW.fullName,
    id: WORKER_LIST_TEST_ROW.id,
    marks:
      WORKER_LIST_MARK_LABEL[SUPABASE_WORKER_MARK.GUIDE],
    status: WORKER_LIST_TEST_ACTIVE_GUIDE_STATUS,
    username: WORKER_LIST_TEST_ROW.username,
  };
