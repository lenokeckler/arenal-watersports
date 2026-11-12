import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { SUPABASE_RPC } from "@/app/constants";
import { requireInventoryAccess } from "@/app/services/operations/inventory/requireInventoryAccess";
import { getInventoryCountDetail } from "../services/getInventoryCountDetail";
import { listInventoryCounts } from "../services/listInventoryCounts";
import {
  COUNT_SUMMARY,
  COUNT_SUMMARY_ROW,
  INVENTORY_COUNT_HISTORY_TEST,
  UNIT_LINE_CHANGED,
} from "./InventoryCountHistory.constants";

vi.mock(
  "@/app/services/operations/inventory/requireInventoryAccess",
  () => ({ requireInventoryAccess: vi.fn() })
);

const rpc = vi.fn();
const eq = vi.fn();
const select = vi.fn(() => ({ eq }));
const from = vi.fn(() => ({ select }));

describe("inventory count services", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(requireInventoryAccess).mockResolvedValue({
      from,
      rpc,
    } as never);
  });

  it("lists the counts the database returns", async () => {
    rpc.mockResolvedValue({
      data: [COUNT_SUMMARY_ROW],
      error: null,
    });

    expect(
      await listInventoryCounts({ limit: 10, offset: 10 })
    ).toEqual({ counts: [COUNT_SUMMARY], totalCount: 25 });
    expect(rpc).toHaveBeenCalledWith(
      SUPABASE_RPC.LIST_INVENTORY_COUNTS,
      {
        only_count: undefined,
        page_limit: 10,
        page_offset: 10,
      }
    );
  });

  it("throws the database error when listing", async () => {
    rpc.mockResolvedValue({
      data: null,
      error: INVENTORY_COUNT_HISTORY_TEST.DATABASE_ERROR,
    });

    await expect(
      listInventoryCounts({ limit: 10, offset: 0 })
    ).rejects.toThrow();
  });

  it("builds the detail of a count from its lines", async () => {
    rpc.mockResolvedValue({
      data: [COUNT_SUMMARY_ROW],
      error: null,
    });
    eq.mockResolvedValue({
      data: [UNIT_LINE_CHANGED],
      error: null,
    });

    const detail = await getInventoryCountDetail(
      INVENTORY_COUNT_HISTORY_TEST.COUNT_ID
    );

    expect(detail?.summary).toEqual(COUNT_SUMMARY);
    expect(detail?.unitDifferences).toHaveLength(1);
    expect(eq).toHaveBeenCalledWith(
      "count_id",
      INVENTORY_COUNT_HISTORY_TEST.COUNT_ID
    );
  });

  it("answers null for an id that is not a uuid without touching the database", async () => {
    expect(
      await getInventoryCountDetail("not-a-uuid")
    ).toBeNull();
    expect(requireInventoryAccess).not.toHaveBeenCalled();
  });

  it("answers null for a count that is not in the last year", async () => {
    rpc.mockResolvedValue({ data: [], error: null });

    expect(
      await getInventoryCountDetail(
        INVENTORY_COUNT_HISTORY_TEST.OTHER_COUNT_ID
      )
    ).toBeNull();
    expect(rpc).toHaveBeenCalledWith(
      SUPABASE_RPC.LIST_INVENTORY_COUNTS,
      expect.objectContaining({
        only_count:
          INVENTORY_COUNT_HISTORY_TEST.OTHER_COUNT_ID,
      })
    );
    expect(from).not.toHaveBeenCalled();
  });
});
