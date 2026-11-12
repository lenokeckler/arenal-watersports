import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  INVENTORY_UNIT_STATUS,
  SUPABASE_RPC,
} from "@/app/constants";
import { requireInventoryAccess } from "@/app/services/operations/inventory/requireInventoryAccess";
import { submitInventoryUnitCondition } from "../actions/submitInventoryUnitCondition";
import { INVENTORY_UNIT_CONDITION_RESULT } from "../constants/InventoryUnitCondition.constants";
import { INVENTORY_UNIT_CONDITION_TEST } from "./InventoryUnitCondition.constants";

vi.mock(
  "@/app/services/operations/inventory/requireInventoryAccess",
  () => ({ requireInventoryAccess: vi.fn() })
);

const rpc = vi.fn();

describe("submitInventoryUnitCondition", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(requireInventoryAccess).mockResolvedValue({
      rpc,
    } as never);
  });

  it("asks the database to set the condition of the unit", async () => {
    rpc.mockResolvedValue({
      data: INVENTORY_UNIT_CONDITION_RESULT.CHANGED,
      error: null,
    });

    expect(
      await submitInventoryUnitCondition(
        INVENTORY_UNIT_CONDITION_TEST.UNIT_ID,
        INVENTORY_UNIT_STATUS.DAMAGED
      )
    ).toBe(INVENTORY_UNIT_CONDITION_RESULT.CHANGED);
    expect(rpc).toHaveBeenCalledWith(
      SUPABASE_RPC.SET_UNIT_CONDITION,
      {
        new_status: INVENTORY_UNIT_STATUS.DAMAGED,
        target_unit: INVENTORY_UNIT_CONDITION_TEST.UNIT_ID,
      }
    );
  });

  it.each([
    [INVENTORY_UNIT_CONDITION_RESULT.OCCUPIED],
    [INVENTORY_UNIT_CONDITION_RESULT.NOT_CHANGEABLE],
    [INVENTORY_UNIT_CONDITION_RESULT.NOT_ALLOWED],
    [INVENTORY_UNIT_CONDITION_RESULT.NO_CHANGE],
  ])("passes the refusal %s through", async (refusal) => {
    rpc.mockResolvedValue({ data: refusal, error: null });

    expect(
      await submitInventoryUnitCondition(
        INVENTORY_UNIT_CONDITION_TEST.UNIT_ID,
        INVENTORY_UNIT_STATUS.IN_REPAIR
      )
    ).toBe(refusal);
  });

  it("refuses a status that cannot be chosen before touching the database", async () => {
    expect(
      await submitInventoryUnitCondition(
        INVENTORY_UNIT_CONDITION_TEST.UNIT_ID,
        INVENTORY_UNIT_CONDITION_TEST.UNKNOWN_STATUS
      )
    ).toBe(INVENTORY_UNIT_CONDITION_RESULT.INVALID_STATUS);
    expect(requireInventoryAccess).not.toHaveBeenCalled();
    expect(rpc).not.toHaveBeenCalled();
  });

  it("answers failed for a result it does not know", async () => {
    rpc.mockResolvedValue({
      data: INVENTORY_UNIT_CONDITION_TEST.UNKNOWN_RESULT,
      error: null,
    });

    expect(
      await submitInventoryUnitCondition(
        INVENTORY_UNIT_CONDITION_TEST.UNIT_ID,
        INVENTORY_UNIT_STATUS.AVAILABLE
      )
    ).toBe(INVENTORY_UNIT_CONDITION_RESULT.FAILED);
  });

  it("throws the database error", async () => {
    rpc.mockResolvedValue({
      data: null,
      error: INVENTORY_UNIT_CONDITION_TEST.DATABASE_ERROR,
    });

    await expect(
      submitInventoryUnitCondition(
        INVENTORY_UNIT_CONDITION_TEST.UNIT_ID,
        INVENTORY_UNIT_STATUS.AVAILABLE
      )
    ).rejects.toThrow(SUPABASE_RPC.SET_UNIT_CONDITION);
  });
});
