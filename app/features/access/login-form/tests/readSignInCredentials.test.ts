import { describe, expect, it } from "vitest";
import { SIGN_IN_FIELD, STRING } from "@/app/constants";
import { DEFAULT_SIGN_IN_CREDENTIALS } from "@/app/utils/sign-in/tests/signIn.constants";
import { readSignInCredentials } from "../utils/readSignInCredentials";
import { createSignInFormData } from "./createSignInFormData";
import { UPLOADED_FILE_NAME } from "./readSignInCredentials.constants";

describe("readSignInCredentials", () => {
  it("reads the username and the password of the posted form", () => {
    expect(
      readSignInCredentials(
        createSignInFormData(DEFAULT_SIGN_IN_CREDENTIALS)
      )
    ).toEqual(DEFAULT_SIGN_IN_CREDENTIALS);
  });

  it("reads a missing field as empty", () => {
    expect(readSignInCredentials(new FormData())).toEqual({
      password: STRING.Empty,
      username: STRING.Empty,
    });
  });

  it("reads a file posted in place of a field as empty", () => {
    const formData = createSignInFormData(
      DEFAULT_SIGN_IN_CREDENTIALS
    );
    formData.set(
      SIGN_IN_FIELD.PASSWORD,
      new File([STRING.Empty], UPLOADED_FILE_NAME)
    );

    expect(readSignInCredentials(formData).password).toBe(
      STRING.Empty
    );
  });
});
