import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  SUPABASE_RPC,
  WORKER_ACCOUNT_RESULT,
} from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import { generateTemporaryPassword } from "@/app/services/worker-registration/generateTemporaryPassword";
import { rehireWorker } from "../rehireWorker";
import { setWorkerPassword } from "../setWorkerPassword";

vi.mock("../setWorkerPassword", () => ({
  setWorkerPassword: vi.fn(),
}));

vi.mock(
  "@/app/services/worker-registration/generateTemporaryPassword",
  () => ({ generateTemporaryPassword: vi.fn() })
);

const WORKER_ID = "33333333-3333-3333-3333-333333333333";
const TEMPORARY_PASSWORD = "Kq7#vR2mP9!xZt";
const rpc = vi.fn();
const supabase = { rpc } as unknown as ServerSupabaseClient;

describe("rehireWorker", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(generateTemporaryPassword).mockReturnValue(
      TEMPORARY_PASSWORD
    );
    vi.mocked(setWorkerPassword).mockResolvedValue(null);
  });

  it("brings the account back and gives it a new temporary password", async () => {
    rpc.mockResolvedValue({
      data: WORKER_ACCOUNT_RESULT.READY,
      error: null,
    });

    expect(await rehireWorker(supabase, WORKER_ID)).toEqual(
      {
        ok: true,
        temporaryPassword: TEMPORARY_PASSWORD,
      }
    );
    expect(rpc).toHaveBeenCalledWith(
      SUPABASE_RPC.REHIRE_WORKER,
      {
        target_worker: WORKER_ID,
      }
    );
    expect(setWorkerPassword).toHaveBeenCalledWith(
      WORKER_ID,
      TEMPORARY_PASSWORD
    );
  });

  it("sets no password when the account is not retired", async () => {
    rpc.mockResolvedValue({
      data: WORKER_ACCOUNT_RESULT.NOT_RETIRED,
      error: null,
    });

    expect(await rehireWorker(supabase, WORKER_ID)).toEqual(
      {
        ok: false,
        result: WORKER_ACCOUNT_RESULT.NOT_RETIRED,
      }
    );
    expect(setWorkerPassword).not.toHaveBeenCalled();
  });
});
