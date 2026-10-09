import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { redirect } from "next/navigation";
import { changeOwnPassword } from "@/app/services/authentication";
import { createPasswordChangeError } from "@/app/utils/password-change/createPasswordChangeError";
import { DEFAULT_PASSWORD_CHANGE_INPUT } from "@/app/utils/password-change/tests/passwordChange.constants";
import { submitOwnPasswordChange } from "../actions/submitOwnPasswordChange";
import { createPasswordChangeFormData } from "./createPasswordChangeFormData";
import { UNKNOWN_ERROR } from "./passwordChangeErrors.constants";
import {
  BLOCKED_CASES,
  FORGED_USERNAME_FIELD,
  FORGED_USERNAME_VALUE,
  PASSWORD_CHANGED_TARGET,
  REDIRECT_SIGNAL_MESSAGE,
  RETURNED_ERROR_CODES,
  SERVICE_FAILURE_MESSAGE,
} from "./submitOwnPasswordChange.constants";

vi.mock("@/app/services/authentication", () => ({
  changeOwnPassword: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

const submitDefaultForm = () =>
  submitOwnPasswordChange(
    null,
    createPasswordChangeFormData(
      DEFAULT_PASSWORD_CHANGE_INPUT
    )
  );

describe("submitOwnPasswordChange", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(redirect).mockImplementation(() => {
      throw new Error(REDIRECT_SIGNAL_MESSAGE);
    });
  });

  it("changes the password with the posted fields and redirects to the profile notice", async () => {
    vi.mocked(changeOwnPassword).mockResolvedValue({
      ok: true,
    });

    await expect(submitDefaultForm()).rejects.toThrow(
      REDIRECT_SIGNAL_MESSAGE
    );

    expect(changeOwnPassword).toHaveBeenCalledOnce();
    expect(changeOwnPassword).toHaveBeenCalledWith(
      DEFAULT_PASSWORD_CHANGE_INPUT
    );
    expect(redirect).toHaveBeenCalledOnce();
    expect(redirect).toHaveBeenCalledWith(
      PASSWORD_CHANGED_TARGET
    );
  });

  it.each(BLOCKED_CASES)(
    "redirects to the login notice when the error is %s",
    async (code, target) => {
      vi.mocked(changeOwnPassword).mockResolvedValue({
        ok: false,
        error: createPasswordChangeError(code),
      });

      await expect(submitDefaultForm()).rejects.toThrow(
        REDIRECT_SIGNAL_MESSAGE
      );

      expect(redirect).toHaveBeenCalledOnce();
      expect(redirect).toHaveBeenCalledWith(target);
    }
  );

  it.each(RETURNED_ERROR_CODES)(
    "returns the %s error to the form without redirecting",
    async (code) => {
      const error = createPasswordChangeError(code);
      vi.mocked(changeOwnPassword).mockResolvedValue({
        ok: false,
        error,
      });

      await expect(submitDefaultForm()).resolves.toEqual(
        error
      );

      expect(redirect).not.toHaveBeenCalled();
    }
  );

  it("turns a thrown error into the unknown error", async () => {
    vi.mocked(changeOwnPassword).mockRejectedValue(
      new Error(SERVICE_FAILURE_MESSAGE)
    );

    await expect(submitDefaultForm()).resolves.toEqual(
      UNKNOWN_ERROR
    );

    expect(redirect).not.toHaveBeenCalled();
  });

  it("ignores any identity posted with the form", async () => {
    vi.mocked(changeOwnPassword).mockResolvedValue({
      ok: true,
    });
    const formData = createPasswordChangeFormData(
      DEFAULT_PASSWORD_CHANGE_INPUT
    );
    formData.set(
      FORGED_USERNAME_FIELD,
      FORGED_USERNAME_VALUE
    );

    await expect(
      submitOwnPasswordChange(null, formData)
    ).rejects.toThrow(REDIRECT_SIGNAL_MESSAGE);

    expect(changeOwnPassword).toHaveBeenCalledOnce();
    expect(changeOwnPassword).toHaveBeenCalledWith(
      DEFAULT_PASSWORD_CHANGE_INPUT
    );
  });
});
