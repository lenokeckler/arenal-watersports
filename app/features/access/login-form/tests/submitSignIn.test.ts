import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { redirect } from "next/navigation";
import { PATHS, SERVER_OPERATION } from "@/app/constants";
import { signInWithUsername } from "@/app/services/authentication";
import { reportServerError } from "@/app/services/observability";
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

vi.mock("@/app/services/observability", () => ({
  reportServerError: vi.fn(),
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

  it("reports a thrown error once under the sign-in operation", async () => {
    const failure = new Error(SERVICE_FAILURE_MESSAGE);
    vi.mocked(signInWithUsername).mockRejectedValue(
      failure
    );

    await submitSignIn(DEFAULT_SIGN_IN_CREDENTIALS);

    expect(reportServerError).toHaveBeenCalledOnce();
    expect(reportServerError).toHaveBeenCalledWith(
      SERVER_OPERATION.SIGN_IN,
      failure
    );
  });

  it("reports nothing when the service answers normally", async () => {
    vi.mocked(signInWithUsername).mockResolvedValue({
      ok: false,
      error: INVALID_CREDENTIALS_ERROR,
    });

    await submitSignIn(WRONG_PASSWORD_CREDENTIALS);

    expect(reportServerError).not.toHaveBeenCalled();
  });
});
