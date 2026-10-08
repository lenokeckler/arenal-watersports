import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import { changeFirstPassword } from "@/app/services/authentication";
import { DEFAULT_FIRST_PASSWORD_CHANGE_INPUT } from "@/app/utils/first-sign-in/tests/firstSignIn.constants";
import { submitFirstPasswordChange } from "../actions/submitFirstPasswordChange";
import { createFirstSignInFormData } from "./createFirstSignInFormData";
import {
  CURRENT_PASSWORD_INVALID_ERROR,
  UNKNOWN_ERROR,
} from "./firstSignInErrors.constants";
import {
  REDIRECT_SIGNAL_MESSAGE,
  SERVICE_FAILURE_MESSAGE,
} from "./submitFirstPasswordChange.constants";

vi.mock("@/app/services/authentication", () => ({
  changeFirstPassword: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

const submitDefaultForm = () =>
  submitFirstPasswordChange(
    null,
    createFirstSignInFormData(
      DEFAULT_FIRST_PASSWORD_CHANGE_INPUT
    )
  );

describe("submitFirstPasswordChange", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(redirect).mockImplementation(() => {
      throw new Error(REDIRECT_SIGNAL_MESSAGE);
    });
  });

  it("changes the password with the posted fields and redirects home", async () => {
    vi.mocked(changeFirstPassword).mockResolvedValue({
      ok: true,
    });

    await expect(submitDefaultForm()).rejects.toThrow(
      REDIRECT_SIGNAL_MESSAGE
    );

    expect(changeFirstPassword).toHaveBeenCalledOnce();
    expect(changeFirstPassword).toHaveBeenCalledWith(
      DEFAULT_FIRST_PASSWORD_CHANGE_INPUT
    );
    expect(redirect).toHaveBeenCalledOnce();
    expect(redirect).toHaveBeenCalledWith(PATHS.HOME);
  });

  it("returns the service error without redirecting", async () => {
    vi.mocked(changeFirstPassword).mockResolvedValue({
      ok: false,
      error: CURRENT_PASSWORD_INVALID_ERROR,
    });

    await expect(submitDefaultForm()).resolves.toEqual(
      CURRENT_PASSWORD_INVALID_ERROR
    );

    expect(redirect).not.toHaveBeenCalled();
  });

  it("turns a thrown error into the unknown error", async () => {
    vi.mocked(changeFirstPassword).mockRejectedValue(
      new Error(SERVICE_FAILURE_MESSAGE)
    );

    await expect(submitDefaultForm()).resolves.toEqual(
      UNKNOWN_ERROR
    );

    expect(redirect).not.toHaveBeenCalled();
  });
});
