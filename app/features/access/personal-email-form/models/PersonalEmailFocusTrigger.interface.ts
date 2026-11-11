import type { NullableRef } from "@/app/types";
import type { PersonalEmailError } from "@/app/utils/personal-email/models/PersonalEmailError.interface";

export interface PersonalEmailFocusTrigger {
  invalidSubmitCount: number;
  serverError: NullableRef<PersonalEmailError>;
}
