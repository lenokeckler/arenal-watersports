import { describe, expect, it } from "vitest";
import { PASSWORD_RECOVERY_ERROR_CODE } from "@/app/constants";
import { createPasswordRecoveryError } from "../createPasswordRecoveryError";
import { failPasswordRecovery } from "../failPasswordRecovery";

describe("failPasswordRecovery", () => {
  it.each(Object.values(PASSWORD_RECOVERY_ERROR_CODE))(
    "answers a failed result carrying the error of %s",
    (code) => {
      expect(failPasswordRecovery(code)).toEqual({
        error: createPasswordRecoveryError(code),
        ok: false,
      });
    }
  );
});
