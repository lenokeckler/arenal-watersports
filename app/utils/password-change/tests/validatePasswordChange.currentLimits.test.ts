import { describe, expect, it } from "vitest";
import { PASSWORD_CHANGE_ERROR_CODE } from "@/app/constants";
import { createPasswordChangeError } from "../createPasswordChangeError";
import {
  CURRENT_PASSWORD_AT_MAX_BYTES,
  CURRENT_PASSWORD_AT_MAX_LENGTH,
  CURRENT_PASSWORD_ONE_BYTE_ABOVE_MAX,
} from "./currentPasswordLimits.constants";
import { validateWithOverrides } from "./validateWithOverrides";

describe("validatePasswordChange current password limits", () => {
  it.each([
    [
      "exactly the maximum length",
      CURRENT_PASSWORD_AT_MAX_LENGTH,
    ],
    [
      "exactly the maximum bytes",
      CURRENT_PASSWORD_AT_MAX_BYTES,
    ],
  ])(
    "accepts a current password of %s",
    (_, currentPassword) => {
      expect(
        validateWithOverrides({ currentPassword })
      ).toBeNull();
    }
  );

  it("rejects a current password one byte above the maximum bytes", () => {
    expect(
      validateWithOverrides({
        currentPassword:
          CURRENT_PASSWORD_ONE_BYTE_ABOVE_MAX,
      })
    ).toEqual(
      createPasswordChangeError(
        PASSWORD_CHANGE_ERROR_CODE.CURRENT_PASSWORD_TOO_LONG
      )
    );
  });
});
