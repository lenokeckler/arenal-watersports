import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { SUPABASE_RPC } from "@/app/constants";
import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import { isPasswordResetGrantOpen } from "../isPasswordResetGrantOpen";
import {
  GRANT,
  MALFORMED_GRANT,
} from "./passwordRecoveryGrant.constants";
import { RPC_FAILURE } from "./passwordRecovery.constants";

vi.mock("@/app/services/supabase", () => ({
  createServiceRoleSupabaseClient: vi.fn(),
}));

const rpc = vi.fn();

describe("isPasswordResetGrantOpen", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    rpc.mockResolvedValue({ data: true, error: null });
    vi.mocked(
      createServiceRoleSupabaseClient
    ).mockReturnValue({ rpc } as never);
  });

  it("asks the server about the pass", async () => {
    await isPasswordResetGrantOpen(GRANT);

    expect(rpc).toHaveBeenCalledWith(
      SUPABASE_RPC.PASSWORD_RESET_GRANT_IS_OPEN,
      { p_token: GRANT }
    );
  });

  it("is open when the server says so", async () => {
    await expect(
      isPasswordResetGrantOpen(GRANT)
    ).resolves.toBe(true);
  });

  it("is closed when the server says so", async () => {
    rpc.mockResolvedValue({ data: false, error: null });

    await expect(
      isPasswordResetGrantOpen(GRANT)
    ).resolves.toBe(false);
  });

  it("never asks the server about a malformed pass", async () => {
    await expect(
      isPasswordResetGrantOpen(MALFORMED_GRANT)
    ).resolves.toBe(false);
    expect(rpc).not.toHaveBeenCalled();
  });

  it("is closed when the server fails", async () => {
    rpc.mockResolvedValue({
      data: null,
      error: RPC_FAILURE,
    });

    await expect(
      isPasswordResetGrantOpen(GRANT)
    ).resolves.toBe(false);
  });

  it("is closed when the request throws", async () => {
    rpc.mockRejectedValue(RPC_FAILURE);

    await expect(
      isPasswordResetGrantOpen(GRANT)
    ).resolves.toBe(false);
  });
});
