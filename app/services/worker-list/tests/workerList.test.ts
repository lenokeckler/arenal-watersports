import { describe, expect, it } from "vitest";
import {
  SUPABASE_WORK_AREA,
  SUPABASE_WORKER_MARK,
} from "@/app/constants";
import { WORKER_LIST_STATUS } from "@/app/constants";
import { SUPABASE_WORKER_STATUS } from "@/app/constants";
import type { WorkerListSources } from "../models/WorkerListSources.interface";
import { mapWorkerListRows } from "../utils/mapWorkerListRows";
import { resolveWorkerListSearch } from "../utils/resolveWorkerListSearch";
import { resolveWorkerListStatus } from "../utils/resolveWorkerListStatus";

const AS_OF = "2026-10-29T18:00:00.000Z";
const WORKER_ID = "11111111-1111-1111-1111-111111111111";
const ACTIVE_WORKER: WorkerListSources["workers"][number] =
  {
    base_role: SUPABASE_WORK_AREA.OPERATIONS,
    deleted_at: null,
    expires_at: null,
    full_name: "Celso Rojas",
    id: WORKER_ID,
    is_external_guide: true,
    status: SUPABASE_WORKER_STATUS.ACTIVE,
    username: "celso",
  };

describe("resolveWorkerListStatus", () => {
  it("treats a timestamp equal to the captured instant as inactive", () => {
    expect(
      resolveWorkerListStatus(
        { ...ACTIVE_WORKER, expires_at: AS_OF },
        AS_OF
      )
    ).toBe(WORKER_LIST_STATUS.INACTIVE);
  });

  it("treats an expiry after the captured instant as active", () => {
    expect(
      resolveWorkerListStatus(
        {
          ...ACTIVE_WORKER,
          expires_at: "2026-10-29T18:00:01.000Z",
        },
        AS_OF
      )
    ).toBe(WORKER_LIST_STATUS.ACTIVE);
  });

  it.each([
    { ...ACTIVE_WORKER, deleted_at: AS_OF },
    {
      ...ACTIVE_WORKER,
      status: SUPABASE_WORKER_STATUS.BLOCKED,
    },
    {
      ...ACTIVE_WORKER,
      expires_at: "2026-10-29T17:59:59.000Z",
    },
  ])(
    "treats deleted, blocked, or expired accounts as inactive",
    (worker) => {
      expect(resolveWorkerListStatus(worker, AS_OF)).toBe(
        WORKER_LIST_STATUS.INACTIVE
      );
    }
  );
});

describe("mapWorkerListRows", () => {
  it("maps marks and extra areas without repeating the base role", () => {
    const rows = mapWorkerListRows({
      asOf: AS_OF,
      workers: [ACTIVE_WORKER],
      areas: [
        {
          area: SUPABASE_WORK_AREA.OPERATIONS,
          worker_id: WORKER_ID,
        },
        {
          area: SUPABASE_WORK_AREA.RESERVATIONS,
          worker_id: WORKER_ID,
        },
      ],
      marks: [
        {
          mark: SUPABASE_WORKER_MARK.GUIDE,
          worker_id: WORKER_ID,
        },
        {
          mark: SUPABASE_WORKER_MARK.GENERAL_MANAGER,
          worker_id: WORKER_ID,
        },
      ],
    });

    expect(rows[0]).toMatchObject({
      accountStatus: WORKER_LIST_STATUS.ACTIVE,
      additionalAreas: [SUPABASE_WORK_AREA.RESERVATIONS],
      isExternalGuide: true,
      marks: [
        SUPABASE_WORKER_MARK.GUIDE,
        SUPABASE_WORKER_MARK.GENERAL_MANAGER,
      ],
    });
  });
});

describe("resolveWorkerListSearch", () => {
  it("accepts supported role and status filters and a zero based page", () => {
    expect(
      resolveWorkerListSearch({
        role: SUPABASE_WORK_AREA.OPERATIONS,
        status: "active",
        page: "2",
      })
    ).toMatchObject({
      baseRole: SUPABASE_WORK_AREA.OPERATIONS,
      pageIndex: 2,
      status: WORKER_LIST_STATUS.ACTIVE,
    });
  });

  it("ignores unsupported or duplicated filter parameters", () => {
    expect(
      resolveWorkerListSearch({
        role: [SUPABASE_WORK_AREA.OPERATIONS],
        status: "unknown",
        page: "-3",
      })
    ).toMatchObject({
      baseRole: undefined,
      pageIndex: 0,
      status: undefined,
    });
  });
});
