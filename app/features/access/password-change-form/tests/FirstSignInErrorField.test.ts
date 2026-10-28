import { describe, expect, it } from "vitest";
import {
  PASSWORD_CHANGE_ERROR_CODE,
  PASSWORD_CHANGE_ERROR_FIELD,
} from "@/app/constants/access/PasswordChangeError.constants";
import { NO_PASSWORD_CHANGE_FORM_ERRORS } from "../constants/PasswordChangeDefaults.constants";

describe("first sign-in error fields", () => {
  it.each(Object.values(PASSWORD_CHANGE_ERROR_CODE))(
    "places %s on a field the form renders",
    (code) => {
      expect(NO_PASSWORD_CHANGE_FORM_ERRORS).toHaveProperty(
        PASSWORD_CHANGE_ERROR_FIELD[code]
      );
    }
  );
});
