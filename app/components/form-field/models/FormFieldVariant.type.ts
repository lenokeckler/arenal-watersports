import type { FORM_FIELD_VARIANT } from "../constants/FormFieldVariant.constants";

export type FormFieldVariant =
  (typeof FORM_FIELD_VARIANT)[keyof typeof FORM_FIELD_VARIANT];
