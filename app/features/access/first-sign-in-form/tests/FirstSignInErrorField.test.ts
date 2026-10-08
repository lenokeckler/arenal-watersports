import { describe, expect, it } from "vitest";
import {
  FIRST_SIGN_IN_ERROR_CODE,
  FIRST_SIGN_IN_ERROR_FIELD,
} from "@/app/constants/access/FirstSignInError.constants";
import { NO_FIRST_SIGN_IN_FORM_ERRORS } from "../constants/FirstSignInDefaults.constants";

describe("first sign-in error fields", () => {
  it.each(Object.values(FIRST_SIGN_IN_ERROR_CODE))(
    "places %s on a field the form renders",
    (code) => {
      expect(NO_FIRST_SIGN_IN_FORM_ERRORS).toHaveProperty(
        FIRST_SIGN_IN_ERROR_FIELD[code]
      );
    }
  );
});
