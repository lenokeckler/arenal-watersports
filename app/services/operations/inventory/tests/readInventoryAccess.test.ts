import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  INVENTORY_ACCESS_FUNCTION,
  PAGINATION,
  PATHS,
  WORK_AREA,
} from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { getInventorySummaryPage } from "../readInventory";
import {
  INVENTORY_SERVICE_POSTGREST_ERROR,
  INVENTORY_SERVICE_REDIRECT_SIGNAL,
  INVENTORY_SERVICE_SUMMARY_RESULT,
  INVENTORY_SERVICE_USER,
} from "./InventoryReadService.constants";

const supabaseMocks = vi.hoisted(() => ({
  createServerSupabaseClient: vi.fn(),
  redirect: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: supabaseMocks.redirect,
}));

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient:
    supabaseMocks.createServerSupabaseClient,
}));

const getUser = vi.fn();
const rpc = vi.fn();
const from = vi.fn();
const queryBuilder = {
  select: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  neq: vi.fn().mockReturnThis(),
  order: vi.fn().mockReturnThis(),
  range: vi.fn(),
  maybeSingle: vi.fn(),
};
const redirectSignal = new Error(
  INVENTORY_SERVICE_REDIRECT_SIGNAL
);

const resetMocks = (): void => {
  vi.clearAllMocks();
  getUser.mockResolvedValue({
    data: { user: INVENTORY_SERVICE_USER },
    error: null,
  });
  rpc.mockResolvedValue({ data: true, error: null });
  from.mockReturnValue(queryBuilder);
  queryBuilder.range.mockResolvedValue(
    INVENTORY_SERVICE_SUMMARY_RESULT
  );
  supabaseMocks.redirect.mockImplementation(() => {
    throw redirectSignal;
  });
  supabaseMocks.createServerSupabaseClient.mockResolvedValue(
    {
      auth: { getUser },
      rpc,
      from,
    } as unknown as Awaited<
      ReturnType<typeof createServerSupabaseClient>
    >
  );
};

describe("inventory read authorization", () => {
  beforeEach(resetMocks);

  it("allows an administrator without the operations area", async () => {
    rpc
      .mockResolvedValueOnce({ data: false, error: null })
      .mockResolvedValueOnce({ data: true, error: null });

    await getInventorySummaryPage(PAGINATION.DEFAULT_PAGE);

    expect(rpc).toHaveBeenNthCalledWith(
      PAGINATION.ONE_PAGE,
      INVENTORY_ACCESS_FUNCTION.HAS_AREA,
      { target: WORK_AREA.OPERATIONS }
    );
    expect(rpc).toHaveBeenNthCalledWith(
      PAGINATION.ONE_PAGE + PAGINATION.ONE_PAGE,
      INVENTORY_ACCESS_FUNCTION.IS_ADMIN
    );
    expect(from).toHaveBeenCalled();
  });

  it("redirects a worker without operations or administrator access", async () => {
    rpc
      .mockResolvedValueOnce({ data: false, error: null })
      .mockResolvedValueOnce({ data: false, error: null });

    await expect(
      getInventorySummaryPage(PAGINATION.DEFAULT_PAGE)
    ).rejects.toThrow(redirectSignal);

    expect(supabaseMocks.redirect).toHaveBeenCalledWith(
      PATHS.HOME
    );
    expect(from).not.toHaveBeenCalled();
  });

  it("wraps permission failures with Supabase query context", async () => {
    rpc.mockResolvedValue({
      data: null,
      error: INVENTORY_SERVICE_POSTGREST_ERROR,
    });

    await expect(
      getInventorySummaryPage(PAGINATION.DEFAULT_PAGE)
    ).rejects.toBeInstanceOf(SupabaseQueryError);

    expect(from).not.toHaveBeenCalled();
  });
});
