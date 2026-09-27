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

export const BUTTON_TYPES = {
  SUBMIT: "submit",
  BUTTON: "button",
  RESET: "reset",
} as const;
