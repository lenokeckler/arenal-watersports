import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import { signInWithUsername } from "@/app/services/authentication";
import { DEFAULT_SIGN_IN_CREDENTIALS } from "@/app/utils/sign-in/tests/signIn.constants";
import { submitSignIn } from "../actions/submitSignIn";
import {
  INVALID_CREDENTIALS_ERROR,
  REDIRECT_SIGNAL_MESSAGE,
  SERVICE_FAILURE_MESSAGE,
  UNKNOWN_ERROR,
  WRONG_PASSWORD_CREDENTIALS,
} from "./submitSignIn.constants";

vi.mock("@/app/services/authentication", () => ({
  signInWithUsername: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

describe("submitSignIn", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(redirect).mockImplementation(() => {
      throw new Error(REDIRECT_SIGNAL_MESSAGE);
    });
  });

  it("redirects home after a successful sign-in", async () => {
    vi.mocked(signInWithUsername).mockResolvedValue({
      ok: true,
    });

    await expect(
      submitSignIn(DEFAULT_SIGN_IN_CREDENTIALS)
    ).rejects.toThrow(REDIRECT_SIGNAL_MESSAGE);

    expect(signInWithUsername).toHaveBeenCalledWith(
      DEFAULT_SIGN_IN_CREDENTIALS
    );
    expect(redirect).toHaveBeenCalledWith(PATHS.HOME);
  });

  it("returns the service error without redirecting", async () => {
    vi.mocked(signInWithUsername).mockResolvedValue({
      ok: false,
      error: INVALID_CREDENTIALS_ERROR,
    });

    await expect(
      submitSignIn(WRONG_PASSWORD_CREDENTIALS)
    ).resolves.toEqual(INVALID_CREDENTIALS_ERROR);

    expect(redirect).not.toHaveBeenCalled();
  });

  it("turns a thrown error into the unknown error", async () => {
    vi.mocked(signInWithUsername).mockRejectedValue(
      new Error(SERVICE_FAILURE_MESSAGE)
    );

    await expect(
      submitSignIn(DEFAULT_SIGN_IN_CREDENTIALS)
    ).resolves.toEqual(UNKNOWN_ERROR);

    expect(redirect).not.toHaveBeenCalled();
  });
});
