export const CATEGORY_IMAGE_FORM_STATE = {
  EMPTY: "empty",
  PICKED: "picked",
  SAVED: "saved",
} as const;

export type CategoryImageFormState =
  (typeof CATEGORY_IMAGE_FORM_STATE)[keyof typeof CATEGORY_IMAGE_FORM_STATE];
