import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { SUPABASE_RPC } from "@/app/constants";
import { requireInventoryAccess } from "@/app/services/operations/inventory/requireInventoryAccess";
import { submitInventoryCount } from "../actions/submitInventoryCount";
import {
  INVENTORY_COUNT_LIMITS,
  INVENTORY_COUNT_RESULT,
} from "../constants/InventoryCount.constants";
import type { InventoryCountInput } from "../models/InventoryCountInput.interface";
import { INVENTORY_COUNT_TEST } from "./InventoryCount.constants";

vi.mock(
  "@/app/services/operations/inventory/requireInventoryAccess",
  () => ({ requireInventoryAccess: vi.fn() })
);

const rpc = vi.fn();

const INPUT: InventoryCountInput = {
  lines: [
    {
      categoryId: INVENTORY_COUNT_TEST.CATEGORY_UNIT_ID,
      confirmedStatus: "available",
      unitId: INVENTORY_COUNT_TEST.FIRST_UNIT_ID,
    },
    {
      categoryId: INVENTORY_COUNT_TEST.CATEGORY_QUANTITY_ID,
      quantities: { available: 4, damaged: 0, inRepair: 1 },
    },
  ],
  notes: INVENTORY_COUNT_TEST.NOTES,
};

describe("submitInventoryCount", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(requireInventoryAccess).mockResolvedValue({
      rpc,
    } as never);
  });

  it("sends the lines and the notes to the database", async () => {
    rpc.mockResolvedValue({
      data: [{ outcome: INVENTORY_COUNT_RESULT.RECORDED }],
      error: null,
    });

    expect(await submitInventoryCount(INPUT)).toBe(
      INVENTORY_COUNT_RESULT.RECORDED
    );
    expect(rpc).toHaveBeenCalledWith(
      SUPABASE_RPC.RECORD_INVENTORY_COUNT,
      {
        count_lines: [
          {
            category_id:
              INVENTORY_COUNT_TEST.CATEGORY_UNIT_ID,
            confirmed_status: "available",
            unit_id: INVENTORY_COUNT_TEST.FIRST_UNIT_ID,
          },
          {
            category_id:
              INVENTORY_COUNT_TEST.CATEGORY_QUANTITY_ID,
            quantity_available: 4,
            quantity_damaged: 0,
            quantity_in_repair: 1,
          },
        ],
        count_notes: INVENTORY_COUNT_TEST.NOTES,
      }
    );
  });

  it.each([
    [INVENTORY_COUNT_RESULT.INCOMPLETE],
    [INVENTORY_COUNT_RESULT.INVALID],
    [INVENTORY_COUNT_RESULT.NOT_ALLOWED],
  ])("passes the refusal %s through", async (refusal) => {
    rpc.mockResolvedValue({
      data: [{ outcome: refusal }],
      error: null,
    });

    expect(await submitInventoryCount(INPUT)).toBe(refusal);
  });

  it("refuses an empty count and overlong notes before touching the database", async () => {
    expect(
      await submitInventoryCount({ lines: [], notes: "" })
    ).toBe(INVENTORY_COUNT_RESULT.INVALID);
    expect(
      await submitInventoryCount({
        ...INPUT,
        notes: "a".repeat(
          INVENTORY_COUNT_LIMITS.NOTES_MAX_LENGTH + 1
        ),
      })
    ).toBe(INVENTORY_COUNT_RESULT.INVALID);
    expect(requireInventoryAccess).not.toHaveBeenCalled();
  });

  it("answers failed for an outcome it does not know", async () => {
    rpc.mockResolvedValue({
      data: [
        { outcome: INVENTORY_COUNT_TEST.UNKNOWN_OUTCOME },
      ],
      error: null,
    });

    expect(await submitInventoryCount(INPUT)).toBe(
      INVENTORY_COUNT_RESULT.FAILED
    );
  });

  it("throws the database error", async () => {
    rpc.mockResolvedValue({
      data: null,
      error: INVENTORY_COUNT_TEST.DATABASE_ERROR,
    });

    await expect(
      submitInventoryCount(INPUT)
    ).rejects.toThrow(SUPABASE_RPC.RECORD_INVENTORY_COUNT);
  });
});
