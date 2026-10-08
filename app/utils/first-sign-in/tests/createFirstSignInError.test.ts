import { describe, expect, it } from "vitest";
import {
  FIRST_SIGN_IN_ERROR_CODE,
  FIRST_SIGN_IN_ERROR_FIELD,
} from "@/app/constants";
import { createFirstSignInError } from "../createFirstSignInError";

describe("createFirstSignInError", () => {
  it.each(Object.values(FIRST_SIGN_IN_ERROR_CODE))(
    "pairs %s with the field it belongs to",
    (code) => {
      expect(createFirstSignInError(code)).toEqual({
        code,
        field: FIRST_SIGN_IN_ERROR_FIELD[code],
      });
    }
  );
});
