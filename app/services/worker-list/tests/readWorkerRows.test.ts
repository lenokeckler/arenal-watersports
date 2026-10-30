import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { SUPABASE_WORK_AREA } from "@/app/constants";
import { WORKER_LIST_STATUS } from "@/app/constants/administration/WorkerList.constants";
import { SUPABASE_WORKER_STATUS } from "@/app/constants/supabase/SupabaseWorkerStatus.constants";
import { WORKER_LIST_QUERY } from "@/app/constants/supabase/WorkerListQuery.constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import type { WorkerListSearch } from "../models/WorkerListSearch.interface";
import { buildWorkerQuery } from "../readWorkerRows";

const AS_OF = "2026-10-29T18:00:00.000Z";
const ROLE_FILTER: WorkerListSearch = {
  baseRole: SUPABASE_WORK_AREA.OPERATIONS,
  pageIndex: 0,
  status: undefined,
};
const ACTIVE_FILTER: WorkerListSearch = {
  baseRole: undefined,
  pageIndex: 0,
  status: WORKER_LIST_STATUS.ACTIVE,
};
const INACTIVE_FILTER: WorkerListSearch = {
  baseRole: undefined,
  pageIndex: 0,
  status: WORKER_LIST_STATUS.INACTIVE,
};

const eq = vi.fn();
const is = vi.fn();
const or = vi.fn();
const order = vi.fn();
const select = vi.fn();
const query = { eq, is, or, order, select };
const supabase = {
  from: vi.fn(() => query),
} as unknown as ServerSupabaseClient;

describe("buildWorkerQuery", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    eq.mockReturnValue(query);
    is.mockReturnValue(query);
    or.mockReturnValue(query);
    order.mockReturnValue(query);
    select.mockReturnValue(query);
  });

  it("filters by the selected base role", () => {
    buildWorkerQuery(supabase, ROLE_FILTER, AS_OF);

    expect(eq).toHaveBeenCalledWith(
      WORKER_LIST_QUERY.COLUMN.BASE_ROLE,
      SUPABASE_WORK_AREA.OPERATIONS
    );
  });

  it("filters active accounts against one captured instant", () => {
    buildWorkerQuery(supabase, ACTIVE_FILTER, AS_OF);

    expect(eq).toHaveBeenCalledWith(
      WORKER_LIST_QUERY.COLUMN.STATUS,
      SUPABASE_WORKER_STATUS.ACTIVE
    );
    expect(is).toHaveBeenCalledWith(
      WORKER_LIST_QUERY.COLUMN.DELETED_AT,
      null
    );
    expect(or).toHaveBeenCalledWith(
      `${WORKER_LIST_QUERY.COLUMN.EXPIRES_AT}.is.null,${WORKER_LIST_QUERY.COLUMN.EXPIRES_AT}.gt.${AS_OF}`
    );
  });

  it("includes blocked, deleted, or expired accounts as inactive", () => {
    buildWorkerQuery(supabase, INACTIVE_FILTER, AS_OF);

    expect(or).toHaveBeenCalledWith(
      `${WORKER_LIST_QUERY.COLUMN.STATUS}.neq.${SUPABASE_WORKER_STATUS.ACTIVE},${WORKER_LIST_QUERY.COLUMN.DELETED_AT}.not.is.null,${WORKER_LIST_QUERY.COLUMN.EXPIRES_AT}.lte.${AS_OF}`
    );
  });
});
