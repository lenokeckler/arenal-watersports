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
import { signInWithUsername } from "../signInWithUsername";
import { INVALID_CREDENTIALS_ERROR } from "./mapSignInAuthError.constants";
import {
  mockSignInClient,
  signInWithPassword,
  signOut,
} from "./mockSignInClient";
import {
  OTHER_USERNAME,
  RPC_FAILURE,
  SIGNED_IN_USER_ID,
} from "./recordSignIn.constants";

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
  createServiceRoleSupabaseClient: vi.fn(),
}));

const rpc = vi.fn();

describe("signInWithUsername recorder calls", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockSignInClient();
    rpc.mockResolvedValue({ error: null });
    vi.mocked(
      createServiceRoleSupabaseClient
    ).mockReturnValue({ rpc } as unknown as ReturnType<
      typeof createServiceRoleSupabaseClient
    >);
  });

  it("records the failure under the normalized username", async () => {
    signInWithPassword.mockResolvedValue({
      data: { user: null },
      error: INVALID_CREDENTIALS_ERROR,
    });

    await signInWithUsername({
      ...DEFAULT_SIGN_IN_CREDENTIALS,
      username: UNNORMALIZED_USERNAME,
    });

    expect(rpc).toHaveBeenCalledOnce();
    expect(rpc).toHaveBeenCalledWith(
      SUPABASE_RPC.RECORD_FAILED_SIGN_IN,
      { p_username: DEFAULT_SIGN_IN_CREDENTIALS.username }
    );
  });

  it("makes the same recorder call for a known and an unknown username", async () => {
    signInWithPassword.mockResolvedValue({
      data: { user: null },
      error: INVALID_CREDENTIALS_ERROR,
    });
    const recorderArguments: unknown[][] = [];
    rpc.mockImplementation((...args: unknown[]) => {
      recorderArguments.push(args);
      return Promise.resolve({ error: null });
    });

    await signInWithUsername(DEFAULT_SIGN_IN_CREDENTIALS);
    await signInWithUsername({
      ...DEFAULT_SIGN_IN_CREDENTIALS,
      username: OTHER_USERNAME,
    });

    expect(recorderArguments).toEqual([
      [
        SUPABASE_RPC.RECORD_FAILED_SIGN_IN,
        {
          p_username: DEFAULT_SIGN_IN_CREDENTIALS.username,
        },
      ],
      [
        SUPABASE_RPC.RECORD_FAILED_SIGN_IN,
        { p_username: OTHER_USERNAME },
      ],
    ]);
  });

  it("records the success under the signed-in user id only", async () => {
    await signInWithUsername(DEFAULT_SIGN_IN_CREDENTIALS);

    expect(rpc).toHaveBeenCalledOnce();
    expect(rpc).toHaveBeenCalledWith(
      SUPABASE_RPC.RECORD_SUCCESSFUL_SIGN_IN,
      { p_user_id: SIGNED_IN_USER_ID }
    );
  });

  it("signs out when the database rejects the success record", async () => {
    rpc.mockResolvedValue({ error: RPC_FAILURE });

    await expect(
      signInWithUsername(DEFAULT_SIGN_IN_CREDENTIALS)
    ).rejects.toThrow(RPC_FAILURE.message);
    expect(signOut).toHaveBeenCalledOnce();
  });
});
