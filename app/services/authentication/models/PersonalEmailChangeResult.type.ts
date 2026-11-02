import type { PersonalEmailIntent } from "@/app/constants";
import type { PersonalEmailError } from "@/app/utils/personal-email/models/PersonalEmailError.interface";

export type PersonalEmailChangeResult =
  | { ok: true; intent: PersonalEmailIntent }
  | { ok: false; error: PersonalEmailError };
