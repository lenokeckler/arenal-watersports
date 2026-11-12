import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { redirect } from "next/navigation";
import { changeOwnPersonalEmail } from "@/app/services/authentication";
import { createPersonalEmailError } from "@/app/utils/personal-email/createPersonalEmailError";
import { submitPersonalEmail } from "../actions/submitPersonalEmail";
import { createPersonalEmailFormData } from "./createPersonalEmailFormData";
import { SAVE_INPUT } from "./personalEmailForm.constants";
import { REDIRECT_SIGNAL_MESSAGE } from "@/app/utils/server-action/tests/redirectSignal.constants";
import { BLOCKED_LOGIN_CASES } from "@/app/utils/server-action/tests/redirectWhenSignInBlocked.constants";
import { UNKNOWN_ERROR } from "./personalEmailErrors.constants";
import {
  RETURNED_ERROR_CODES,
  SERVICE_FAILURE_MESSAGE,
  SUCCESS_CASES,
} from "./submitPersonalEmail.constants";

vi.mock("@/app/services/authentication", () => ({
  changeOwnPersonalEmail: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

const submitDefaultForm = () =>
  submitPersonalEmail(
    null,
    createPersonalEmailFormData(SAVE_INPUT)
  );

describe("submitPersonalEmail", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(redirect).mockImplementation(() => {
      throw new Error(REDIRECT_SIGNAL_MESSAGE);
    });
  });

  it.each(SUCCESS_CASES)(
    "changes the email with the posted fields and redirects to the profile notice",
    async (input, intent, target) => {
      vi.mocked(changeOwnPersonalEmail).mockResolvedValue({
        ok: true,
        intent,
      });

      await expect(
        submitPersonalEmail(
          null,
          createPersonalEmailFormData(input)
        )
      ).rejects.toThrow(REDIRECT_SIGNAL_MESSAGE);

      expect(changeOwnPersonalEmail).toHaveBeenCalledOnce();
      expect(changeOwnPersonalEmail).toHaveBeenCalledWith(
        input
      );
      expect(redirect).toHaveBeenCalledOnce();
      expect(redirect).toHaveBeenCalledWith(target);
    }
  );

  it.each(BLOCKED_LOGIN_CASES)(
    "redirects to the login notice when the error is %s",
    async (code, target) => {
      vi.mocked(changeOwnPersonalEmail).mockResolvedValue({
        ok: false,
        error: createPersonalEmailError(code),
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
      const error = createPersonalEmailError(code);
      vi.mocked(changeOwnPersonalEmail).mockResolvedValue({
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
    vi.mocked(changeOwnPersonalEmail).mockRejectedValue(
      new Error(SERVICE_FAILURE_MESSAGE)
    );

    await expect(submitDefaultForm()).resolves.toEqual(
      UNKNOWN_ERROR
    );

    expect(redirect).not.toHaveBeenCalled();
  });
});
