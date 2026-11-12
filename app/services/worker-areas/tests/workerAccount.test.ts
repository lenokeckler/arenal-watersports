import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  SUPABASE_RPC,
  SUPABASE_WORKER_BLOCKED_REASON,
  WORKER_ACCOUNT_ACTION,
  WORKER_ACCOUNT_RESULT,
  WORKER_ACCOUNT_STATE,
} from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import { changeWorkerAccount } from "../changeWorkerAccount";
import { resolveWorkerAccountState } from "../resolveWorkerAccountState";

const WORKER_ID = "33333333-3333-3333-3333-333333333333";
const rpc = vi.fn();
const supabase = { rpc } as unknown as ServerSupabaseClient;

describe("resolveWorkerAccountState", () => {
  it.each([
    [
      { blocked_reason: null, deleted_at: null },
      WORKER_ACCOUNT_STATE.ACTIVE,
    ],
    [
      {
        blocked_reason:
          SUPABASE_WORKER_BLOCKED_REASON.FAILED_ATTEMPTS,
        deleted_at: null,
      },
      WORKER_ACCOUNT_STATE.BLOCKED_BY_ATTEMPTS,
    ],
    [
      {
        blocked_reason:
          SUPABASE_WORKER_BLOCKED_REASON.ADMINISTRATION,
        deleted_at: null,
      },
      WORKER_ACCOUNT_STATE.BLOCKED_BY_ADMINISTRATION,
    ],
    [
      {
        blocked_reason:
          SUPABASE_WORKER_BLOCKED_REASON.ADMINISTRATION,
        deleted_at: "2026-10-25T10:00:00Z",
      },
      WORKER_ACCOUNT_STATE.RETIRED,
    ],
  ] as const)("reads %j as %s", (row, expected) => {
    expect(resolveWorkerAccountState(row)).toBe(expected);
  });
});

describe("changeWorkerAccount", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.each([
    [
      WORKER_ACCOUNT_ACTION.BLOCK,
      SUPABASE_RPC.BLOCK_WORKER,
    ],
    [
      WORKER_ACCOUNT_ACTION.UNLOCK,
      SUPABASE_RPC.UNLOCK_WORKER,
    ],
  ])(
    "calls the database check for %s",
    async (action, expectedRpc) => {
      rpc.mockResolvedValue({
        data: WORKER_ACCOUNT_RESULT.BLOCKED,
        error: null,
      });

      await changeWorkerAccount(supabase, {
        action,
        workerId: WORKER_ID,
      });

      expect(rpc).toHaveBeenCalledWith(expectedRpc, {
        target_worker: WORKER_ID,
      });
    }
  );

  it.each(Object.values(WORKER_ACCOUNT_RESULT))(
    "reports the %s answer",
    async (answer) => {
      rpc.mockResolvedValue({ data: answer, error: null });

      expect(
        await changeWorkerAccount(supabase, {
          action: WORKER_ACCOUNT_ACTION.BLOCK,
          workerId: WORKER_ID,
        })
      ).toBe(answer);
    }
  );

  it("reports an unknown answer as a failure and a failing call loudly", async () => {
    rpc.mockResolvedValueOnce({
      data: "maybe",
      error: null,
    });
    expect(
      await changeWorkerAccount(supabase, {
        action: WORKER_ACCOUNT_ACTION.UNLOCK,
        workerId: WORKER_ID,
      })
    ).toBe(WORKER_ACCOUNT_RESULT.FAILED);

    rpc.mockResolvedValueOnce({
      data: null,
      error: { message: "down" },
    });
    await expect(
      changeWorkerAccount(supabase, {
        action: WORKER_ACCOUNT_ACTION.UNLOCK,
        workerId: WORKER_ID,
      })
    ).rejects.toThrow();
  });
});
