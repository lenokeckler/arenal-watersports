import { describe, expect, it } from "vitest";
import {
  ASSIGNABLE_BASE_ROLES,
  SUPABASE_WORK_AREA,
  WORKER_REGISTRATION_ERROR_CODE,
  WORKER_REGISTRATION_FIELD,
} from "@/app/constants";
import { checkWorkerRegistration } from "../checkWorkerRegistration";
import {
  INVALID_USERNAMES,
  REGISTRATION_FIXTURE,
  UNASSIGNABLE_BASE_ROLES,
} from "./WorkerRegistration.constants";

const VALID_INPUT = {
  baseRole: SUPABASE_WORK_AREA.OPERATIONS,
  fullName: REGISTRATION_FIXTURE.FULL_NAME,
  username: REGISTRATION_FIXTURE.USERNAME,
} as const;

const readFieldErrors = (
  input:
    Partial<typeof VALID_INPUT> | Record<string, string>
) => {
  const check = checkWorkerRegistration({
    ...VALID_INPUT,
    ...input,
  });

  return check.ok ? {} : check.fieldErrors;
};

describe("checkWorkerRegistration", () => {
  it.each(ASSIGNABLE_BASE_ROLES)(
    "accepts a worker with the %s base role",
    (baseRole) => {
      expect(
        checkWorkerRegistration({
          ...VALID_INPUT,
          baseRole,
        })
      ).toEqual({
        ok: true,
        registration: {
          baseRole,
          fullName: REGISTRATION_FIXTURE.FULL_NAME,
          username: REGISTRATION_FIXTURE.USERNAME,
        },
      });
    }
  );

  it("trims the name and keeps single spaces between words", () => {
    const check = checkWorkerRegistration({
      ...VALID_INPUT,
      fullName: REGISTRATION_FIXTURE.SPACED_FULL_NAME,
    });

    expect(check.ok && check.registration.fullName).toBe(
      REGISTRATION_FIXTURE.FULL_NAME
    );
  });

  it("trims and lowercases the username", () => {
    const check = checkWorkerRegistration({
      ...VALID_INPUT,
      username:
        REGISTRATION_FIXTURE.SPACED_UPPERCASE_USERNAME,
    });

    expect(check.ok && check.registration.username).toBe(
      REGISTRATION_FIXTURE.USERNAME
    );
  });

  it.each([
    ["an empty name", ""],
    ["a blank name", REGISTRATION_FIXTURE.BLANK],
  ])("asks for the name for %s", (_label, fullName) => {
    expect(readFieldErrors({ fullName })).toEqual({
      [WORKER_REGISTRATION_FIELD.FULL_NAME]:
        WORKER_REGISTRATION_ERROR_CODE.FULL_NAME_REQUIRED,
    });
  });

  it("accepts the longest name and refuses one character more", () => {
    expect(
      readFieldErrors({
        fullName: REGISTRATION_FIXTURE.LONGEST_FULL_NAME,
      })
    ).toEqual({});
    expect(
      readFieldErrors({
        fullName: REGISTRATION_FIXTURE.TOO_LONG_FULL_NAME,
      })
    ).toEqual({
      [WORKER_REGISTRATION_FIELD.FULL_NAME]:
        WORKER_REGISTRATION_ERROR_CODE.FULL_NAME_LENGTH,
    });
  });

  it.each([
    ["an empty username", ""],
    ["a blank username", REGISTRATION_FIXTURE.BLANK],
  ])("asks for the username for %s", (_label, username) => {
    expect(readFieldErrors({ username })).toEqual({
      [WORKER_REGISTRATION_FIELD.USERNAME]:
        WORKER_REGISTRATION_ERROR_CODE.USERNAME_REQUIRED,
    });
  });

  it.each([
    REGISTRATION_FIXTURE.SHORTEST_USERNAME,
    REGISTRATION_FIXTURE.LONGEST_USERNAME,
    REGISTRATION_FIXTURE.ALLOWED_SYMBOLS_USERNAME,
  ])("accepts the username %s", (username) => {
    expect(readFieldErrors({ username })).toEqual({});
  });

  it.each([
    REGISTRATION_FIXTURE.TOO_SHORT_USERNAME,
    REGISTRATION_FIXTURE.TOO_LONG_USERNAME,
  ])(
    "refuses the length of the username %s",
    (username) => {
      expect(readFieldErrors({ username })).toEqual({
        [WORKER_REGISTRATION_FIELD.USERNAME]:
          WORKER_REGISTRATION_ERROR_CODE.USERNAME_LENGTH,
      });
    }
  );

  it.each(INVALID_USERNAMES)(
    "refuses the characters of the username %s",
    (username) => {
      expect(readFieldErrors({ username })).toEqual({
        [WORKER_REGISTRATION_FIELD.USERNAME]:
          WORKER_REGISTRATION_ERROR_CODE.USERNAME_FORMAT,
      });
    }
  );

  it.each(UNASSIGNABLE_BASE_ROLES)(
    "refuses the base role %j",
    (baseRole) => {
      expect(readFieldErrors({ baseRole })).toEqual({
        [WORKER_REGISTRATION_FIELD.BASE_ROLE]:
          WORKER_REGISTRATION_ERROR_CODE.BASE_ROLE_REQUIRED,
      });
    }
  );

  it("reports every field at once", () => {
    expect(
      readFieldErrors({
        baseRole: "",
        fullName: "",
        username: "",
      })
    ).toEqual({
      [WORKER_REGISTRATION_FIELD.BASE_ROLE]:
        WORKER_REGISTRATION_ERROR_CODE.BASE_ROLE_REQUIRED,
      [WORKER_REGISTRATION_FIELD.FULL_NAME]:
        WORKER_REGISTRATION_ERROR_CODE.FULL_NAME_REQUIRED,
      [WORKER_REGISTRATION_FIELD.USERNAME]:
        WORKER_REGISTRATION_ERROR_CODE.USERNAME_REQUIRED,
    });
  });
});
