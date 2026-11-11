import { EXTRA_INPUT_FIELD } from "../constants/ExtraInputField.constants";
import { readExtraInputField } from "./readExtraInputField";

export const readExtraName = (input: unknown): unknown =>
  readExtraInputField(input, EXTRA_INPUT_FIELD.NAME);
