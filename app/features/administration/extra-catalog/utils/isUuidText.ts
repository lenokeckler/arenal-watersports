import { UUID_PATTERN } from "@/app/constants";
import { isTextValue } from "./isTextValue";

export const isUuidText = (
  value: unknown
): value is string =>
  isTextValue(value) && UUID_PATTERN.test(value);
