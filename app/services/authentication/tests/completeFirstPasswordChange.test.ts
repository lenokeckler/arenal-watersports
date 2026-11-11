import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { SUPABASE_RPC } from "@/app/constants";
import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import { completeFirstPasswordChange } from "../completeFirstPasswordChange";
import { captureArguments } from "./captureArguments";
import {
  RPC_FAILURE,
  SIGNED_IN_USER_ID,
} from "./recordSignIn.constants";

vi.mock("@/app/services/supabase", () => ({
  createServiceRoleSupabaseClient: vi.fn(),
}));

const rpc = vi.fn();

describe("completeFirstPasswordChange", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    rpc.mockResolvedValue({ error: null });
    vi.mocked(
      createServiceRoleSupabaseClient
    ).mockReturnValue({ rpc } as unknown as ReturnType<
      typeof createServiceRoleSupabaseClient
    >);
  });

  it("calls the completion with the user id", async () => {
    const argumentsOf = captureArguments(rpc, [
      { error: null },
    ]);

    await completeFirstPasswordChange(SIGNED_IN_USER_ID);

    expect(argumentsOf()).toEqual([
      [
        SUPABASE_RPC.COMPLETE_FIRST_PASSWORD_CHANGE,
        { p_user_id: SIGNED_IN_USER_ID },
      ],
    ]);
  });

  it("throws when the database rejects the call", async () => {
    rpc.mockResolvedValue({ error: RPC_FAILURE });

    await expect(
      completeFirstPasswordChange(SIGNED_IN_USER_ID)
    ).rejects.toThrow(RPC_FAILURE.message);
  });
});
