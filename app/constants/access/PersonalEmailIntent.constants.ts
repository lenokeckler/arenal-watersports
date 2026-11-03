export const PERSONAL_EMAIL_INTENT_FIELD = "intent";

export const PERSONAL_EMAIL_INTENT = {
  REMOVE: "remove",
  SAVE: "save",
} as const;

export type PersonalEmailIntent =
  (typeof PERSONAL_EMAIL_INTENT)[keyof typeof PERSONAL_EMAIL_INTENT];
