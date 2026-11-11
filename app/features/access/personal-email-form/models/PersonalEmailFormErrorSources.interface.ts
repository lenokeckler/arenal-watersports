import type { NullableRef } from "@/app/types";
import type { PersonalEmailChangeInput } from "@/app/utils/personal-email/models/PersonalEmailChangeInput.interface";
import type { PersonalEmailError } from "@/app/utils/personal-email/models/PersonalEmailError.interface";
import type { PersonalEmailErrorCopy } from "./PersonalEmailErrorCopy.type";

export interface PersonalEmailFormErrorSources {
  errorCopy: PersonalEmailErrorCopy;
  hasSubmitted: boolean;
  serverError: NullableRef<PersonalEmailError>;
  values: PersonalEmailChangeInput;
}
