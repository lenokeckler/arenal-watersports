import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { PASSWORD_CHANGE_FIELD } from "@/app/constants/access/PasswordChangeError.constants";
import { DEFAULT_PASSWORD_CHANGE_INPUT } from "@/app/utils/password-change/tests/passwordChange.constants";
import { PROFILE_PASSWORD_USERNAME_FIELD } from "../constants/ProfilePasswordUsernameField.constants";
import { EMPTY_PASSWORD_CHANGE_INPUT } from "../constants/PasswordChangeDefaults.constants";
import { readPasswordChangeInput } from "../utils/readPasswordChangeInput";
import { createPasswordChangeFormData } from "./createPasswordChangeFormData";
import {
  HIDDEN_USERNAME_VALUE,
  UPLOADED_FILE,
} from "./readPasswordChangeInput.constants";

describe("readPasswordChangeInput", () => {
  it("reads the three posted fields", () => {
    expect(
      readPasswordChangeInput(
        createPasswordChangeFormData(
          DEFAULT_PASSWORD_CHANGE_INPUT
        )
      )
    ).toEqual(DEFAULT_PASSWORD_CHANGE_INPUT);
  });

  it("reads missing fields as empty text", () => {
    expect(readPasswordChangeInput(new FormData())).toEqual(
      EMPTY_PASSWORD_CHANGE_INPUT
    );
  });

  it("reads a field that is not text as empty text", () => {
    const formData = createPasswordChangeFormData(
      DEFAULT_PASSWORD_CHANGE_INPUT
    );
    formData.set(
      PASSWORD_CHANGE_FIELD.NEW_PASSWORD,
      UPLOADED_FILE
    );

    expect(
      readPasswordChangeInput(formData).newPassword
    ).toBe(STRING.Empty);
  });

  it("ignores the hidden username the password manager reads", () => {
    const formData = createPasswordChangeFormData(
      DEFAULT_PASSWORD_CHANGE_INPUT
    );
    formData.set(
      PROFILE_PASSWORD_USERNAME_FIELD.NAME,
      HIDDEN_USERNAME_VALUE
    );

    expect(readPasswordChangeInput(formData)).toEqual(
      DEFAULT_PASSWORD_CHANGE_INPUT
    );
  });
});
