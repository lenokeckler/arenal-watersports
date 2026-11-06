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
import { PERSONAL_EMAIL_ERROR_COPY } from "../constants/PersonalEmailErrorCopy.constants";
import { attachPersonalEmailInputs } from "./attachPersonalEmailInputs";
import {
  EMAIL_FIELD_NAME,
  INITIAL_EMAIL,
  PASSWORD_FIELD_NAME,
} from "./personalEmailHooks.constants";
import {
  postForm,
  renderPersonalEmailViewModel,
  submitForm,
  typeInto,
} from "./personalEmailFormActions";
import {
  REMOVE_INPUT,
  SAVE_INPUT,
} from "./personalEmailForm.constants";

const serverAction = vi.fn();

describe("usePersonalEmailFormViewModel submit", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("starts with the current address, an empty password and nothing focused", () => {
    const { result } =
      renderPersonalEmailViewModel(serverAction);

    expect(result.current.values).toEqual({
      currentPassword: STRING.Empty,
      email: INITIAL_EMAIL,
    });
    expect(document.body).toHaveFocus();
  });

  it("treats an implicit submission with an empty email as a blocked save and focuses the email", () => {
    const { result } = renderPersonalEmailViewModel(
      serverAction,
      STRING.Empty
    );
    const inputs = attachPersonalEmailInputs(
      result.current.fieldRefs
    );
    typeInto(
      result,
      PASSWORD_FIELD_NAME,
      SAVE_INPUT.currentPassword
    );

    const event = submitForm(result);

    expect(event.preventDefault).toHaveBeenCalledOnce();
    expect(
      result.current.fieldErrors[PERSONAL_EMAIL_FIELD.EMAIL]
    ).toBe(
      PERSONAL_EMAIL_ERROR_COPY[
        PERSONAL_EMAIL_ERROR_CODE.EMAIL_REQUIRED
      ]
    );
    expect(inputs.email).toHaveFocus();
  });

  it("does not block a remove with an empty email", () => {
    const { result } = renderPersonalEmailViewModel(
      serverAction,
      STRING.Empty
    );
    typeInto(
      result,
      PASSWORD_FIELD_NAME,
      REMOVE_INPUT.currentPassword
    );

    const event = submitForm(
      result,
      PERSONAL_EMAIL_INTENT.REMOVE
    );

    expect(event.preventDefault).not.toHaveBeenCalled();
    expect(
      result.current.fieldErrors[PERSONAL_EMAIL_FIELD.EMAIL]
    ).toBeNull();
  });

  it("does not block a valid save", () => {
    const { result } =
      renderPersonalEmailViewModel(serverAction);
    typeInto(
      result,
      PASSWORD_FIELD_NAME,
      SAVE_INPUT.currentPassword
    );

    const event = submitForm(
      result,
      PERSONAL_EMAIL_INTENT.SAVE
    );

    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  it("prevents a second submit while pending and reports the pressed intent", async () => {
    serverAction.mockReturnValue(
      new Promise(() => undefined)
    );
    const { result } =
      renderPersonalEmailViewModel(serverAction);
    typeInto(
      result,
      PASSWORD_FIELD_NAME,
      REMOVE_INPUT.currentPassword
    );
    submitForm(result, PERSONAL_EMAIL_INTENT.REMOVE);
    await postForm(result, REMOVE_INPUT);

    const event = submitForm(
      result,
      PERSONAL_EMAIL_INTENT.SAVE
    );

    expect(result.current.isPending).toBe(true);
    expect(result.current.pendingIntent).toBe(
      PERSONAL_EMAIL_INTENT.REMOVE
    );
    expect(event.preventDefault).toHaveBeenCalledOnce();
  });

  it("reports no pending intent while idle", () => {
    const { result } =
      renderPersonalEmailViewModel(serverAction);
    typeInto(result, EMAIL_FIELD_NAME, SAVE_INPUT.email);
    submitForm(result, PERSONAL_EMAIL_INTENT.SAVE);

    expect(result.current.pendingIntent).toBeNull();
  });
});
