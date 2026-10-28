import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { SUPABASE_RPC } from "@/app/constants";
import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import { recordSuccessfulSignIn } from "../recordSuccessfulSignIn";
import {
  RPC_FAILURE,
  SIGNED_IN_USER_ID,
} from "./recordSignIn.constants";

vi.mock("@/app/services/supabase", () => ({
  createServiceRoleSupabaseClient: vi.fn(),
}));

const rpc = vi.fn();

describe("recordSuccessfulSignIn", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    rpc.mockResolvedValue({ error: null });
    vi.mocked(
      createServiceRoleSupabaseClient
    ).mockReturnValue({ rpc } as unknown as ReturnType<
      typeof createServiceRoleSupabaseClient
    >);
  });

  it("calls the recorder with the user id", async () => {
    await recordSuccessfulSignIn(SIGNED_IN_USER_ID);

    expect(rpc).toHaveBeenCalledOnce();
    expect(rpc).toHaveBeenCalledWith(
      SUPABASE_RPC.RECORD_SUCCESSFUL_SIGN_IN,
      { p_user_id: SIGNED_IN_USER_ID }
    );
  });

  it("throws when the database rejects the call", async () => {
    rpc.mockResolvedValue({ error: RPC_FAILURE });

    await expect(
      recordSuccessfulSignIn(SIGNED_IN_USER_ID)
    ).rejects.toThrow(RPC_FAILURE.message);
  });
});
