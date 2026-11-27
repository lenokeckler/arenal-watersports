import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { DEPOSIT_RESOLUTION_ERROR } from "../constants/DepositResolutionError.constants";
import { DEPOSIT_RESOLUTION_QUERY } from "../constants/DepositResolutionQuery.constants";
import { getDepositResolution } from "../services/getDepositResolution";
import { recordDepositResolution } from "../services/recordDepositResolution";
import {
  CLOSED_DEPOSIT,
  CLOSED_ROW,
  MALFORMED_DEPOSIT_ID,
  PARTIAL_RECORD_ROW,
  RESOLUTION_DEPOSIT_ID,
} from "./DepositResolution.constants";
import {
  PARTIAL_COMMAND,
  PARTIAL_RECORDED,
  RESOLUTION_READ_FAILURE,
} from "./DepositResolutionAction.constants";

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));

const from = vi.fn();
const select = vi.fn();
const eq = vi.fn();
const maybeSingle = vi.fn();
const rpc = vi.fn();

describe("deposit resolution services", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    from.mockReturnValue({ select });
    select.mockReturnValue({ eq });
    eq.mockReturnValue({ maybeSingle });
    maybeSingle.mockResolvedValue({
      data: CLOSED_ROW,
      error: null,
    });
    vi.mocked(createServerSupabaseClient).mockResolvedValue(
      { from, rpc } as unknown as Awaited<
        ReturnType<typeof createServerSupabaseClient>
      >
    );
  });

  it("makes no query for a malformed identifier", async () => {
    await expect(
      getDepositResolution(MALFORMED_DEPOSIT_ID)
    ).resolves.toBeNull();
    expect(
      createServerSupabaseClient
    ).not.toHaveBeenCalled();
  });

  it("reads the deposit with its reservation", async () => {
    await expect(
      getDepositResolution(RESOLUTION_DEPOSIT_ID)
    ).resolves.toEqual(CLOSED_DEPOSIT);
    expect(from).toHaveBeenCalledWith(
      DEPOSIT_RESOLUTION_QUERY.TABLE
    );
    expect(select).toHaveBeenCalledWith(
      DEPOSIT_RESOLUTION_QUERY.PROJECTION
    );
    expect(eq).toHaveBeenCalledWith(
      DEPOSIT_RESOLUTION_QUERY.COLUMNS.ID,
      RESOLUTION_DEPOSIT_ID
    );
  });

  it("returns null for a deposit it cannot see", async () => {
    maybeSingle.mockResolvedValue({
      data: null,
      error: null,
    });

    await expect(
      getDepositResolution(RESOLUTION_DEPOSIT_ID)
    ).resolves.toBeNull();
  });

  it("throws a read failure with its operation", async () => {
    maybeSingle.mockResolvedValue({
      data: null,
      error: RESOLUTION_READ_FAILURE,
    });

    await expect(
      getDepositResolution(RESOLUTION_DEPOSIT_ID)
    ).rejects.toThrow(
      DEPOSIT_RESOLUTION_ERROR.OPERATION.READ
    );
  });

  it("sends the resolution with the snake case payload", async () => {
    rpc.mockResolvedValue({
      data: [PARTIAL_RECORD_ROW],
      error: null,
    });

    await expect(
      recordDepositResolution(PARTIAL_COMMAND)
    ).resolves.toEqual(PARTIAL_RECORDED);
    expect(rpc).toHaveBeenCalledWith(
      DEPOSIT_RESOLUTION_QUERY.RPC.RESOLVE,
      {
        p_payload: {
          deposit_id: PARTIAL_COMMAND.depositId,
          reason: PARTIAL_COMMAND.reason,
          returned_amount: PARTIAL_COMMAND.returnedAmount,
        },
      }
    );
  });

  it("keeps the database message and refuses an empty answer", async () => {
    rpc.mockResolvedValueOnce({
      data: null,
      error: {
        ...RESOLUTION_READ_FAILURE,
        message:
          DEPOSIT_RESOLUTION_ERROR.MESSAGE.ALREADY_RESOLVED,
      },
    });
    await expect(
      recordDepositResolution(PARTIAL_COMMAND)
    ).rejects.toThrow(
      DEPOSIT_RESOLUTION_ERROR.MESSAGE.ALREADY_RESOLVED
    );

    rpc.mockResolvedValueOnce({ data: [], error: null });
    await expect(
      recordDepositResolution(PARTIAL_COMMAND)
    ).rejects.toThrow(
      DEPOSIT_RESOLUTION_ERROR.OPERATION.MISSING_RESOLUTION
    );
  });
});
