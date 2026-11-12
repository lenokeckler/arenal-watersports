import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { SUPABASE_RPC } from "@/app/constants";
import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import {
  DEFAULT_SIGN_IN_CREDENTIALS,
  UNNORMALIZED_USERNAME,
} from "@/app/utils/sign-in/tests/signIn.constants";
import { recordFailedSignIn } from "../recordFailedSignIn";
import { RPC_FAILURE } from "./recordSignIn.constants";

vi.mock("@/app/services/supabase", () => ({
  createServiceRoleSupabaseClient: vi.fn(),
}));

const rpc = vi.fn();

describe("recordFailedSignIn", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    rpc.mockResolvedValue({ error: null });
    vi.mocked(
      createServiceRoleSupabaseClient
    ).mockReturnValue({ rpc } as unknown as ReturnType<
      typeof createServiceRoleSupabaseClient
    >);
  });

  it("calls the recorder with the normalized username", async () => {
    await recordFailedSignIn(UNNORMALIZED_USERNAME);

    expect(rpc).toHaveBeenCalledOnce();
    expect(rpc).toHaveBeenCalledWith(
      SUPABASE_RPC.RECORD_FAILED_SIGN_IN,
      { p_username: DEFAULT_SIGN_IN_CREDENTIALS.username }
    );
  });

  it("throws when the database rejects the call", async () => {
    rpc.mockResolvedValue({ error: RPC_FAILURE });

    await expect(
      recordFailedSignIn(
        DEFAULT_SIGN_IN_CREDENTIALS.username
      )
    ).rejects.toThrow(RPC_FAILURE.message);
  });
});
