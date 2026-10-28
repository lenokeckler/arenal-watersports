import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type MockInstance,
} from "vitest";
import { SERVER_ERROR_REPORT } from "@/app/constants";
import { buildServerErrorReport } from "../buildServerErrorReport";
import { reportServerError } from "../reportServerError";
import {
  SUPABASE_QUERY_ERROR,
  TEST_OPERATION,
} from "./buildServerErrorReport.constants";
import {
  CONSOLE_FAILURE_MESSAGE,
  ERROR_WITH_THROWING_NAME,
} from "./serverErrorProbes.constants";

describe("reportServerError", () => {
  let writtenLine = "";
  let consoleErrorSpy: MockInstance;

  beforeEach(() => {
    writtenLine = "";
    consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation((line: unknown) => {
        writtenLine = String(line);
      });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("writes the report once, as JSON, through console.error", () => {
    reportServerError(TEST_OPERATION, SUPABASE_QUERY_ERROR);

    expect(consoleErrorSpy).toHaveBeenCalledOnce();
    expect(JSON.parse(writtenLine)).toEqual(
      buildServerErrorReport(
        TEST_OPERATION,
        SUPABASE_QUERY_ERROR
      )
    );
  });

  it("writes the fallback line when the report cannot be written", () => {
    consoleErrorSpy.mockImplementationOnce(() => {
      throw new Error(CONSOLE_FAILURE_MESSAGE);
    });
    consoleErrorSpy.mockImplementationOnce(
      (line: unknown) => {
        writtenLine = String(line);
      }
    );

    reportServerError(TEST_OPERATION, SUPABASE_QUERY_ERROR);

    expect(JSON.parse(writtenLine)).toEqual({
      errorCode: null,
      errorName: SERVER_ERROR_REPORT.UNKNOWN_ERROR_NAME,
      level: SERVER_ERROR_REPORT.LEVEL,
      operation: TEST_OPERATION,
    });
  });

  it("does not throw when the console always throws", () => {
    consoleErrorSpy.mockImplementation(() => {
      throw new Error(CONSOLE_FAILURE_MESSAGE);
    });

    expect(() =>
      reportServerError(
        TEST_OPERATION,
        SUPABASE_QUERY_ERROR
      )
    ).not.toThrow();
  });

  it("does not throw when the error name getter throws", () => {
    expect(() =>
      reportServerError(
        TEST_OPERATION,
        ERROR_WITH_THROWING_NAME
      )
    ).not.toThrow();
  });
});
