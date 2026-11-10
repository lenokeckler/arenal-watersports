import { SERVER_ERROR_REPORT } from "@/app/constants";
import { readErrorCode } from "./readErrorCode";
import type { ServerErrorReport } from "./models/ServerErrorReport.interface";

const truncate = (value: string): string =>
  value.slice(0, SERVER_ERROR_REPORT.MAX_FIELD_LENGTH);

const readErrorName = (error: unknown): string => {
  const name: unknown =
    error instanceof Error ? error.name : null;

  return typeof name === "string"
    ? name
    : SERVER_ERROR_REPORT.UNKNOWN_ERROR_NAME;
};

const buildUnknownReport = (
  operation: string
): ServerErrorReport => ({
  errorCode: null,
  errorName: SERVER_ERROR_REPORT.UNKNOWN_ERROR_NAME,
  level: SERVER_ERROR_REPORT.LEVEL,
  operation,
});

export const buildServerErrorReport = (
  operation: string,
  error: unknown
): ServerErrorReport => {
  try {
    const errorCode = readErrorCode(error);

    return {
      errorCode:
        errorCode === null ? null : truncate(errorCode),
      errorName: truncate(readErrorName(error)),
      level: SERVER_ERROR_REPORT.LEVEL,
      operation,
    };
  } catch {
    return buildUnknownReport(operation);
  }
};
