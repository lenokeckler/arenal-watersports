import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { FIRST_SIGN_IN_FIELD } from "@/app/constants/access/FirstSignInError.constants";
import { DEFAULT_FIRST_PASSWORD_CHANGE_INPUT } from "@/app/utils/first-sign-in/tests/firstSignIn.constants";
import { EMPTY_FIRST_PASSWORD_CHANGE_INPUT } from "../constants/FirstSignInDefaults.constants";
import { readFirstPasswordChangeInput } from "../utils/readFirstPasswordChangeInput";
import { createFirstSignInFormData } from "./createFirstSignInFormData";
import { UPLOADED_FILE } from "./readFirstPasswordChangeInput.constants";

describe("readFirstPasswordChangeInput", () => {
  it("reads the three posted fields", () => {
    expect(
      readFirstPasswordChangeInput(
        createFirstSignInFormData(
          DEFAULT_FIRST_PASSWORD_CHANGE_INPUT
        )
      )
    ).toEqual(DEFAULT_FIRST_PASSWORD_CHANGE_INPUT);
  });

  it("reads missing fields as empty text", () => {
    expect(
      readFirstPasswordChangeInput(new FormData())
    ).toEqual(EMPTY_FIRST_PASSWORD_CHANGE_INPUT);
  });

  it("reads a field that is not text as empty text", () => {
    const formData = createFirstSignInFormData(
      DEFAULT_FIRST_PASSWORD_CHANGE_INPUT
    );
    formData.set(
      FIRST_SIGN_IN_FIELD.NEW_PASSWORD,
      UPLOADED_FILE
    );

    expect(
      readFirstPasswordChangeInput(formData).newPassword
    ).toBe(STRING.Empty);
  });
});
