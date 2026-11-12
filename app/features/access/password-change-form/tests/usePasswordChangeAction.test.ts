import { act, renderHook } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import "./firstSignInAction.setup";
import { PASSWORD_CHANGE_FIELD } from "@/app/constants/access/PasswordChangeError.constants";
import { DEFAULT_PASSWORD_CHANGE_INPUT } from "@/app/utils/password-change/tests/passwordChange.constants";
import { submitFirstPasswordChange } from "../actions/submitFirstPasswordChange";
import { usePasswordChangeAction } from "../hooks/usePasswordChangeAction";
import { CURRENT_PASSWORD_INVALID_ERROR } from "./passwordChangeErrors.constants";
import { postDefaultForm } from "./passwordChangeFormActions";

describe("usePasswordChangeAction", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(submitFirstPasswordChange).mockResolvedValue(
      CURRENT_PASSWORD_INVALID_ERROR
    );
  });

  it("starts with no error and nothing pending", () => {
    const { result } = renderHook(() =>
      usePasswordChangeAction(submitFirstPasswordChange)
    );

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
    const { result } = renderHook(() =>
      usePasswordChangeAction(submitFirstPasswordChange)
    );

    await postDefaultForm(result.current.action);

    expect(
      submitFirstPasswordChange
    ).toHaveBeenCalledOnce();
    expect(
      received[0].get(
        PASSWORD_CHANGE_FIELD.CURRENT_PASSWORD
      )
    ).toBe(DEFAULT_PASSWORD_CHANGE_INPUT.currentPassword);
    expect(result.current.error).toBe(
      CURRENT_PASSWORD_INVALID_ERROR
    );
  });

  it("hides the error once it is dismissed", async () => {
    const { result } = renderHook(() =>
      usePasswordChangeAction(submitFirstPasswordChange)
    );
    await postDefaultForm(result.current.action);

    act(() => result.current.dismiss());

    expect(result.current.error).toBeNull();
  });
});
