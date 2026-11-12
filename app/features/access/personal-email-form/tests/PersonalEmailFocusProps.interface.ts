import type { PersonalEmailFocusTrigger } from "../models/PersonalEmailFocusTrigger.interface";
import type { PersonalEmailFormErrors } from "../models/PersonalEmailFormErrors.type";

export interface PersonalEmailFocusProps {
  errors: PersonalEmailFormErrors;
  trigger: PersonalEmailFocusTrigger;
}
