import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  PASSWORD_CHANGE_ERROR_CODE,
  PASSWORD_CHANGE_FIELD,
  SUPABASE_RPC,
  WORKER_ACCOUNT_RESULT,
} from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import { generateTemporaryPassword } from "@/app/services/worker-registration/generateTemporaryPassword";
import { grantTemporaryPassword } from "../grantTemporaryPassword";
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

describe("grantTemporaryPassword", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(generateTemporaryPassword).mockReturnValue(
      TEMPORARY_PASSWORD
    );
    vi.mocked(setWorkerPassword).mockResolvedValue(null);
  });

  it("prepares the account and sets a new temporary password", async () => {
    rpc.mockResolvedValue({
      data: WORKER_ACCOUNT_RESULT.READY,
      error: null,
    });

    expect(
      await grantTemporaryPassword(supabase, WORKER_ID)
    ).toEqual({
      ok: true,
      temporaryPassword: TEMPORARY_PASSWORD,
    });
    expect(rpc).toHaveBeenCalledWith(
      SUPABASE_RPC.PREPARE_WORKER_TEMPORARY_PASSWORD,
      { target_worker: WORKER_ID }
    );
    expect(setWorkerPassword).toHaveBeenCalledWith(
      WORKER_ID,
      TEMPORARY_PASSWORD
    );
  });

  it.each([
    WORKER_ACCOUNT_RESULT.HAS_PERSONAL_EMAIL,
    WORKER_ACCOUNT_RESULT.ADMIN_ACCOUNT,
    WORKER_ACCOUNT_RESULT.RETIRED,
    WORKER_ACCOUNT_RESULT.NOT_ALLOWED,
  ])(
    "sets no password when the database answers %s",
    async (answer) => {
      rpc.mockResolvedValue({ data: answer, error: null });

      expect(
        await grantTemporaryPassword(supabase, WORKER_ID)
      ).toEqual({
        ok: false,
        result: answer,
      });
      expect(setWorkerPassword).not.toHaveBeenCalled();
    }
  );

  it("reports a failure when the password cannot be set", async () => {
    rpc.mockResolvedValue({
      data: WORKER_ACCOUNT_RESULT.READY,
      error: null,
    });
    vi.mocked(setWorkerPassword).mockResolvedValue({
      code: PASSWORD_CHANGE_ERROR_CODE.UNKNOWN,
      field: PASSWORD_CHANGE_FIELD.FORM,
    });

    expect(
      await grantTemporaryPassword(supabase, WORKER_ID)
    ).toEqual({
      ok: false,
      result: WORKER_ACCOUNT_RESULT.FAILED,
    });
  });

  it("fails loudly when the database call fails", async () => {
    rpc.mockResolvedValue({
      data: null,
      error: { message: "down" },
    });

    await expect(
      grantTemporaryPassword(supabase, WORKER_ID)
    ).rejects.toThrow();
  });
});
