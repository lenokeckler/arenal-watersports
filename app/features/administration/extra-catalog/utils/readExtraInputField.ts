import type { ExtraInputField } from "../constants/ExtraInputField.constants";
import { isObjectValue } from "./isObjectValue";

export const readExtraInputField = (
  input: unknown,
  field: ExtraInputField
): unknown =>
  isObjectValue(input)
    ? Reflect.get(input, field)
    : undefined;
