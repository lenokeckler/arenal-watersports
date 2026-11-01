import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  PASSWORD_RECOVERY_ERROR_CODE,
  SUPABASE_RPC,
} from "@/app/constants";
import { setWorkerPassword } from "@/app/services/authentication";
import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import { deliverPasswordChangedNoticeQuietly } from "../deliverPasswordChangedNoticeQuietly";
import { finishPasswordRecovery } from "../finishPasswordRecovery";
import { resetPasswordWithGrant } from "../resetPasswordWithGrant";
import {
  GRANT,
  GRANT_COMMON_PASSWORD,
  GRANT_RESET_INPUT,
} from "./passwordRecoveryGrant.constants";
import { RPC_FAILURE } from "./passwordRecovery.constants";
import {
  NETWORK_PASSWORD_ERROR,
  RESET_FINISH_FAILURE_MESSAGE,
  RESET_MISMATCHED_PASSWORD,
  RESET_NEW_PASSWORD,
  RESET_WEAK_PASSWORD,
  RESET_WORKER_ID,
} from "./passwordRecoveryReset.constants";

vi.mock("@/app/services/supabase", () => ({
  createServiceRoleSupabaseClient: vi.fn(),
}));
vi.mock("@/app/services/authentication", () => ({
  setWorkerPassword: vi.fn(),
}));
vi.mock("../finishPasswordRecovery", () => ({
  finishPasswordRecovery: vi.fn(),
}));
vi.mock("../deliverPasswordChangedNoticeQuietly", () => ({
  deliverPasswordChangedNoticeQuietly: vi.fn(),
}));

const rpc = vi.fn();
const defer = vi.fn();

const reset = (
  overrides: Partial<typeof GRANT_RESET_INPUT> = {}
) =>
  resetPasswordWithGrant(
    { ...GRANT_RESET_INPUT, ...overrides },
    defer
  );

describe("resetPasswordWithGrant", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    rpc.mockResolvedValue({
      data: RESET_WORKER_ID,
      error: null,
    });
    vi.mocked(
      createServiceRoleSupabaseClient
    ).mockReturnValue({ rpc } as never);
    vi.mocked(setWorkerPassword).mockResolvedValue(null);
    vi.mocked(finishPasswordRecovery).mockResolvedValue(
      undefined
    );
    vi.mocked(
      deliverPasswordChangedNoticeQuietly
    ).mockResolvedValue(undefined);
  });

  it("uses the pass, saves the password, closes the recovery and schedules the notice", async () => {
    await expect(reset()).resolves.toEqual({ ok: true });

    expect(rpc).toHaveBeenCalledWith(
      SUPABASE_RPC.REDEEM_PASSWORD_RESET_GRANT,
      { p_token: GRANT }
    );
    expect(setWorkerPassword).toHaveBeenCalledWith(
      RESET_WORKER_ID,
      RESET_NEW_PASSWORD
    );
    expect(finishPasswordRecovery).toHaveBeenCalledWith(
      RESET_WORKER_ID
    );
    expect(defer).toHaveBeenCalledOnce();
  });

  it.each([
    [
      "a weak password",
      {
        confirmPassword: RESET_WEAK_PASSWORD,
        newPassword: RESET_WEAK_PASSWORD,
      },
    ],
    [
      "a mismatched confirmation",
      { confirmPassword: RESET_MISMATCHED_PASSWORD },
    ],
    [
      "a common password",
      {
        confirmPassword: GRANT_COMMON_PASSWORD,
        newPassword: GRANT_COMMON_PASSWORD,
      },
    ],
  ])(
    "refuses %s without spending the pass",
    async (_label, overrides) => {
      await expect(reset(overrides)).resolves.toMatchObject(
        {
          ok: false,
        }
      );
      expect(rpc).not.toHaveBeenCalled();
      expect(setWorkerPassword).not.toHaveBeenCalled();
    }
  );

  it("says the time ran out when the pass is closed", async () => {
    rpc.mockResolvedValue({ data: null, error: null });

    await expect(reset()).resolves.toMatchObject({
      error: {
        code: PASSWORD_RECOVERY_ERROR_CODE.RESET_EXPIRED,
      },
      ok: false,
    });
    expect(setWorkerPassword).not.toHaveBeenCalled();
  });

  it("answers unknown when using the pass fails", async () => {
    rpc.mockResolvedValue({
      data: null,
      error: RPC_FAILURE,
    });

    await expect(reset()).resolves.toMatchObject({
      error: { code: PASSWORD_RECOVERY_ERROR_CODE.UNKNOWN },
      ok: false,
    });
    expect(setWorkerPassword).not.toHaveBeenCalled();
  });

  it("says the password was not saved when the auth server refuses it", async () => {
    vi.mocked(setWorkerPassword).mockResolvedValue(
      NETWORK_PASSWORD_ERROR
    );

    await expect(reset()).resolves.toMatchObject({
      error: {
        code: PASSWORD_RECOVERY_ERROR_CODE.PASSWORD_NOT_SAVED,
      },
      ok: false,
    });
    expect(finishPasswordRecovery).not.toHaveBeenCalled();
  });

  it("answers unknown when closing the recovery keeps failing", async () => {
    vi.mocked(finishPasswordRecovery).mockRejectedValue(
      new Error(RESET_FINISH_FAILURE_MESSAGE)
    );

    await expect(reset()).resolves.toMatchObject({
      error: { code: PASSWORD_RECOVERY_ERROR_CODE.UNKNOWN },
      ok: false,
    });
    expect(defer).not.toHaveBeenCalled();
  });
});
