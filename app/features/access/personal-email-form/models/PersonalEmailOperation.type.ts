import type { PersonalEmailChangeResult } from "@/app/services/authentication";
import type { PersonalEmailChangeInput } from "@/app/utils/personal-email/models/PersonalEmailChangeInput.interface";

export type PersonalEmailOperation = (
  input: PersonalEmailChangeInput
) => Promise<PersonalEmailChangeResult>;
