import type { PersonalEmailChange } from "./PersonalEmailChange.type";
import type { PersonalEmailError } from "./PersonalEmailError.interface";

export type PersonalEmailValidation =
  | { change: PersonalEmailChange; ok: true }
  | { error: PersonalEmailError; ok: false };
