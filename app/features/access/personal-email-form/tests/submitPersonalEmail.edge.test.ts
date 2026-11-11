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
import { REDIRECT_SIGNAL_MESSAGE } from "@/app/utils/server-action/tests/redirectSignal.constants";
import { submitPersonalEmail } from "../actions/submitPersonalEmail";
import { createPersonalEmailFormData } from "./createPersonalEmailFormData";
import { UNKNOWN_ERROR } from "./personalEmailErrors.constants";
import {
  FORGED_IDENTITY_FIELD,
  FORGED_IDENTITY_VALUE,
  SAVE_INPUT,
} from "./personalEmailForm.constants";

vi.mock("@/app/services/authentication", () => ({
  changeOwnPersonalEmail: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

describe("submitPersonalEmail edges", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(redirect).mockImplementation(() => {
      throw new Error(REDIRECT_SIGNAL_MESSAGE);
    });
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
