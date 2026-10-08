export const INPUT_TYPES = {
  CHECKBOX: "checkbox",
  DATE: "date",
  EMAIL: "email",
  FILE: "file",
  NUMBER: "number",
  PASSWORD: "password",
  SEARCH: "search",
  SELECT: "select",
  SELECT_SEARCH: "selectSearch",
  SUBMIT: "submit",
  TEL: "tel",
  TEXT: "text",
  TEXTAREA: "textarea",
} as const;

export type INPUT_TYPES =
  (typeof INPUT_TYPES)[keyof typeof INPUT_TYPES];

export const AUTOCOMPLETE = {
  CURRENT_PASSWORD: "current-password",
  NEW_PASSWORD: "new-password",
} as const;

export type Autocomplete =
  (typeof AUTOCOMPLETE)[keyof typeof AUTOCOMPLETE];

export const BUTTON_TYPES = {
  SUBMIT: "submit",
  BUTTON: "button",
  RESET: "reset",
} as const;
