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
  STRING,
} from "@/app/constants";
import { PERSONAL_EMAIL_ERROR_COPY } from "../constants/PersonalEmailErrorCopy.constants";
import {
  postForm,
  renderPersonalEmailViewModel,
  typeInto,
} from "./personalEmailFormActions";
import { SAVE_INPUT } from "./personalEmailForm.constants";
import {
  CURRENT_PASSWORD_INVALID_ERROR,
  EDITED_VALUE,
  EMAIL_FIELD_NAME,
  EMAIL_INVALID_ERROR,
  PASSWORD_FIELD_NAME,
} from "./personalEmailHooks.constants";

const serverAction = vi.fn();

const renderTypedForm = () => {
  const hook = renderPersonalEmailViewModel(serverAction);
  typeInto(hook.result, EMAIL_FIELD_NAME, SAVE_INPUT.email);
  typeInto(
    hook.result,
    PASSWORD_FIELD_NAME,
    SAVE_INPUT.currentPassword
  );
  return hook;
};

describe("usePersonalEmailFormViewModel server errors", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("clears only the password after a wrong-password response", async () => {
    serverAction.mockResolvedValue(
      CURRENT_PASSWORD_INVALID_ERROR
    );
    const { result } = renderTypedForm();

    await postForm(result, SAVE_INPUT);

    expect(result.current.values).toEqual({
      currentPassword: STRING.Empty,
      email: SAVE_INPUT.email,
    });
    expect(
      result.current.fieldErrors[
        PERSONAL_EMAIL_FIELD.CURRENT_PASSWORD
      ]
    ).toBe(
      PERSONAL_EMAIL_ERROR_COPY[
        PERSONAL_EMAIL_ERROR_CODE.CURRENT_PASSWORD_INVALID
      ]
    );
  });

  it("keeps both values after an email error and shows it under the email", async () => {
    serverAction.mockResolvedValue(EMAIL_INVALID_ERROR);
    const { result } = renderTypedForm();

    await postForm(result, SAVE_INPUT);

    expect(result.current.values).toEqual({
      currentPassword: SAVE_INPUT.currentPassword,
      email: SAVE_INPUT.email,
    });
    expect(
      result.current.fieldErrors[PERSONAL_EMAIL_FIELD.EMAIL]
    ).toBe(
      PERSONAL_EMAIL_ERROR_COPY[
        PERSONAL_EMAIL_ERROR_CODE.EMAIL_INVALID
      ]
    );
  });

  it("dismisses the server error when a field is edited", async () => {
    serverAction.mockResolvedValue(EMAIL_INVALID_ERROR);
    const { result } = renderTypedForm();
    await postForm(result, SAVE_INPUT);

    typeInto(result, EMAIL_FIELD_NAME, EDITED_VALUE);

    expect(
      result.current.fieldErrors[PERSONAL_EMAIL_FIELD.EMAIL]
    ).toBeNull();
  });
});
