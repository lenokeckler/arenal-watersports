import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { SUPABASE_RPC } from "@/app/constants";
import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import { consumePasswordResetPin } from "../consumePasswordResetPin";
import { finishPasswordRecovery } from "../finishPasswordRecovery";
import {
  NORMALIZED_USERNAME,
  RPC_FAILURE,
  UNNORMALIZED_USERNAME,
} from "./passwordRecovery.constants";
import {
  RESET_NORMALIZED_PIN,
  RESET_UNNORMALIZED_PIN,
  RESET_WORKER_ID,
} from "./passwordRecoveryReset.constants";

vi.mock("@/app/services/supabase", () => ({
  createServiceRoleSupabaseClient: vi.fn(),
}));

const rpc = vi.fn();

describe("password recovery reset RPC wrappers", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    rpc.mockResolvedValue({
      data: RESET_WORKER_ID,
      error: null,
    });
    vi.mocked(
      createServiceRoleSupabaseClient
    ).mockReturnValue({ rpc } as never);
  });

  it("consumes the pin with the normalized username and pin", async () => {
    const workerId = await consumePasswordResetPin({
      pin: RESET_UNNORMALIZED_PIN,
      username: UNNORMALIZED_USERNAME,
    });

    expect(workerId).toBe(RESET_WORKER_ID);
    expect(rpc).toHaveBeenCalledWith(
      SUPABASE_RPC.CONSUME_PASSWORD_RESET_PIN,
      {
        p_pin: RESET_NORMALIZED_PIN,
        p_username: NORMALIZED_USERNAME,
      }
    );
  });

  it("returns null when no pin matched", async () => {
    rpc.mockResolvedValue({ data: null, error: null });

    await expect(
      consumePasswordResetPin({
        pin: RESET_NORMALIZED_PIN,
        username: NORMALIZED_USERNAME,
      })
    ).resolves.toBeNull();
  });

  it("throws when consuming the pin fails", async () => {
    rpc.mockResolvedValue({
      data: null,
      error: RPC_FAILURE,
    });

    await expect(
      consumePasswordResetPin({
        pin: RESET_NORMALIZED_PIN,
        username: NORMALIZED_USERNAME,
      })
    ).rejects.toThrow();
  });

  it("finishes the recovery for the worker", async () => {
    rpc.mockResolvedValue({ data: null, error: null });

    await finishPasswordRecovery(RESET_WORKER_ID);

    expect(rpc).toHaveBeenCalledWith(
      SUPABASE_RPC.FINISH_PASSWORD_RECOVERY,
      { p_user_id: RESET_WORKER_ID }
    );
  });

  it("throws when finishing the recovery fails", async () => {
    rpc.mockResolvedValue({
      data: null,
      error: RPC_FAILURE,
    });

    await expect(
      finishPasswordRecovery(RESET_WORKER_ID)
    ).rejects.toThrow();
  });
});
