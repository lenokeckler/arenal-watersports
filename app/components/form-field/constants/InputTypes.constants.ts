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
  EMAIL: "email",
  NEW_PASSWORD: "new-password",
  USERNAME: "username",
} as const;

export type Autocomplete =
  (typeof AUTOCOMPLETE)[keyof typeof AUTOCOMPLETE];

export const INPUT_MODE = {
  EMAIL: "email",
} as const;

export type InputMode =
  (typeof INPUT_MODE)[keyof typeof INPUT_MODE];

export const AUTOCAPITALIZE = {
  NONE: "none",
} as const;

export type Autocapitalize =
  (typeof AUTOCAPITALIZE)[keyof typeof AUTOCAPITALIZE];

export const BUTTON_TYPES = {
  SUBMIT: "submit",
  BUTTON: "button",
  RESET: "reset",
} as const;
