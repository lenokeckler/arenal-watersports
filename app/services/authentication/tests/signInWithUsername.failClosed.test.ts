import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { DEFAULT_SIGN_IN_CREDENTIALS } from "@/app/utils/sign-in/tests/signIn.constants";
import { recordFailedSignIn } from "../recordFailedSignIn";
import { recordSuccessfulSignIn } from "../recordSuccessfulSignIn";
import { signInWithUsername } from "../signInWithUsername";
import { INVALID_CREDENTIALS_ERROR } from "./mapSignInAuthError.constants";
import {
  mockSignInClient,
  signInWithPassword,
  signOut,
} from "./mockSignInClient";
import {
  RPC_FAILURE,
  SIGN_OUT_FAILURE_MESSAGE,
} from "./recordSignIn.constants";

vi.mock(
  "@/app/services/supabase",
  () => import("./mocks/supabaseServices.mock")
);

vi.mock(
  "../recordFailedSignIn",
  () => import("./mocks/recordFailedSignIn.mock")
);

vi.mock(
  "../recordSuccessfulSignIn",
  () => import("./mocks/recordSuccessfulSignIn.mock")
);

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

  it("signs out and rejects when the success cannot be recorded", async () => {
    vi.mocked(recordSuccessfulSignIn).mockRejectedValue(
      new Error(RPC_FAILURE.message)
    );

    await expect(
      signInWithUsername(DEFAULT_SIGN_IN_CREDENTIALS)
    ).rejects.toThrow(RPC_FAILURE.message);
    expect(signOut).toHaveBeenCalledOnce();
  });

  it("still rejects when the sign-out also fails", async () => {
    vi.mocked(recordSuccessfulSignIn).mockRejectedValue(
      new Error(RPC_FAILURE.message)
    );
    signOut.mockRejectedValue(
      new Error(SIGN_OUT_FAILURE_MESSAGE)
    );

    await expect(
      signInWithUsername(DEFAULT_SIGN_IN_CREDENTIALS)
    ).rejects.toThrow();
    expect(signOut).toHaveBeenCalledOnce();
  });

  it("does not sign out when the failure cannot be recorded", async () => {
    signInWithPassword.mockResolvedValue({
      data: { user: null },
      error: INVALID_CREDENTIALS_ERROR,
    });
    vi.mocked(recordFailedSignIn).mockRejectedValue(
      new Error(RPC_FAILURE.message)
    );

    await expect(
      signInWithUsername(DEFAULT_SIGN_IN_CREDENTIALS)
    ).rejects.toThrow();
    expect(signOut).not.toHaveBeenCalled();
  });
});
