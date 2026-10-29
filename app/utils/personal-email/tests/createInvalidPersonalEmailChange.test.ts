import { describe, expect, it } from "vitest";
import { PERSONAL_EMAIL_ERROR_CODE } from "@/app/constants";
import { createInvalidPersonalEmailChange } from "../createInvalidPersonalEmailChange";
import { createPersonalEmailError } from "../createPersonalEmailError";

describe("createInvalidPersonalEmailChange", () => {
  it.each(Object.values(PERSONAL_EMAIL_ERROR_CODE))(
    "wraps %s as a failed validation",
    (code) => {
      expect(
        createInvalidPersonalEmailChange(code)
      ).toEqual({
        error: createPersonalEmailError(code),
        ok: false,
      });
    }
  );
});
