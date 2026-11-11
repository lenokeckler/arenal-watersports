import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { SESSION_CLAIM } from "@/app/constants";
import { DEFAULT_SIGN_IN_CREDENTIALS } from "@/app/utils/sign-in/tests/signIn.constants";
import { signInWithUsername } from "../signInWithUsername";
import { NETWORK_ERROR } from "./mapSignInAuthError.constants";
import {
  getClaims,
  mockSignInClient,
} from "./mockSignInClient";

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

const claimsWith = (claim: unknown) => ({
  data: {
    claims: { [SESSION_CLAIM.MUST_CHANGE_PASSWORD]: claim },
  },
  error: null,
});

describe("signInWithUsername password change claim", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockSignInClient();
  });

  it.each([
    [true, true],
    [false, false],
    [undefined, false],
    ["true", false],
    [1, false],
  ])(
    "reads the claim %j as %s",
    async (claim, mustChangePassword) => {
      getClaims.mockResolvedValue(claimsWith(claim));

      await expect(
        signInWithUsername(DEFAULT_SIGN_IN_CREDENTIALS)
      ).resolves.toEqual({ ok: true, mustChangePassword });
    }
  );

  it.each([
    [{ data: null, error: NETWORK_ERROR }],
    [{ data: null, error: null }],
  ])(
    "reads a missing or failed verification as no pending change",
    async (verification) => {
      getClaims.mockResolvedValue(verification);

      await expect(
        signInWithUsername(DEFAULT_SIGN_IN_CREDENTIALS)
      ).resolves.toEqual({
        ok: true,
        mustChangePassword: false,
      });
    }
  );
});
