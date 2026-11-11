import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  SUPABASE_WORK_AREA,
  SUPABASE_WORKER_STATUS,
  WORKER_LIST_QUERY,
  WORKER_LIST_STATUS,
} from "@/app/constants";
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
const ROLE_AND_INACTIVE_FILTER: WorkerListSearch = {
  baseRole: SUPABASE_WORK_AREA.OPERATIONS,
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
      `${WORKER_LIST_QUERY.COLUMN.EXPIRES_AT}.${WORKER_LIST_QUERY.OPERATOR.IS_NULL},${WORKER_LIST_QUERY.COLUMN.EXPIRES_AT}.${WORKER_LIST_QUERY.OPERATOR.EXPIRES_AT_AFTER}${AS_OF}`
    );
  });

  it("includes blocked, deleted, or expired accounts as inactive", () => {
    buildWorkerQuery(supabase, INACTIVE_FILTER, AS_OF);

    expect(or).toHaveBeenCalledWith(
      `${WORKER_LIST_QUERY.COLUMN.STATUS}.${WORKER_LIST_QUERY.OPERATOR.NOT_EQUAL}${SUPABASE_WORKER_STATUS.ACTIVE},${WORKER_LIST_QUERY.COLUMN.DELETED_AT}.${WORKER_LIST_QUERY.OPERATOR.IS_NOT_NULL},${WORKER_LIST_QUERY.COLUMN.EXPIRES_AT}.${WORKER_LIST_QUERY.OPERATOR.EXPIRES_AT_BEFORE_OR_ON}${AS_OF}`
    );
  });

  it("keeps role and inactive filters on the returned query builder", () => {
    const filteredQueryOr = vi.fn();
    eq.mockReturnValue({ or: filteredQueryOr });

    buildWorkerQuery(
      supabase,
      ROLE_AND_INACTIVE_FILTER,
      AS_OF
    );

    expect(eq).toHaveBeenCalledWith(
      WORKER_LIST_QUERY.COLUMN.BASE_ROLE,
      SUPABASE_WORK_AREA.OPERATIONS
    );
    expect(filteredQueryOr).toHaveBeenCalledWith(
      `${WORKER_LIST_QUERY.COLUMN.STATUS}.${WORKER_LIST_QUERY.OPERATOR.NOT_EQUAL}${SUPABASE_WORKER_STATUS.ACTIVE},${WORKER_LIST_QUERY.COLUMN.DELETED_AT}.${WORKER_LIST_QUERY.OPERATOR.IS_NOT_NULL},${WORKER_LIST_QUERY.COLUMN.EXPIRES_AT}.${WORKER_LIST_QUERY.OPERATOR.EXPIRES_AT_BEFORE_OR_ON}${AS_OF}`
    );
    expect(or).not.toHaveBeenCalled();
  });
});
