import { describe, expect, it } from "vitest";
import {
  SERVER_ERROR_REPORT,
  SUPABASE_AUTH_ERROR_CODE,
} from "@/app/constants";
import { buildServerErrorReport } from "../buildServerErrorReport";
import {
  AUTH_API_ERROR,
  CAUSE_CODE,
  CUSTOM_ERROR_NAME,
  ERROR_WITH_CAUSE_CODE,
  ERROR_WITH_CODE,
  ERROR_WITH_NUMERIC_CODE,
  ERROR_WITH_OWN_AND_CAUSE_CODE,
  LEAKED_MESSAGE,
  LEAKED_PASSWORD,
  LEAKED_USERNAME,
  LEAKING_ERROR,
  NAMED_ERROR,
  OWN_CODE,
  PLAIN_ERROR,
  POSTGREST_CODE,
  SUPABASE_QUERY_ERROR,
  TEST_OPERATION,
  THROWN_TEXT,
} from "./buildServerErrorReport.constants";

describe("buildServerErrorReport", () => {
  it("reports an Error by name with no code", () => {
    expect(
      buildServerErrorReport(TEST_OPERATION, PLAIN_ERROR)
    ).toEqual({
      errorCode: null,
      errorName: PLAIN_ERROR.name,
      level: SERVER_ERROR_REPORT.LEVEL,
      operation: TEST_OPERATION,
    });
  });

  it("keeps the name of a named Error", () => {
    expect(
      buildServerErrorReport(TEST_OPERATION, NAMED_ERROR)
        .errorName
    ).toBe(CUSTOM_ERROR_NAME);
  });

  it.each([
    ["a string", THROWN_TEXT],
    ["null", null],
    ["undefined", undefined],
    ["a plain object", { message: LEAKED_MESSAGE }],
  ])(
    "reports %s under the unknown error name",
    (_description, thrown) => {
      expect(
        buildServerErrorReport(TEST_OPERATION, thrown)
      ).toEqual({
        errorCode: null,
        errorName: SERVER_ERROR_REPORT.UNKNOWN_ERROR_NAME,
        level: SERVER_ERROR_REPORT.LEVEL,
        operation: TEST_OPERATION,
      });
    }
  );

  it("reads the code found on the error", () => {
    expect(
      buildServerErrorReport(
        TEST_OPERATION,
        ERROR_WITH_CODE
      ).errorCode
    ).toBe(OWN_CODE);
  });

  it("reads the code found on the cause", () => {
    expect(
      buildServerErrorReport(
        TEST_OPERATION,
        ERROR_WITH_CAUSE_CODE
      ).errorCode
    ).toBe(CAUSE_CODE);
  });

  it("prefers the code of the error over the one of its cause", () => {
    expect(
      buildServerErrorReport(
        TEST_OPERATION,
        ERROR_WITH_OWN_AND_CAUSE_CODE
      ).errorCode
    ).toBe(OWN_CODE);
  });

  it("ignores a code that is not a string", () => {
    expect(
      buildServerErrorReport(
        TEST_OPERATION,
        ERROR_WITH_NUMERIC_CODE
      ).errorCode
    ).toBeNull();
  });

  it("reports a SupabaseQueryError with the code of its PostgrestError", () => {
    expect(
      buildServerErrorReport(
        TEST_OPERATION,
        SUPABASE_QUERY_ERROR
      )
    ).toEqual({
      errorCode: POSTGREST_CODE,
      errorName: SUPABASE_QUERY_ERROR.name,
      level: SERVER_ERROR_REPORT.LEVEL,
      operation: TEST_OPERATION,
    });
  });

  it("reports an AuthApiError with its code", () => {
    expect(
      buildServerErrorReport(TEST_OPERATION, AUTH_API_ERROR)
    ).toEqual({
      errorCode:
        SUPABASE_AUTH_ERROR_CODE.INVALID_CREDENTIALS,
      errorName: AUTH_API_ERROR.name,
      level: SERVER_ERROR_REPORT.LEVEL,
      operation: TEST_OPERATION,
    });
  });

  it.each([
    ["an error and its cause", LEAKING_ERROR],
    ["a SupabaseQueryError", SUPABASE_QUERY_ERROR],
    ["an AuthApiError", AUTH_API_ERROR],
  ])(
    "never carries the username or password found in %s",
    (_description, error) => {
      const serialized = JSON.stringify(
        buildServerErrorReport(TEST_OPERATION, error)
      );

      expect(serialized).not.toContain(LEAKED_USERNAME);
      expect(serialized).not.toContain(LEAKED_PASSWORD);
      expect(serialized).not.toContain(LEAKED_MESSAGE);
    }
  );

  it("exposes only level, operation, error name and error code", () => {
    expect(
      Object.keys(
        buildServerErrorReport(
          TEST_OPERATION,
          LEAKING_ERROR
        )
      ).sort()
    ).toEqual([
      "errorCode",
      "errorName",
      "level",
      "operation",
    ]);
  });
});
