import { describe, expect, it } from "vitest";
import {
  PERSONAL_EMAIL_ERROR_CODE,
  PERSONAL_EMAIL_INTENT,
  STRING,
  type PersonalEmailErrorCode,
} from "@/app/constants";
import { createPersonalEmailError } from "../createPersonalEmailError";
import type { PersonalEmailChangeInput } from "../models/PersonalEmailChangeInput.interface";
import { validatePersonalEmailChange } from "../validatePersonalEmailChange";
import {
  DEFAULT_PERSONAL_EMAIL_CHANGE_INPUT,
  PASSWORD,
  PASSWORD_ONE_ABOVE_MAX,
  UNKNOWN_INTENT,
  VALID_ADDRESS,
} from "./personalEmail.constants";

const validate = (
  overrides: Partial<PersonalEmailChangeInput>
) =>
  validatePersonalEmailChange({
    ...DEFAULT_PERSONAL_EMAIL_CHANGE_INPUT,
    ...overrides,
  });

const failure = (code: PersonalEmailErrorCode) => ({
  error: createPersonalEmailError(code),
  ok: false,
});

describe("validatePersonalEmailChange", () => {
  it("returns the normalised address for a save", () => {
    expect(
      validate({ email: VALID_ADDRESS.toUpperCase() })
    ).toEqual({
      change: {
        address: VALID_ADDRESS,
        currentPassword: PASSWORD,
        intent: PERSONAL_EMAIL_INTENT.SAVE,
      },
      ok: true,
    });
  });

  it("ignores the address on a removal", () => {
    expect(
      validate({
        email: STRING.Empty,
        intent: PERSONAL_EMAIL_INTENT.REMOVE,
      })
    ).toEqual({
      change: {
        currentPassword: PASSWORD,
        intent: PERSONAL_EMAIL_INTENT.REMOVE,
      },
      ok: true,
    });
  });

  it("rejects an unknown intent before anything else", () => {
    expect(
      validate({
        currentPassword: STRING.Empty,
        email: STRING.Empty,
        intent: UNKNOWN_INTENT,
      })
    ).toEqual(
      failure(PERSONAL_EMAIL_ERROR_CODE.INTENT_INVALID)
    );
  });

  it("checks the address before the password on a save", () => {
    expect(
      validate({
        currentPassword: STRING.Empty,
        email: STRING.Empty,
      })
    ).toEqual(
      failure(PERSONAL_EMAIL_ERROR_CODE.EMAIL_REQUIRED)
    );
  });

  it("requires the current password on a save", () => {
    expect(
      validate({ currentPassword: STRING.Empty })
    ).toEqual(
      failure(
        PERSONAL_EMAIL_ERROR_CODE.CURRENT_PASSWORD_REQUIRED
      )
    );
  });

  it("requires the current password on a removal", () => {
    expect(
      validate({
        currentPassword: STRING.Empty,
        intent: PERSONAL_EMAIL_INTENT.REMOVE,
      })
    ).toEqual(
      failure(
        PERSONAL_EMAIL_ERROR_CODE.CURRENT_PASSWORD_REQUIRED
      )
    );
  });

  it("rejects a current password above the limit", () => {
    expect(
      validate({ currentPassword: PASSWORD_ONE_ABOVE_MAX })
    ).toEqual(
      failure(
        PERSONAL_EMAIL_ERROR_CODE.CURRENT_PASSWORD_TOO_LONG
      )
    );
  });
});
