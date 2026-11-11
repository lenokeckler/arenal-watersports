import type { PersonalEmailFieldRefs } from "./PersonalEmailFieldRefs.type";
import type { PersonalEmailFieldChangeHandler } from "./PersonalEmailFieldChangeHandler.type";
import type { PersonalEmailFormErrors } from "./PersonalEmailFormErrors.type";
import type { PersonalEmailFormValues } from "./PersonalEmailFormValues.interface";

export interface PersonalEmailFormFieldsProps extends PersonalEmailFormValues {
  fieldErrors: PersonalEmailFormErrors;
  fieldRefs: PersonalEmailFieldRefs;
  isPending: boolean;
  onChange: PersonalEmailFieldChangeHandler;
}
