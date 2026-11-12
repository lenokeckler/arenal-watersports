import { describe, expect, it } from "vitest";
import {
  PERSONAL_EMAIL_ERROR_CODE,
  PERSONAL_EMAIL_ERROR_FIELD,
} from "@/app/constants";
import { createPersonalEmailError } from "../createPersonalEmailError";

describe("createPersonalEmailError", () => {
  it.each(Object.values(PERSONAL_EMAIL_ERROR_CODE))(
    "pairs %s with the field it belongs to",
    (code) => {
      expect(createPersonalEmailError(code)).toEqual({
        code,
        field: PERSONAL_EMAIL_ERROR_FIELD[code],
      });
    }
  );
});
