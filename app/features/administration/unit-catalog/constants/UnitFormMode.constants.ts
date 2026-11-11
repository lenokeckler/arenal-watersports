export const UNIT_FORM_MODE = {
  CREATE: "create",
  EDIT: "edit",
} as const;

export type UnitFormMode =
  (typeof UNIT_FORM_MODE)[keyof typeof UNIT_FORM_MODE];
