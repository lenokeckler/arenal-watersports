import type { NullableRef } from "@/app/types";
import { EXTRA_COMPATIBILITY_INPUT_FIELD } from "../constants/ExtraCompatibilityInputField.constants";
import type { SetExtraCompatibilityInput } from "../models/SetExtraCompatibilityInput.interface";
import { isObjectValue } from "./isObjectValue";
import { isUuidText } from "./isUuidText";

export const parseSetExtraCompatibilityInput = (
  input: unknown
): NullableRef<SetExtraCompatibilityInput> => {
  if (!isObjectValue(input)) {
    return null;
  }
  const extraId = Reflect.get(
    input,
    EXTRA_COMPATIBILITY_INPUT_FIELD.EXTRA_ID
  );
  const categoryId = Reflect.get(
    input,
    EXTRA_COMPATIBILITY_INPUT_FIELD.CATEGORY_ID
  );
  const unitIds = Reflect.get(
    input,
    EXTRA_COMPATIBILITY_INPUT_FIELD.UNIT_IDS
  );
  if (
    !isUuidText(extraId) ||
    !isUuidText(categoryId) ||
    !Array.isArray(unitIds) ||
    !unitIds.every(isUuidText)
  ) {
    return null;
  }

  return { extraId, categoryId, unitIds };
};
