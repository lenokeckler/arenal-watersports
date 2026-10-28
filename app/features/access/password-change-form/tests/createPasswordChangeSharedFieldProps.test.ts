import { describe, expect, it } from "vitest";
import "./firstSignInAction.setup";
import { renderPasswordChangeViewModel } from "./renderPasswordChangeViewModel";
import { PASSWORD_CHANGE_FIELD } from "@/app/constants/access/PasswordChangeError.constants";
import { createPasswordChangeSharedFieldProps } from "../utils/createPasswordChangeSharedFieldProps";
import { FIRST_SIGN_IN_FORM_COPY } from "../constants/FirstSignInFormCopy.constants";
import { typeInto } from "./passwordChangeFormActions";
import { EDITED_VALUE } from "./passwordChangeHooks.constants";

describe("createPasswordChangeSharedFieldProps", () => {
  it("picks the error, ref and value of the requested field", () => {
    const { result } = renderPasswordChangeViewModel();
    typeInto(
      result,
      PASSWORD_CHANGE_FIELD.NEW_PASSWORD,
      EDITED_VALUE
    );

    const props = createPasswordChangeSharedFieldProps(
      { ...result.current, copy: FIRST_SIGN_IN_FORM_COPY },
      PASSWORD_CHANGE_FIELD.NEW_PASSWORD
    );

    expect(props.value).toBe(EDITED_VALUE);
    expect(props.error).toBe(
      result.current.fieldErrors[
        PASSWORD_CHANGE_FIELD.NEW_PASSWORD
      ]
    );
    expect(props.inputRef).toBe(
      result.current.fieldRefs[
        PASSWORD_CHANGE_FIELD.NEW_PASSWORD
      ]
    );
  });

  it("shares the pending flag and change handler across fields", () => {
    const { result } = renderPasswordChangeViewModel();

    const props = createPasswordChangeSharedFieldProps(
      { ...result.current, copy: FIRST_SIGN_IN_FORM_COPY },
      PASSWORD_CHANGE_FIELD.CONFIRM_PASSWORD
    );

    expect(props.isPending).toBe(result.current.isPending);
    expect(props.onChange).toBe(result.current.onChange);
  });

  it("takes the placeholder from the copy it receives", () => {
    const { result } = renderPasswordChangeViewModel();

    const props = createPasswordChangeSharedFieldProps(
      { ...result.current, copy: FIRST_SIGN_IN_FORM_COPY },
      PASSWORD_CHANGE_FIELD.CURRENT_PASSWORD
    );

    expect(props.placeholder).toBe(
      FIRST_SIGN_IN_FORM_COPY.PASSWORD_PLACEHOLDER
    );
  });
});
