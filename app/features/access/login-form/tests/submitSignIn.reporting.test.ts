import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { redirect } from "next/navigation";
import { signInWithUsername } from "@/app/services/authentication";
import { reportServerError } from "@/app/services/observability";
import { DEFAULT_SIGN_IN_CREDENTIALS } from "@/app/utils/sign-in/tests/signIn.constants";
import { submitSignIn } from "../actions/submitSignIn";
import {
  REDIRECT_SIGNAL_MESSAGE,
  REPORTER_FAILURE_MESSAGE,
  SERVICE_FAILURE_MESSAGE,
  UNKNOWN_ERROR,
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

describe("submitSignIn reporting", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(redirect).mockImplementation(() => {
      throw new Error(REDIRECT_SIGNAL_MESSAGE);
    });
  });

  it("still answers unknown when the reporter throws", async () => {
    vi.mocked(signInWithUsername).mockRejectedValue(
      new Error(SERVICE_FAILURE_MESSAGE)
    );
    vi.mocked(reportServerError).mockImplementation(() => {
      throw new Error(REPORTER_FAILURE_MESSAGE);
    });

    await expect(
      submitSignIn(DEFAULT_SIGN_IN_CREDENTIALS)
    ).resolves.toEqual(UNKNOWN_ERROR);
  });

  it("does not report the redirect signal after a successful sign-in", async () => {
    vi.mocked(signInWithUsername).mockResolvedValue({
      ok: true,
    });

    await expect(
      submitSignIn(DEFAULT_SIGN_IN_CREDENTIALS)
    ).rejects.toThrow(REDIRECT_SIGNAL_MESSAGE);

    expect(reportServerError).not.toHaveBeenCalled();
  });
});
