export const EXTRA_FORM_FIELD_ID = {
  HINT: "extra-form-hint",
  NAME: "extra-name",
} as const;

export type ExtraFormFieldId =
  (typeof EXTRA_FORM_FIELD_ID)[keyof typeof EXTRA_FORM_FIELD_ID];
