import { describe, expect, it, vi } from "vitest";
import { PAGINATION } from "@/app/constants";
import { WORKER_LIST_QUERY } from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import type { WorkerListSearch } from "../models/WorkerListSearch.interface";
import { readWorkerListPageData } from "../readWorkerListPageData";

const AS_OF = "2026-10-29T18:00:00.000Z";
const SEARCH: WorkerListSearch = {
  baseRole: undefined,
  pageIndex: PAGINATION.DEFAULT_PAGE,
  status: undefined,
};

describe("readWorkerListPageData", () => {
  it("returns an empty page without querying worker details", async () => {
    const query = {
      order: vi.fn(),
      range: vi.fn().mockResolvedValue({
        count: PAGINATION.ZERO_RESULTS,
        data: [],
        error: null,
      }),
      select: vi.fn(),
    };
    query.order.mockReturnValue(query);
    query.select.mockReturnValue(query);
    const from = vi.fn().mockReturnValue(query);
    const supabase = {
      from,
    } as unknown as ServerSupabaseClient;

    const result = await readWorkerListPageData(
      supabase,
      SEARCH,
      AS_OF
    );

    expect(result.items).toEqual([]);
    expect(result.totalCount).toBe(PAGINATION.ZERO_RESULTS);
    expect(from).toHaveBeenCalledTimes(1);
    expect(from).toHaveBeenCalledWith(
      WORKER_LIST_QUERY.TABLES.WORKERS
    );
  });
});
