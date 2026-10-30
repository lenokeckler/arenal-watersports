import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  PAGINATION,
  SUPABASE_WORK_AREA,
} from "@/app/constants";
import { SUPABASE_WORKER_STATUS } from "@/app/constants/supabase/SupabaseWorkerStatus.constants";
import { WORKER_LIST_QUERY } from "@/app/constants/supabase/WorkerListQuery.constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import type { WorkerListSearch } from "../models/WorkerListSearch.interface";
import { readWorkerListPage } from "../readWorkerListPage";

const {
  createServerSupabaseClient,
  isSignedInAdministrator,
  ranges,
} = vi.hoisted(() => ({
  createServerSupabaseClient: vi.fn(),
  isSignedInAdministrator: vi.fn(),
  ranges: [] as Array<[number, number]>,
}));

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient,
}));
vi.mock(
  "@/app/services/worker-registration/isSignedInAdministrator",
  () => ({
    isSignedInAdministrator,
  })
);

const WORKER_ROW = {
  base_role: SUPABASE_WORK_AREA.OPERATIONS,
  deleted_at: null,
  expires_at: null,
  full_name: "Celso Rojas",
  id: "11111111-1111-1111-1111-111111111111",
  is_external_guide: false,
  status: SUPABASE_WORKER_STATUS.ACTIVE,
  username: "celso",
};

const SEARCH: WorkerListSearch = {
  baseRole: undefined,
  pageIndex: 999,
  status: undefined,
};

const createWorkerQuery = () => {
  const query = {
    order: () => query,
    range: (from: number, to: number) => {
      ranges.push([from, to]);
      return Promise.resolve({
        count: 12,
        data:
          from === PAGINATION.DEFAULT_PAGE
            ? []
            : [WORKER_ROW],
        error: null,
      });
    },
  };
  return query;
};

const createSupabase = (): ServerSupabaseClient => {
  const supabase = {
    from: (table: string) => {
      if (table === WORKER_LIST_QUERY.TABLES.WORKERS) {
        return { select: createWorkerQuery };
      }

      return {
        select: () => ({
          in: () =>
            Promise.resolve({ data: [], error: null }),
        }),
      };
    },
  };
  return supabase as unknown as ServerSupabaseClient;
};

describe("readWorkerListPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    ranges.length = 0;
    isSignedInAdministrator.mockResolvedValue(true);
    createServerSupabaseClient.mockResolvedValue(
      createSupabase()
    );
  });

  it("clamps an out-of-range page before issuing its data query", async () => {
    const result = await readWorkerListPage(SEARCH);
    const expectedLastPage =
      Math.ceil(12 / PAGINATION.DEFAULT_PAGE_SIZE) -
      PAGINATION.ONE_PAGE;

    expect(result?.pageIndex).toBe(expectedLastPage);
    expect(ranges).toEqual([
      [
        PAGINATION.DEFAULT_PAGE,
        PAGINATION.DEFAULT_PAGE_SIZE - PAGINATION.ONE_PAGE,
      ],
      [
        expectedLastPage * PAGINATION.DEFAULT_PAGE_SIZE,
        expectedLastPage * PAGINATION.DEFAULT_PAGE_SIZE +
          PAGINATION.DEFAULT_PAGE_SIZE -
          PAGINATION.ONE_PAGE,
      ],
    ]);
  });

  it("does not query worker records for a non-administrator", async () => {
    isSignedInAdministrator.mockResolvedValue(false);
    const supabase = createSupabase();
    createServerSupabaseClient.mockResolvedValue(supabase);

    expect(await readWorkerListPage(SEARCH)).toBeNull();
    expect(ranges).toHaveLength(0);
  });
});
