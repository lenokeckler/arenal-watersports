import type { NullableRef } from "@/app/types";
import type { PersonalEmailError } from "@/app/utils/personal-email/models/PersonalEmailError.interface";

export interface PersonalEmailValuesProps {
  serverError: NullableRef<PersonalEmailError>;
}
