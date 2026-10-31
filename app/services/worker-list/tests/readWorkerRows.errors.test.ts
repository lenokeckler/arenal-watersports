import { describe, expect, it, vi } from "vitest";
import { PAGINATION } from "@/app/constants";
import { WORKER_LIST_QUERY } from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import type { WorkerListSearch } from "../models/WorkerListSearch.interface";
import { readWorkerRows } from "../readWorkerRows";

const AS_OF = "2026-10-29T18:00:00.000Z";
const SEARCH: WorkerListSearch = {
  baseRole: undefined,
  pageIndex: PAGINATION.DEFAULT_PAGE,
  status: undefined,
};
const QUERY_ERROR = {
  code: "WORKER_QUERY_FAILED",
  details: "",
  hint: "",
  message: "Worker query failed",
};

describe("readWorkerRows", () => {
  it("propagates a failed worker query as a Supabase query error", async () => {
    const range = vi.fn().mockResolvedValue({
      count: null,
      data: null,
      error: QUERY_ERROR,
    });
    const query = {
      order: vi.fn(),
      range,
      select: vi.fn(),
    };
    query.order.mockReturnValue(query);
    query.select.mockReturnValue(query);
    const supabase = {
      from: vi.fn().mockReturnValue(query),
    } as unknown as ServerSupabaseClient;

    await expect(
      readWorkerRows(
        supabase,
        SEARCH,
        PAGINATION.DEFAULT_PAGE,
        AS_OF
      )
    ).rejects.toBeInstanceOf(SupabaseQueryError);

    expect(supabase.from).toHaveBeenCalledWith(
      WORKER_LIST_QUERY.TABLES.WORKERS
    );
  });
});
