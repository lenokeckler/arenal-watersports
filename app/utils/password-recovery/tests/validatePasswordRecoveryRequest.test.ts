import { describe, expect, it } from "vitest";
import {
  PASSWORD_RECOVERY_ERROR_CODE,
  STRING,
} from "@/app/constants";
import { createPasswordRecoveryError } from "../createPasswordRecoveryError";
import { validatePasswordRecoveryRequest } from "../validatePasswordRecoveryRequest";
import {
  DEFAULT_PASSWORD_RECOVERY_PIN_INPUT,
  SHORT_USERNAME,
} from "./passwordRecovery.constants";

const { username } = DEFAULT_PASSWORD_RECOVERY_PIN_INPUT;

describe("validatePasswordRecoveryRequest", () => {
  it("accepts a valid username", () => {
    expect(
      validatePasswordRecoveryRequest({ username })
    ).toBeNull();
  });

  it("requires a username", () => {
    expect(
      validatePasswordRecoveryRequest({
        username: STRING.Empty,
      })
    ).toEqual(
      createPasswordRecoveryError(
        PASSWORD_RECOVERY_ERROR_CODE.USERNAME_REQUIRED
      )
    );
  });

  it("rejects a username outside the length limits", () => {
    expect(
      validatePasswordRecoveryRequest({
        username: SHORT_USERNAME,
      })
    ).toEqual(
      createPasswordRecoveryError(
        PASSWORD_RECOVERY_ERROR_CODE.USERNAME_LENGTH
      )
    );
  });
});
