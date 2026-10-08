import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { redirect } from "next/navigation";
import { FIRST_SIGN_IN_ERROR_CODE } from "@/app/constants";
import { FIRST_SIGN_IN_FIELD } from "@/app/constants/access/FirstSignInError.constants";
import { changeFirstPassword } from "@/app/services/authentication";
import { createFirstSignInError } from "@/app/utils/first-sign-in/createFirstSignInError";
import { DEFAULT_FIRST_PASSWORD_CHANGE_INPUT } from "@/app/utils/first-sign-in/tests/firstSignIn.constants";
import { submitFirstPasswordChange } from "../actions/submitFirstPasswordChange";
import { createFirstSignInFormData } from "./createFirstSignInFormData";
import { UNKNOWN_ERROR } from "./firstSignInErrors.constants";
import {
  DUPLICATED_FIELD_VALUE,
  NON_ERROR_REJECTION,
  OVERSIZED_PASSWORD,
  REDIRECT_SIGNAL_MESSAGE,
} from "./submitFirstPasswordChange.edge.constants";

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

describe("submitFirstPasswordChange edge cases", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(redirect).mockImplementation(() => {
      throw new Error(REDIRECT_SIGNAL_MESSAGE);
    });
  });

  it.each(Object.values(FIRST_SIGN_IN_ERROR_CODE))(
    "returns the %s error exactly as the service reports it",
    async (code) => {
      const error = createFirstSignInError(code);
      vi.mocked(changeFirstPassword).mockResolvedValue({
        ok: false,
        error,
      });

      await expect(submitDefaultForm()).resolves.toEqual(
        error
      );

      expect(redirect).not.toHaveBeenCalled();
    }
  );

  it("turns a rejection that is not an Error into the unknown error", async () => {
    vi.mocked(changeFirstPassword).mockRejectedValue(
      NON_ERROR_REJECTION
    );

    await expect(submitDefaultForm()).resolves.toEqual(
      UNKNOWN_ERROR
    );
  });

  it("reads the first value of a duplicated field", async () => {
    vi.mocked(changeFirstPassword).mockResolvedValue({
      ok: true,
    });
    const formData = createFirstSignInFormData(
      DEFAULT_FIRST_PASSWORD_CHANGE_INPUT
    );
    formData.append(
      FIRST_SIGN_IN_FIELD.NEW_PASSWORD,
      DUPLICATED_FIELD_VALUE
    );

    await expect(
      submitFirstPasswordChange(null, formData)
    ).rejects.toThrow(REDIRECT_SIGNAL_MESSAGE);

    expect(changeFirstPassword).toHaveBeenCalledOnce();
    expect(changeFirstPassword).toHaveBeenCalledWith(
      DEFAULT_FIRST_PASSWORD_CHANGE_INPUT
    );
  });

  it("forwards oversized fields to the service untouched", async () => {
    vi.mocked(changeFirstPassword).mockResolvedValue({
      ok: true,
    });
    const oversizedInput = {
      confirmPassword: OVERSIZED_PASSWORD,
      currentPassword: OVERSIZED_PASSWORD,
      newPassword: OVERSIZED_PASSWORD,
    };

    await expect(
      submitFirstPasswordChange(
        null,
        createFirstSignInFormData(oversizedInput)
      )
    ).rejects.toThrow(REDIRECT_SIGNAL_MESSAGE);

    expect(changeFirstPassword).toHaveBeenCalledOnce();
    expect(changeFirstPassword).toHaveBeenCalledWith(
      oversizedInput
    );
  });

  it("never returns any posted password", async () => {
    vi.mocked(changeFirstPassword).mockResolvedValue({
      ok: false,
      error: createFirstSignInError(
        FIRST_SIGN_IN_ERROR_CODE.CURRENT_PASSWORD_INVALID
      ),
    });

    const serializedState = JSON.stringify(
      await submitDefaultForm()
    );

    Object.values(
      DEFAULT_FIRST_PASSWORD_CHANGE_INPUT
    ).forEach((password) => {
      expect(serializedState).not.toContain(password);
    });
  });
});
