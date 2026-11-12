import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { reportServerError } from "../reportServerError";
import {
  ERROR_WITH_JSON_CODE,
  ERROR_WITH_NEWLINE_CODE,
  FORGED_OPERATION,
  JSON_CODE,
  NEWLINE_CODE,
  PROBE_OPERATION,
} from "./serverErrorProbes.constants";

const LINE_BREAK_PATTERN = /[\r\n]/;

describe("reportServerError log line", () => {
  let writtenLine = "";

  beforeEach(() => {
    writtenLine = "";
    vi.spyOn(console, "error").mockImplementation(
      (line: string) => {
        writtenLine = line;
      }
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("writes one line even when the code holds line breaks", () => {
    reportServerError(
      PROBE_OPERATION,
      ERROR_WITH_NEWLINE_CODE
    );

    expect(writtenLine).not.toMatch(LINE_BREAK_PATTERN);
    expect(JSON.parse(writtenLine).errorCode).toBe(
      NEWLINE_CODE
    );
  });

  it("keeps a code that holds JSON inside its own field", () => {
    reportServerError(
      PROBE_OPERATION,
      ERROR_WITH_JSON_CODE
    );

    const parsed = JSON.parse(writtenLine);

    expect(parsed.errorCode).toBe(JSON_CODE);
    expect(parsed.operation).toBe(PROBE_OPERATION);
    expect(parsed.operation).not.toBe(FORGED_OPERATION);
  });
});
