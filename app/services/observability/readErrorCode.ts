import { SERVER_ERROR_REPORT } from "@/app/constants";
import type { NullableRef } from "@/app/types";

const readOwnCode = (
  value: unknown
): NullableRef<string> => {
  if (!(value instanceof Object)) {
    return null;
  }

  const code: unknown = Reflect.get(
    value,
    SERVER_ERROR_REPORT.CODE_KEY
  );

  return typeof code === "string" ? code : null;
};

const readCauseCode = (
  error: unknown
): NullableRef<string> =>
  error instanceof Error ? readOwnCode(error.cause) : null;

export const readErrorCode = (
  error: unknown
): NullableRef<string> => {
  try {
    return readOwnCode(error) ?? readCauseCode(error);
  } catch {
    return null;
  }
};
