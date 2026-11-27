import { EXTRA_INPUT_FIELD } from "../constants/ExtraInputField.constants";
import { EXTRA_OCCUPANCY_COPY } from "../constants/ExtraOccupancyCopy.constants";
import type { ExtraFormErrors } from "../models/ExtraFormErrors.interface";
import type { ExtraFormValues } from "../models/ExtraFormValues.interface";
import { isExtraOccupancyBlank } from "./isExtraOccupancyBlank";
import { validateExtraInput } from "./validateExtraInput";

export const validateExtraFormInput = (
  values: ExtraFormValues,
  isOccupancyEnabled: boolean
): ExtraFormErrors => {
  const errors = validateExtraInput(values);
  const isOccupancyEmpty =
    isExtraOccupancyBlank(
      values[EXTRA_INPUT_FIELD.OCCUPIES_CATEGORY_ID]
    ) &&
    isExtraOccupancyBlank(
      values[EXTRA_INPUT_FIELD.OCCUPIES_QUANTITY]
    );

  return isOccupancyEnabled && isOccupancyEmpty
    ? {
        ...errors,
        occupancy: EXTRA_OCCUPANCY_COPY.INCOMPLETE_ERROR,
      }
    : errors;
};
