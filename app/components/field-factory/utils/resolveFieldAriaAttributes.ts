import { STRING } from "@/app/constants";
import { FIELD_ERROR_ID_SUFFIX } from "../constants/FieldFactory.constants";
import { FieldAriaAttributes } from "../models/FieldAriaAttributes.interface";

const resolveDescribedBy = (
  id: string,
  hasErrorText: boolean,
  describedBy?: string
): string =>
  [
    hasErrorText && `${id}${FIELD_ERROR_ID_SUFFIX}`,
    describedBy,
  ]
    .filter(Boolean)
    .join(STRING.SPACE);

export const resolveFieldAriaAttributes = (
  id: string,
  hasError: boolean,
  hasErrorText: boolean,
  describedBy?: string
): FieldAriaAttributes => {
  const ids = resolveDescribedBy(
    id,
    hasErrorText,
    describedBy
  );

  return {
    ...(hasError && { "aria-invalid": true as const }),
    ...(ids && { "aria-describedby": ids }),
  };
};
