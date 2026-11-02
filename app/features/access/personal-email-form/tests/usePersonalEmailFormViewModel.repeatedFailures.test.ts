import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  PERSONAL_EMAIL_ERROR_CODE,
  PERSONAL_EMAIL_INTENT,
  STRING,
} from "@/app/constants";
import { createPersonalEmailError } from "@/app/utils/personal-email/createPersonalEmailError";
import { attachPersonalEmailInputs } from "./attachPersonalEmailInputs";
import {
  postForm,
  renderPersonalEmailViewModel,
  submitForm,
  typeInto,
} from "./personalEmailFormActions";
import { SAVE_INPUT } from "./personalEmailForm.constants";
import { PASSWORD_FIELD_NAME } from "./personalEmailHooks.constants";

const serverAction = vi.fn();

describe("usePersonalEmailFormViewModel repeated failures", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("clears the password again after a second consecutive wrong-password response", async () => {
    serverAction.mockImplementation(() =>
      Promise.resolve(
        createPersonalEmailError(
          PERSONAL_EMAIL_ERROR_CODE.CURRENT_PASSWORD_INVALID
        )
      )
    );
    const { result } =
      renderPersonalEmailViewModel(serverAction);
    typeInto(
      result,
      PASSWORD_FIELD_NAME,
      SAVE_INPUT.currentPassword
    );
    await postForm(result, SAVE_INPUT);
    typeInto(
      result,
      PASSWORD_FIELD_NAME,
      SAVE_INPUT.currentPassword
    );
    expect(result.current.values.currentPassword).toBe(
      SAVE_INPUT.currentPassword
    );

    await postForm(result, SAVE_INPUT);

    expect(result.current.values.currentPassword).toBe(
      STRING.Empty
    );
  });

  it("focuses the email again on a repeated identical invalid submit", () => {
    const { result } = renderPersonalEmailViewModel(
      serverAction,
      STRING.Empty
    );
    const inputs = attachPersonalEmailInputs(
      result.current.fieldRefs
    );
    submitForm(result, PERSONAL_EMAIL_INTENT.SAVE);
    inputs.currentPassword.focus();

    submitForm(result, PERSONAL_EMAIL_INTENT.SAVE);

    expect(inputs.email).toHaveFocus();
  });
});
