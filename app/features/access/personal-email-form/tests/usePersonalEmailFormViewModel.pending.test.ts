import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  PERSONAL_EMAIL_ERROR_CODE,
  PERSONAL_EMAIL_FIELD,
  PERSONAL_EMAIL_INTENT,
  STRING,
} from "@/app/constants";
import { createPersonalEmailError } from "@/app/utils/personal-email/createPersonalEmailError";
import { PERSONAL_EMAIL_ERROR_COPY } from "../constants/PersonalEmailErrorCopy.constants";
import { attachPersonalEmailInputs } from "./attachPersonalEmailInputs";
import {
  postForm,
  renderPersonalEmailViewModel,
  submitForm,
  typeInto,
} from "./personalEmailFormActions";
import { SAVE_INPUT } from "./personalEmailForm.constants";
import {
  INITIAL_EMAIL,
  PASSWORD_FIELD_NAME,
} from "./personalEmailHooks.constants";

const serverAction = vi.fn();

describe("usePersonalEmailFormViewModel focus, intent and pending", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("focuses the password after a wrong-password response", async () => {
    serverAction.mockResolvedValue(
      createPersonalEmailError(
        PERSONAL_EMAIL_ERROR_CODE.CURRENT_PASSWORD_INVALID
      )
    );
    const { result } =
      renderPersonalEmailViewModel(serverAction);
    const inputs = attachPersonalEmailInputs(
      result.current.fieldRefs
    );

    await postForm(result, SAVE_INPUT);

    expect(inputs.currentPassword).toHaveFocus();
  });

  it("checks only the password of a remove without one", () => {
    const { result } = renderPersonalEmailViewModel(
      serverAction,
      STRING.Empty
    );
    const inputs = attachPersonalEmailInputs(
      result.current.fieldRefs
    );

    const event = submitForm(
      result,
      PERSONAL_EMAIL_INTENT.REMOVE
    );

    expect(event.preventDefault).toHaveBeenCalledOnce();
    expect(
      result.current.fieldErrors[PERSONAL_EMAIL_FIELD.EMAIL]
    ).toBeNull();
    expect(
      result.current.fieldErrors[
        PERSONAL_EMAIL_FIELD.CURRENT_PASSWORD
      ]
    ).toBe(
      PERSONAL_EMAIL_ERROR_COPY[
        PERSONAL_EMAIL_ERROR_CODE.CURRENT_PASSWORD_REQUIRED
      ]
    );
    expect(inputs.currentPassword).toHaveFocus();
  });

  it("keeps both values while the submission is pending", async () => {
    serverAction.mockReturnValue(
      new Promise(() => undefined)
    );
    const { result } =
      renderPersonalEmailViewModel(serverAction);
    typeInto(
      result,
      PASSWORD_FIELD_NAME,
      SAVE_INPUT.currentPassword
    );

    await postForm(result, SAVE_INPUT);

    expect(result.current.isPending).toBe(true);
    expect(result.current.values).toEqual({
      currentPassword: SAVE_INPUT.currentPassword,
      email: INITIAL_EMAIL,
    });
  });
});
