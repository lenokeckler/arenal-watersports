import { describe, expect, it } from "vitest";
import {
  PAGINATION,
  SUPABASE_WORKER_MARK,
  WORKER_LIST_STATUS,
} from "@/app/constants";
import {
  WORKER_LIST_COPY,
  WORKER_LIST_MARK_LABEL,
} from "../constants/WorkerListCopy.constants";
import { buildWorkerListDisplayRows } from "../utils/buildWorkerListDisplayRows";
import {
  WORKER_LIST_TEST_ACTIVE_GUIDE_STATUS,
  WORKER_LIST_TEST_EXPIRY_TIMESTAMP,
  WORKER_LIST_TEST_FORMATTED_EXPIRY,
  WORKER_LIST_TEST_INACTIVE_GUIDE_STATUS,
  WORKER_LIST_TEST_ROW,
} from "./WorkerList.constants";

describe("buildWorkerListDisplayRows", () => {
  it("formats worker fields and temporary guide status", () => {
    const rows = buildWorkerListDisplayRows([
      WORKER_LIST_TEST_ROW,
    ]);

    expect(rows[PAGINATION.DEFAULT_PAGE]).toMatchObject({
      expiresAt: WORKER_LIST_TEST_FORMATTED_EXPIRY,
      marks:
        WORKER_LIST_MARK_LABEL[SUPABASE_WORKER_MARK.GUIDE],
      status: WORKER_LIST_TEST_ACTIVE_GUIDE_STATUS,
    });
  });

  it("marks an inactive external guide as disabled", () => {
    const rows = buildWorkerListDisplayRows([
      {
        ...WORKER_LIST_TEST_ROW,
        accountStatus: WORKER_LIST_STATUS.INACTIVE,
        expiresAt: WORKER_LIST_TEST_EXPIRY_TIMESTAMP,
      },
    ]);

    expect(rows[PAGINATION.DEFAULT_PAGE]?.status).toBe(
      WORKER_LIST_TEST_INACTIVE_GUIDE_STATUS
    );
  });

  it("labels permanent accounts and empty areas or marks", () => {
    const rows = buildWorkerListDisplayRows([
      {
        ...WORKER_LIST_TEST_ROW,
        additionalAreas: [],
        expiresAt: null,
        isExternalGuide: false,
        marks: [],
      },
    ]);

    expect(rows[PAGINATION.DEFAULT_PAGE]).toMatchObject({
      additionalAreas: WORKER_LIST_COPY.EMPTY_VALUE,
      expiresAt: WORKER_LIST_COPY.NO_EXPIRY,
      marks: WORKER_LIST_COPY.EMPTY_VALUE,
      status: WORKER_LIST_COPY.ACTIVE,
    });
  });
});
