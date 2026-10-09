import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { redirect } from "next/navigation";
import {
  PERSONAL_EMAIL_ERROR_CODE,
  PERSONAL_EMAIL_INTENT,
} from "@/app/constants";
import { changeOwnPersonalEmail } from "@/app/services/authentication";
import { createPersonalEmailError } from "@/app/utils/personal-email/createPersonalEmailError";
import { submitPersonalEmail } from "../actions/submitPersonalEmail";
import { createPersonalEmailFormData } from "./createPersonalEmailFormData";
import {
  FORGED_IDENTITY_FIELD,
  FORGED_IDENTITY_VALUE,
  SAVE_INPUT,
} from "./personalEmailForm.constants";
import {
  BLOCKED_CASES,
  REDIRECT_SIGNAL_MESSAGE,
  RETURNED_ERROR_CODES,
  SERVICE_FAILURE_MESSAGE,
  SUCCESS_CASES,
  UNKNOWN_ERROR,
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

  it.each(BLOCKED_CASES)(
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

  it("ignores any identity posted with the form", async () => {
    vi.mocked(changeOwnPersonalEmail).mockResolvedValue({
      ok: true,
      intent: PERSONAL_EMAIL_INTENT.SAVE,
    });
    const formData =
      createPersonalEmailFormData(SAVE_INPUT);
    formData.set(
      FORGED_IDENTITY_FIELD,
      FORGED_IDENTITY_VALUE
    );

    await expect(
      submitPersonalEmail(null, formData)
    ).rejects.toThrow(REDIRECT_SIGNAL_MESSAGE);

    expect(changeOwnPersonalEmail).toHaveBeenCalledOnce();
    expect(changeOwnPersonalEmail).toHaveBeenCalledWith(
      SAVE_INPUT
    );
  });

  it("ignores the previous error", async () => {
    const error = createPersonalEmailError(
      PERSONAL_EMAIL_ERROR_CODE.NETWORK
    );
    vi.mocked(changeOwnPersonalEmail).mockResolvedValue({
      ok: false,
      error: UNKNOWN_ERROR,
    });

    await expect(
      submitPersonalEmail(
        error,
        createPersonalEmailFormData(SAVE_INPUT)
      )
    ).resolves.toEqual(UNKNOWN_ERROR);
  });
});
