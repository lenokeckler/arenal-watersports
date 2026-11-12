export const SERVER_ERROR_REPORT = {
  LEVEL: "error",
  UNKNOWN_ERROR_NAME: "UnknownError",
  MAX_FIELD_LENGTH: 200,
  CODE_KEY: "code",
} as const;

export type ServerErrorReportLevel =
  (typeof SERVER_ERROR_REPORT)["LEVEL"];
