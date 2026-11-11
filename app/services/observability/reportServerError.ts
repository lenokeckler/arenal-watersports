import { SERVER_ERROR_REPORT } from "@/app/constants";
import { buildServerErrorReport } from "./buildServerErrorReport";

const writeLine = (createLine: () => string): boolean => {
  try {
    console.error(createLine());
    return true;
  } catch {
    return false;
  }
};

const createFallbackLine = (operation: string): string =>
  JSON.stringify({
    errorCode: null,
    errorName: SERVER_ERROR_REPORT.UNKNOWN_ERROR_NAME,
    level: SERVER_ERROR_REPORT.LEVEL,
    operation,
  });

export const reportServerError = (
  operation: string,
  error: unknown
): void => {
  const written = writeLine(() =>
    JSON.stringify(buildServerErrorReport(operation, error))
  );

  if (!written) {
    writeLine(() => createFallbackLine(operation));
  }
};
