export const EXTRA_FORM_MODE = {
  CREATE: "create",
  EDIT: "edit",
} as const;

export type ExtraFormMode =
  (typeof EXTRA_FORM_MODE)[keyof typeof EXTRA_FORM_MODE];
