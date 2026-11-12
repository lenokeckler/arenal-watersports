import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  SUPABASE_RPC,
  SUPABASE_WORKER_MARK,
  WORKER_AREA_INTENT,
  WORKER_MARK_CHANGE_RESULT,
} from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import { changeWorkerMark } from "../changeWorkerMark";

const WORKER_ID = "33333333-3333-3333-3333-333333333333";
const rpc = vi.fn();
const supabase = { rpc } as unknown as ServerSupabaseClient;

const change = (
  intent: (typeof WORKER_AREA_INTENT)[keyof typeof WORKER_AREA_INTENT]
) =>
  changeWorkerMark(supabase, {
    intent,
    mark: SUPABASE_WORKER_MARK.GUIDE,
    workerId: WORKER_ID,
  });

describe("changeWorkerMark", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.each([
    [
      WORKER_AREA_INTENT.GRANT,
      SUPABASE_RPC.GRANT_WORKER_MARK,
    ],
    [
      WORKER_AREA_INTENT.REVOKE,
      SUPABASE_RPC.REVOKE_WORKER_MARK,
    ],
  ])(
    "calls the database check for %s",
    async (intent, expectedRpc) => {
      rpc.mockResolvedValue({
        data: WORKER_MARK_CHANGE_RESULT.GRANTED,
        error: null,
      });

      await change(intent);

      expect(rpc).toHaveBeenCalledWith(expectedRpc, {
        target_mark: SUPABASE_WORKER_MARK.GUIDE,
        target_worker: WORKER_ID,
      });
    }
  );

  it.each(Object.values(WORKER_MARK_CHANGE_RESULT))(
    "reports the %s answer",
    async (answer) => {
      rpc.mockResolvedValue({ data: answer, error: null });

      expect(await change(WORKER_AREA_INTENT.GRANT)).toBe(
        answer
      );
    }
  );

  it("reports an unknown answer as a failure", async () => {
    rpc.mockResolvedValue({ data: "maybe", error: null });

    expect(await change(WORKER_AREA_INTENT.GRANT)).toBe(
      WORKER_MARK_CHANGE_RESULT.FAILED
    );
  });

  it("fails loudly when the call fails", async () => {
    rpc.mockResolvedValue({
      data: null,
      error: { message: "down" },
    });

    await expect(
      change(WORKER_AREA_INTENT.REVOKE)
    ).rejects.toThrow();
  });
});
