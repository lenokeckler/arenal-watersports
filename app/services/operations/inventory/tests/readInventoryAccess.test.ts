import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  PAGINATION,
  WORK_MODE_ROUTE_ACCESS,
} from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { getInventorySummaryPage } from "../readInventory";
import {
  INVENTORY_SERVICE_REDIRECT_SIGNAL,
  INVENTORY_SERVICE_SUMMARY_RESULT,
  INVENTORY_SERVICE_USER,
} from "./InventoryReadService.constants";

const supabaseMocks = vi.hoisted(() => ({
  createServerSupabaseClient: vi.fn(),
  redirect: vi.fn(),
  assertActiveWorkAreaAccess: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: supabaseMocks.redirect,
}));

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient:
    supabaseMocks.createServerSupabaseClient,
}));

vi.mock(
  "@/app/services/work-mode/assertActiveWorkAreaAccess",
  () => ({
    assertActiveWorkAreaAccess:
      supabaseMocks.assertActiveWorkAreaAccess,
  })
);

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
  supabaseMocks.assertActiveWorkAreaAccess.mockResolvedValue(
    undefined
  );
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

  it("requires the active operations mode before reading inventory", async () => {
    await getInventorySummaryPage(PAGINATION.DEFAULT_PAGE);

    expect(
      supabaseMocks.assertActiveWorkAreaAccess
    ).toHaveBeenCalledWith(
      expect.objectContaining({ rpc }),
      WORK_MODE_ROUTE_ACCESS.OPERATIONS
    );
    expect(from).toHaveBeenCalled();
  });

  it("does not read inventory when the active mode is not allowed", async () => {
    supabaseMocks.assertActiveWorkAreaAccess.mockRejectedValue(
      redirectSignal
    );

    await expect(
      getInventorySummaryPage(PAGINATION.DEFAULT_PAGE)
    ).rejects.toThrow(redirectSignal);

    expect(from).not.toHaveBeenCalled();
  });
});
