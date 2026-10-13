import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { unstable_rethrow } from "next/navigation";
import { SIGN_IN_ERROR_CODE } from "@/app/constants";
import { createSignInError } from "@/app/utils/sign-in/createSignInError";
import { DEFAULT_SIGN_IN_CREDENTIALS } from "@/app/utils/sign-in/tests/signIn.constants";
import { submitSignIn } from "../actions/submitSignIn";
import { requestSignIn } from "../utils/requestSignIn";
import {
  INVALID_CREDENTIALS_ERROR,
  REDIRECT_SIGNAL_MESSAGE,
} from "./submitSignIn.constants";
import { NETWORK_FAILURE_MESSAGE } from "./useLoginFormViewModel.constants";

vi.mock("../actions/submitSignIn", () => ({
  submitSignIn: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  unstable_rethrow: vi.fn(),
}));

describe("requestSignIn", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("returns the error of the sign-in action", async () => {
    vi.mocked(submitSignIn).mockResolvedValue(
      INVALID_CREDENTIALS_ERROR
    );

    await expect(
      requestSignIn(DEFAULT_SIGN_IN_CREDENTIALS)
    ).resolves.toEqual(INVALID_CREDENTIALS_ERROR);
  });

  it("turns a failed request into the network error", async () => {
    const failure = new Error(NETWORK_FAILURE_MESSAGE);
    vi.mocked(submitSignIn).mockRejectedValue(failure);

    await expect(
      requestSignIn(DEFAULT_SIGN_IN_CREDENTIALS)
    ).resolves.toEqual(
      createSignInError(SIGN_IN_ERROR_CODE.NETWORK)
    );
    expect(unstable_rethrow).toHaveBeenCalledWith(failure);
  });

  it("lets a redirect through instead of turning it into an error", async () => {
    const redirectSignal = new Error(
      REDIRECT_SIGNAL_MESSAGE
    );
    vi.mocked(submitSignIn).mockRejectedValue(
      redirectSignal
    );
    vi.mocked(unstable_rethrow).mockImplementation(
      (error: unknown) => {
        throw error;
      }
    );

    await expect(
      requestSignIn(DEFAULT_SIGN_IN_CREDENTIALS)
    ).rejects.toBe(redirectSignal);
  });
});
