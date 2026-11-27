import { EXTRA_INPUT_FIELD } from "../constants/ExtraInputField.constants";
import type { ExtraOccupancyErrors } from "../models/ExtraOccupancyErrors.interface";
import { readExtraInputField } from "./readExtraInputField";
import { resolveExtraOccupancyIssue } from "./resolveExtraOccupancyIssue";

export const validateExtraOccupancy = (
  input: unknown
): ExtraOccupancyErrors => {
  const occupancyIssue = resolveExtraOccupancyIssue(
    readExtraInputField(
      input,
      EXTRA_INPUT_FIELD.OCCUPIES_CATEGORY_ID
    ),
    readExtraInputField(
      input,
      EXTRA_INPUT_FIELD.OCCUPIES_QUANTITY
    )
  );

  return occupancyIssue
    ? { occupancy: occupancyIssue }
    : {};
};
