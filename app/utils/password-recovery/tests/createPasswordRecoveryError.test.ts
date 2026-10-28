import { describe, expect, it } from "vitest";
import {
  PASSWORD_RECOVERY_ERROR_CODE,
  PASSWORD_RECOVERY_ERROR_FIELD,
} from "@/app/constants";
import { createPasswordRecoveryError } from "../createPasswordRecoveryError";

describe("createPasswordRecoveryError", () => {
  it.each(Object.values(PASSWORD_RECOVERY_ERROR_CODE))(
    "pairs %s with the field it belongs to",
    (code) => {
      expect(createPasswordRecoveryError(code)).toEqual({
        code,
        field: PASSWORD_RECOVERY_ERROR_FIELD[code],
      });
    }
  );
});
