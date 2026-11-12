import { describe, expect, it } from "vitest";
import {
  ACCESS_SHARED_COPY,
  PASSWORD_RECOVERY_FIELD,
} from "@/app/constants";
import { NO_PASSWORD_RECOVERY_FORM_ERRORS } from "../constants/PasswordRecoveryRequestDefaults.constants";
import { PASSWORD_RECOVERY_REQUEST_UNKNOWN_COPY } from "../constants/PasswordRecoveryRequestErrorCopy.constants";
import { resolvePasswordRecoveryRequestErrors } from "../utils/resolvePasswordRecoveryRequestErrors";
import {
  EMPTY_USERNAME,
  NETWORK_ERROR,
  RAW_USERNAME,
  SHORT_USERNAME,
  TOO_MANY_REQUESTS_ERROR,
  UNKNOWN_ERROR,
  USERNAME_REQUIRED_ERROR,
} from "./passwordRecoveryRequest.constants";

describe("resolvePasswordRecoveryRequestErrors", () => {
  it("shows no error before the first submit even with an empty username", () => {
    expect(
      resolvePasswordRecoveryRequestErrors({
        hasSubmitted: false,
        serverError: null,
        values: { username: EMPTY_USERNAME },
      })
    ).toEqual(NO_PASSWORD_RECOVERY_FORM_ERRORS);
  });

  it("shows the required error under the username after a submit", () => {
    const errors = resolvePasswordRecoveryRequestErrors({
      hasSubmitted: true,
      serverError: null,
      values: { username: EMPTY_USERNAME },
    });

    expect(errors[PASSWORD_RECOVERY_FIELD.USERNAME]).toBe(
      ACCESS_SHARED_COPY.USERNAME_REQUIRED
    );
    expect(errors[PASSWORD_RECOVERY_FIELD.FORM]).toBeNull();
  });

  it("shows the length error under the username after a submit", () => {
    const errors = resolvePasswordRecoveryRequestErrors({
      hasSubmitted: true,
      serverError: null,
      values: { username: SHORT_USERNAME },
    });

    expect(errors[PASSWORD_RECOVERY_FIELD.USERNAME]).toBe(
      ACCESS_SHARED_COPY.USERNAME_LENGTH
    );
  });

  it("clears the error once the username is valid", () => {
    expect(
      resolvePasswordRecoveryRequestErrors({
        hasSubmitted: true,
        serverError: null,
        values: { username: RAW_USERNAME },
      })
    ).toEqual(NO_PASSWORD_RECOVERY_FORM_ERRORS);
  });

  it.each([
    [UNKNOWN_ERROR, PASSWORD_RECOVERY_REQUEST_UNKNOWN_COPY],
    [NETWORK_ERROR, ACCESS_SHARED_COPY.NETWORK],
    [
      TOO_MANY_REQUESTS_ERROR,
      ACCESS_SHARED_COPY.TOO_MANY_REQUESTS,
    ],
  ])(
    "puts the server error %o in the form banner",
    (serverError, text) => {
      const errors = resolvePasswordRecoveryRequestErrors({
        hasSubmitted: false,
        serverError,
        values: { username: RAW_USERNAME },
      });

      expect(errors[PASSWORD_RECOVERY_FIELD.FORM]).toBe(
        text
      );
      expect(
        errors[PASSWORD_RECOVERY_FIELD.USERNAME]
      ).toBeNull();
    }
  );

  it("puts a server username error under the username", () => {
    const errors = resolvePasswordRecoveryRequestErrors({
      hasSubmitted: false,
      serverError: USERNAME_REQUIRED_ERROR,
      values: { username: RAW_USERNAME },
    });

    expect(errors[PASSWORD_RECOVERY_FIELD.USERNAME]).toBe(
      ACCESS_SHARED_COPY.USERNAME_REQUIRED
    );
  });
});
