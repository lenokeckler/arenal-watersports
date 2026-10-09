import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import "./firstSignInAction.setup";
import { PASSWORD_CHANGE_FIELD } from "@/app/constants/access/PasswordChangeError.constants";
import { usePasswordChangeFormViewModel } from "../hooks/usePasswordChangeFormViewModel";
import { createPasswordChangeSharedFieldProps } from "../utils/createPasswordChangeSharedFieldProps";
import { typeInto } from "./passwordChangeFormActions";
import { EDITED_VALUE } from "./passwordChangeHooks.constants";

describe("createPasswordChangeSharedFieldProps", () => {
  it("picks the error, ref and value of the requested field", () => {
    const { result } = renderHook(
      usePasswordChangeFormViewModel
    );
    typeInto(
      result,
      PASSWORD_CHANGE_FIELD.NEW_PASSWORD,
      EDITED_VALUE
    );

    const props = createPasswordChangeSharedFieldProps(
      result.current,
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
    const { result } = renderHook(
      usePasswordChangeFormViewModel
    );

    const props = createPasswordChangeSharedFieldProps(
      result.current,
      PASSWORD_CHANGE_FIELD.CONFIRM_PASSWORD
    );

    expect(props.isPending).toBe(result.current.isPending);
    expect(props.onChange).toBe(result.current.onChange);
  });
});
