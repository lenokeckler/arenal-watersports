import { describe, expect, it } from "vitest";
import { SERVER_ERROR_REPORT } from "@/app/constants";
import { buildServerErrorReport } from "../buildServerErrorReport";
import {
  CIRCULAR_ERROR,
  DEFAULT_ERROR_NAME,
  ERROR_WITH_BIGINT_NAME,
  ERROR_WITH_HUGE_CODE,
  ERROR_WITH_HUGE_NAME,
  ERROR_WITH_MAX_LENGTH_CODE,
  ERROR_WITH_OVERSIZED_CODE,
  ERROR_WITH_THROWING_CAUSE,
  ERROR_WITH_THROWING_CODE,
  ERROR_WITH_THROWING_NAME,
  MAX_LENGTH_CODE,
  PROBE_OPERATION,
  UNUSUAL_THROWN_VALUES,
} from "./serverErrorProbes.constants";

describe("buildServerErrorReport probes", () => {
  it.each(UNUSUAL_THROWN_VALUES)(
    "reports %s under the unknown error name",
    (_description, thrown) => {
      expect(
        buildServerErrorReport(PROBE_OPERATION, thrown)
      ).toEqual({
        errorCode: null,
        errorName: SERVER_ERROR_REPORT.UNKNOWN_ERROR_NAME,
        level: SERVER_ERROR_REPORT.LEVEL,
        operation: PROBE_OPERATION,
      });
    }
  );

  it("terminates on an error whose cause is itself", () => {
    expect(
      buildServerErrorReport(
        PROBE_OPERATION,
        CIRCULAR_ERROR
      ).errorCode
    ).toBeNull();
  });

  it.each([
    ["code", ERROR_WITH_THROWING_CODE],
    ["cause", ERROR_WITH_THROWING_CAUSE],
  ])(
    "keeps the real name with no code when the %s getter throws",
    (_field, error) => {
      expect(
        buildServerErrorReport(PROBE_OPERATION, error)
      ).toEqual({
        errorCode: null,
        errorName: DEFAULT_ERROR_NAME,
        level: SERVER_ERROR_REPORT.LEVEL,
        operation: PROBE_OPERATION,
      });
    }
  );

  it.each([
    ["throws", ERROR_WITH_THROWING_NAME],
    ["is not a string", ERROR_WITH_BIGINT_NAME],
  ])(
    "reports the unknown error when the name %s",
    (_case, error) => {
      expect(
        buildServerErrorReport(PROBE_OPERATION, error)
      ).toEqual({
        errorCode: null,
        errorName: SERVER_ERROR_REPORT.UNKNOWN_ERROR_NAME,
        level: SERVER_ERROR_REPORT.LEVEL,
        operation: PROBE_OPERATION,
      });
    }
  );

  it("caps a huge code at the maximum field length", () => {
    expect(
      buildServerErrorReport(
        PROBE_OPERATION,
        ERROR_WITH_HUGE_CODE
      ).errorCode
    ).toHaveLength(SERVER_ERROR_REPORT.MAX_FIELD_LENGTH);
  });

  it("caps a huge name at the maximum field length", () => {
    expect(
      buildServerErrorReport(
        PROBE_OPERATION,
        ERROR_WITH_HUGE_NAME
      ).errorName
    ).toHaveLength(SERVER_ERROR_REPORT.MAX_FIELD_LENGTH);
  });

  it("keeps a code of exactly the maximum length whole", () => {
    expect(
      buildServerErrorReport(
        PROBE_OPERATION,
        ERROR_WITH_MAX_LENGTH_CODE
      ).errorCode
    ).toBe(MAX_LENGTH_CODE);
  });

  it("drops only the characters beyond the maximum length", () => {
    expect(
      buildServerErrorReport(
        PROBE_OPERATION,
        ERROR_WITH_OVERSIZED_CODE
      ).errorCode
    ).toBe(MAX_LENGTH_CODE);
  });
});
