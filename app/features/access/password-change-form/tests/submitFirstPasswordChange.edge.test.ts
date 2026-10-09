import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { redirect } from "next/navigation";
import { PASSWORD_CHANGE_ERROR_CODE } from "@/app/constants";
import { PASSWORD_CHANGE_FIELD } from "@/app/constants/access/PasswordChangeError.constants";
import { changeFirstPassword } from "@/app/services/authentication";
import { createPasswordChangeError } from "@/app/utils/password-change/createPasswordChangeError";
import { DEFAULT_PASSWORD_CHANGE_INPUT } from "@/app/utils/password-change/tests/passwordChange.constants";
import { submitFirstPasswordChange } from "../actions/submitFirstPasswordChange";
import { createPasswordChangeFormData } from "./createPasswordChangeFormData";
import { UNKNOWN_ERROR } from "./passwordChangeErrors.constants";
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
    createPasswordChangeFormData(
      DEFAULT_PASSWORD_CHANGE_INPUT
    )
  );

describe("submitFirstPasswordChange edge cases", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(redirect).mockImplementation(() => {
      throw new Error(REDIRECT_SIGNAL_MESSAGE);
    });
  });

  it.each(Object.values(PASSWORD_CHANGE_ERROR_CODE))(
    "returns the %s error exactly as the service reports it",
    async (code) => {
      const error = createPasswordChangeError(code);
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
    const formData = createPasswordChangeFormData(
      DEFAULT_PASSWORD_CHANGE_INPUT
    );
    formData.append(
      PASSWORD_CHANGE_FIELD.NEW_PASSWORD,
      DUPLICATED_FIELD_VALUE
    );

    await expect(
      submitFirstPasswordChange(null, formData)
    ).rejects.toThrow(REDIRECT_SIGNAL_MESSAGE);

    expect(changeFirstPassword).toHaveBeenCalledOnce();
    expect(changeFirstPassword).toHaveBeenCalledWith(
      DEFAULT_PASSWORD_CHANGE_INPUT
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
        createPasswordChangeFormData(oversizedInput)
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
      error: createPasswordChangeError(
        PASSWORD_CHANGE_ERROR_CODE.CURRENT_PASSWORD_INVALID
      ),
    });

    const serializedState = JSON.stringify(
      await submitDefaultForm()
    );

    Object.values(DEFAULT_PASSWORD_CHANGE_INPUT).forEach(
      (password) => {
        expect(serializedState).not.toContain(password);
      }
    );
  });
});
