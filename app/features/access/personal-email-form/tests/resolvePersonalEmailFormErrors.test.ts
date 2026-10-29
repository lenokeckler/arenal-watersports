import { describe, expect, it } from "vitest";
import {
  PERSONAL_EMAIL_ERROR_CODE,
  PERSONAL_EMAIL_FIELD,
} from "@/app/constants";
import { PERSONAL_EMAIL_ERROR_COPY } from "../constants/PersonalEmailErrorCopy.constants";
import { NO_PERSONAL_EMAIL_FORM_ERRORS } from "../constants/PersonalEmailFormDefaults.constants";
import type { PersonalEmailFormErrorSources } from "../models/PersonalEmailFormErrorSources.interface";
import { resolvePersonalEmailFormErrors } from "../utils/resolvePersonalEmailFormErrors";
import { SAVE_INPUT } from "./personalEmailForm.constants";
import {
  NETWORK_ERROR,
  TOO_MANY_REQUESTS_ERROR,
  UNKNOWN_ERROR,
} from "./personalEmailErrors.constants";
import {
  EMPTY_PASSWORD_INPUT,
  INVALID_ADDRESS_AND_PASSWORD_INPUT,
  INVALID_ADDRESS_INPUT,
  INVALID_INTENT_INPUT,
  REMOVE_WITH_INVALID_ADDRESS_INPUT,
  WRONG_PASSWORD_ERROR,
} from "./resolvePersonalEmailFormErrors.constants";

const resolveErrors = (
  overrides: Partial<PersonalEmailFormErrorSources>
) =>
  resolvePersonalEmailFormErrors({
    errorCopy: PERSONAL_EMAIL_ERROR_COPY,
    hasSubmitted: true,
    serverError: null,
    values: SAVE_INPUT,
    ...overrides,
  });

describe("resolvePersonalEmailFormErrors", () => {
  it("shows no error before the first submit", () => {
    expect(
      resolveErrors({
        hasSubmitted: false,
        values: INVALID_ADDRESS_INPUT,
      })
    ).toEqual(NO_PERSONAL_EMAIL_FORM_ERRORS);
  });

  it("shows the validation error under its field after a submit", () => {
    expect(
      resolveErrors({ values: INVALID_ADDRESS_INPUT })
    ).toEqual({
      ...NO_PERSONAL_EMAIL_FORM_ERRORS,
      [PERSONAL_EMAIL_FIELD.EMAIL]:
        PERSONAL_EMAIL_ERROR_COPY[
          PERSONAL_EMAIL_ERROR_CODE.EMAIL_INVALID
        ],
    });
  });

  it("reports the email before the password when both are invalid", () => {
    expect(
      resolveErrors({
        values: INVALID_ADDRESS_AND_PASSWORD_INPUT,
      })
    ).toEqual({
      ...NO_PERSONAL_EMAIL_FORM_ERRORS,
      [PERSONAL_EMAIL_FIELD.EMAIL]:
        PERSONAL_EMAIL_ERROR_COPY[
          PERSONAL_EMAIL_ERROR_CODE.EMAIL_INVALID
        ],
    });
  });

  it("shows no error for valid values after a submit", () => {
    expect(resolveErrors({})).toEqual(
      NO_PERSONAL_EMAIL_FORM_ERRORS
    );
  });

  it("shows the server error under its field before any client submit", () => {
    expect(
      resolveErrors({
        hasSubmitted: false,
        serverError: WRONG_PASSWORD_ERROR,
      })
    ).toEqual({
      ...NO_PERSONAL_EMAIL_FORM_ERRORS,
      [PERSONAL_EMAIL_FIELD.CURRENT_PASSWORD]:
        PERSONAL_EMAIL_ERROR_COPY[
          WRONG_PASSWORD_ERROR.code
        ],
    });
  });

  it("keeps the validation error of another field next to the server error", () => {
    expect(
      resolveErrors({
        serverError: NETWORK_ERROR,
        values: INVALID_ADDRESS_INPUT,
      })
    ).toEqual({
      ...NO_PERSONAL_EMAIL_FORM_ERRORS,
      [PERSONAL_EMAIL_FIELD.EMAIL]:
        PERSONAL_EMAIL_ERROR_COPY[
          PERSONAL_EMAIL_ERROR_CODE.EMAIL_INVALID
        ],
      [PERSONAL_EMAIL_FIELD.FORM]:
        PERSONAL_EMAIL_ERROR_COPY[NETWORK_ERROR.code],
    });
  });

  it.each([
    ["network", NETWORK_ERROR],
    ["too many requests", TOO_MANY_REQUESTS_ERROR],
    ["unknown", UNKNOWN_ERROR],
  ])(
    "puts the %s server error on the form banner only",
    (_name, serverError) => {
      expect(resolveErrors({ serverError })).toEqual({
        ...NO_PERSONAL_EMAIL_FORM_ERRORS,
        [PERSONAL_EMAIL_FIELD.FORM]:
          PERSONAL_EMAIL_ERROR_COPY[serverError.code],
      });
    }
  );

  it("lets the server error replace the validation error of the same field", () => {
    expect(
      resolveErrors({
        serverError: WRONG_PASSWORD_ERROR,
        values: EMPTY_PASSWORD_INPUT,
      })
    ).toEqual({
      ...NO_PERSONAL_EMAIL_FORM_ERRORS,
      [PERSONAL_EMAIL_FIELD.CURRENT_PASSWORD]:
        PERSONAL_EMAIL_ERROR_COPY[
          WRONG_PASSWORD_ERROR.code
        ],
    });
  });

  it("ignores the email field when removing", () => {
    expect(
      resolveErrors({
        values: REMOVE_WITH_INVALID_ADDRESS_INPUT,
      })
    ).toEqual(NO_PERSONAL_EMAIL_FORM_ERRORS);
  });

  it("puts an unknown intent on the form banner", () => {
    expect(
      resolveErrors({ values: INVALID_INTENT_INPUT })
    ).toEqual({
      ...NO_PERSONAL_EMAIL_FORM_ERRORS,
      [PERSONAL_EMAIL_FIELD.FORM]:
        PERSONAL_EMAIL_ERROR_COPY[
          PERSONAL_EMAIL_ERROR_CODE.INTENT_INVALID
        ],
    });
  });
});
