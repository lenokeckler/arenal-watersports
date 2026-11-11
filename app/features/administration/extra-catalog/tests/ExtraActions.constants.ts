import { FAKE_EXTRA_NAME } from "./Extra.constants";

export const FAKE_EXTRA_ADMIN_WORKER_ID =
  "fake-extra-admin-worker-id";
export const EXTRAS_TABLE = "extras";
export const EXTRA_ID_COLUMN = "id";
export const EXTRA_NAME_COLUMN = "name";
export const EXTRA_STATUS_COLUMN = "status";
export const PADDED_EXTRA_NAME = `  ${FAKE_EXTRA_NAME}  `;
export const BLANK_EXTRA_NAME = "   ";
export const SERVER_ERROR_CODE = "500";
export const ZERO_PRICE_TEXT = "0";
export const DECIMAL_POINT = ".";
export const DECIMAL_COMMA = ",";
export const INVALID_UUID_MESSAGE =
  "invalid input syntax for type uuid";
export const NON_STRING_EXTRA_NAMES: readonly unknown[] = [
  null,
  undefined,
  42,
  true,
  {},
  ["extra"],
];
