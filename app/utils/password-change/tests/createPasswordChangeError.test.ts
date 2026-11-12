import { describe, expect, it } from "vitest";
import {
  PASSWORD_CHANGE_ERROR_CODE,
  PASSWORD_CHANGE_ERROR_FIELD,
} from "@/app/constants";
import { createPasswordChangeError } from "../createPasswordChangeError";

describe("createPasswordChangeError", () => {
  it.each(Object.values(PASSWORD_CHANGE_ERROR_CODE))(
    "pairs %s with the field it belongs to",
    (code) => {
      expect(createPasswordChangeError(code)).toEqual({
        code,
        field: PASSWORD_CHANGE_ERROR_FIELD[code],
      });
    }
  );
});
