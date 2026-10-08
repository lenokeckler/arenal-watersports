import { act, renderHook } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import "./firstSignInAction.setup";
import { FIRST_SIGN_IN_FIELD } from "@/app/constants/access/FirstSignInError.constants";
import { DEFAULT_FIRST_PASSWORD_CHANGE_INPUT } from "@/app/utils/first-sign-in/tests/firstSignIn.constants";
import { submitFirstPasswordChange } from "../actions/submitFirstPasswordChange";
import { useFirstSignInAction } from "../hooks/useFirstSignInAction";
import { createFirstSignInFormData } from "./createFirstSignInFormData";
import { CURRENT_PASSWORD_INVALID_ERROR } from "./firstSignInErrors.constants";

const postDefaultForm = async (
  action: (formData: FormData) => void
): Promise<void> => {
  await act(() =>
    Promise.resolve(
      action(
        createFirstSignInFormData(
          DEFAULT_FIRST_PASSWORD_CHANGE_INPUT
        )
      )
    )
  );
};

describe("useFirstSignInAction", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(submitFirstPasswordChange).mockResolvedValue(
      CURRENT_PASSWORD_INVALID_ERROR
    );
  });

  it("starts with no error and nothing pending", () => {
    const { result } = renderHook(useFirstSignInAction);

    expect(result.current.error).toBeNull();
    expect(result.current.isPending).toBe(false);
  });

  it("hands the posted form to the server action and exposes its error", async () => {
    const received: FormData[] = [];
    vi.mocked(submitFirstPasswordChange).mockImplementation(
      (_previousError, formData) => {
        received.push(formData);
        return Promise.resolve(
          CURRENT_PASSWORD_INVALID_ERROR
        );
      }
    );
    const { result } = renderHook(useFirstSignInAction);

    await postDefaultForm(result.current.action);

    expect(
      submitFirstPasswordChange
    ).toHaveBeenCalledOnce();
    expect(
      received[0].get(FIRST_SIGN_IN_FIELD.CURRENT_PASSWORD)
    ).toBe(
      DEFAULT_FIRST_PASSWORD_CHANGE_INPUT.currentPassword
    );
    expect(result.current.error).toBe(
      CURRENT_PASSWORD_INVALID_ERROR
    );
  });

  it("hides the error once it is dismissed", async () => {
    const { result } = renderHook(useFirstSignInAction);
    await postDefaultForm(result.current.action);

    act(() => result.current.dismiss());

    expect(result.current.error).toBeNull();
  });
});
