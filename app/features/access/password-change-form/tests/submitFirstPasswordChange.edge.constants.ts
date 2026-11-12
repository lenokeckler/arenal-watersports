import { PASSWORD_LENGTH } from "@/app/constants";

const OVERSIZED_FACTOR = 1000;

export const OVERSIZED_PASSWORD = "a".repeat(
  PASSWORD_LENGTH.MAX * OVERSIZED_FACTOR
);
export const DUPLICATED_FIELD_VALUE = "second-value";
export const REDIRECT_SIGNAL_MESSAGE = "NEXT_REDIRECT";
export const NON_ERROR_REJECTION = "rejected";
