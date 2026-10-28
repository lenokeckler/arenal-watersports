import { SERVER_ERROR_REPORT } from "@/app/constants";
import { TEST_OPERATION } from "./buildServerErrorReport.constants";

export const GETTER_FAILURE_MESSAGE = "getter exploded";
export const NEWLINE_CODE = "FIRST\nSECOND\r\nTHIRD";
export const HUGE_CODE_LENGTH = 100_000;
export const HUGE_CODE = "X".repeat(HUGE_CODE_LENGTH);
export const FORGED_OPERATION = "forged";
export const JSON_CODE = `","level":"info","operation":"${FORGED_OPERATION}","x":"`;
export const SYMBOL_DESCRIPTION = "thrown symbol";
export const BIGINT_VALUE = BigInt(1);
export const PROBE_OPERATION = TEST_OPERATION;

const throwFromGetter = (): never => {
  throw new Error(GETTER_FAILURE_MESSAGE);
};

export const ERROR_WITH_THROWING_CODE =
  Object.defineProperty(
    new Error(GETTER_FAILURE_MESSAGE),
    "code",
    { get: throwFromGetter }
  );

export const ERROR_WITH_THROWING_CAUSE =
  Object.defineProperty(
    new Error(GETTER_FAILURE_MESSAGE),
    "cause",
    { get: throwFromGetter }
  );

export const ERROR_WITH_THROWING_NAME =
  Object.defineProperty(
    new Error(GETTER_FAILURE_MESSAGE),
    "name",
    { get: throwFromGetter }
  );

const createCircularError = (): Error => {
  const error = new Error(GETTER_FAILURE_MESSAGE);
  error.cause = error;
  return error;
};

export const CIRCULAR_ERROR = createCircularError();

export const ERROR_WITH_NEWLINE_CODE = Object.assign(
  new Error(GETTER_FAILURE_MESSAGE),
  { code: NEWLINE_CODE }
);

export const ERROR_WITH_JSON_CODE = Object.assign(
  new Error(GETTER_FAILURE_MESSAGE),
  { code: JSON_CODE }
);

export const ERROR_WITH_HUGE_CODE = Object.assign(
  new Error(GETTER_FAILURE_MESSAGE),
  { code: HUGE_CODE }
);

export const UNUSUAL_THROWN_VALUES: [string, unknown][] = [
  ["a symbol", Symbol(SYMBOL_DESCRIPTION)],
  ["a bigint", BIGINT_VALUE],
  ["a function", throwFromGetter],
];

export const DEFAULT_ERROR_NAME = "Error";
export const CONSOLE_FAILURE_MESSAGE = "console exploded";

export const ERROR_WITH_BIGINT_NAME = Object.defineProperty(
  new Error(GETTER_FAILURE_MESSAGE),
  "name",
  { value: BIGINT_VALUE }
);

export const ERROR_WITH_HUGE_NAME = Object.defineProperty(
  new Error(GETTER_FAILURE_MESSAGE),
  "name",
  { value: HUGE_CODE }
);

export const MAX_LENGTH_CODE = "Y".repeat(
  SERVER_ERROR_REPORT.MAX_FIELD_LENGTH
);

export const OVERSIZED_MAX_LENGTH_CODE = `${MAX_LENGTH_CODE}Z`;

export const ERROR_WITH_MAX_LENGTH_CODE = Object.assign(
  new Error(GETTER_FAILURE_MESSAGE),
  { code: MAX_LENGTH_CODE }
);

export const ERROR_WITH_OVERSIZED_CODE = Object.assign(
  new Error(GETTER_FAILURE_MESSAGE),
  { code: OVERSIZED_MAX_LENGTH_CODE }
);
