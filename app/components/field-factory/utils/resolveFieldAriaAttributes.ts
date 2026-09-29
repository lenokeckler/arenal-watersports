import { FIELD_ERROR_ID_SUFFIX } from "../constants/FieldFactory.constants";
import { FieldAriaAttributes } from "../models/FieldAriaAttributes.interface";

export const resolveFieldAriaAttributes = (
  id: string,
  hasError: boolean
): FieldAriaAttributes =>
  hasError
    ? {
        "aria-invalid": true,
        "aria-describedby": `${id}${FIELD_ERROR_ID_SUFFIX}`,
      }
    : {};
