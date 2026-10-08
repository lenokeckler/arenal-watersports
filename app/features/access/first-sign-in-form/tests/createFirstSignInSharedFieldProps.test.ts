import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import "./firstSignInAction.setup";
import { FIRST_SIGN_IN_FIELD } from "@/app/constants/access/FirstSignInError.constants";
import { useFirstSignInFormViewModel } from "../hooks/useFirstSignInFormViewModel";
import { createFirstSignInSharedFieldProps } from "../utils/createFirstSignInSharedFieldProps";
import { typeInto } from "./firstSignInFormActions";
import { EDITED_VALUE } from "./firstSignInHooks.constants";

describe("createFirstSignInSharedFieldProps", () => {
  it("picks the error, ref and value of the requested field", () => {
    const { result } = renderHook(
      useFirstSignInFormViewModel
    );
    typeInto(
      result,
      FIRST_SIGN_IN_FIELD.NEW_PASSWORD,
      EDITED_VALUE
    );

    const props = createFirstSignInSharedFieldProps(
      result.current,
      FIRST_SIGN_IN_FIELD.NEW_PASSWORD
    );

    expect(props.value).toBe(EDITED_VALUE);
    expect(props.error).toBe(
      result.current.fieldErrors[
        FIRST_SIGN_IN_FIELD.NEW_PASSWORD
      ]
    );
    expect(props.inputRef).toBe(
      result.current.fieldRefs[
        FIRST_SIGN_IN_FIELD.NEW_PASSWORD
      ]
    );
  });

  it("shares the pending flag and change handler across fields", () => {
    const { result } = renderHook(
      useFirstSignInFormViewModel
    );

    const props = createFirstSignInSharedFieldProps(
      result.current,
      FIRST_SIGN_IN_FIELD.CONFIRM_PASSWORD
    );

    expect(props.isPending).toBe(result.current.isPending);
    expect(props.onChange).toBe(result.current.onChange);
  });
});
