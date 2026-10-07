import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { createServerSupabaseClient } from "@/app/services/supabase";
import {
  BLANK_USERNAME,
  DEFAULT_SIGN_IN_CREDENTIALS,
} from "@/app/utils/sign-in/tests/signIn.constants";
import { recordFailedSignIn } from "../recordFailedSignIn";
import { recordSuccessfulSignIn } from "../recordSuccessfulSignIn";
import { signInWithUsername } from "../signInWithUsername";
import { INVALID_CREDENTIALS_ERROR } from "./mapSignInAuthError.constants";
import {
  mockSignInClient,
  signInWithPassword,
} from "./mockSignInClient";
import { RPC_FAILURE } from "./recordSignIn.constants";

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));

vi.mock("../recordFailedSignIn", () => ({
  recordFailedSignIn: vi.fn(),
}));

vi.mock("../recordSuccessfulSignIn", () => ({
  recordSuccessfulSignIn: vi.fn(),
}));

describe("signInWithUsername fail closed", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockSignInClient();
  });

  it("rejects when the failure cannot be recorded", async () => {
    signInWithPassword.mockResolvedValue({
      data: { user: null },
      error: INVALID_CREDENTIALS_ERROR,
    });
    vi.mocked(recordFailedSignIn).mockRejectedValue(
      new Error(RPC_FAILURE.message)
    );

    await expect(
      signInWithUsername(DEFAULT_SIGN_IN_CREDENTIALS)
    ).rejects.toThrow(RPC_FAILURE.message);
  });

  it("rejects when the success cannot be recorded", async () => {
    vi.mocked(recordSuccessfulSignIn).mockRejectedValue(
      new Error(RPC_FAILURE.message)
    );

    await expect(
      signInWithUsername(DEFAULT_SIGN_IN_CREDENTIALS)
    ).rejects.toThrow(RPC_FAILURE.message);
  });

  it("never reaches Supabase on invalid input", async () => {
    await signInWithUsername({
      ...DEFAULT_SIGN_IN_CREDENTIALS,
      username: BLANK_USERNAME,
    });

    expect(
      createServerSupabaseClient
    ).not.toHaveBeenCalled();
    expect(recordFailedSignIn).not.toHaveBeenCalled();
  });
});
