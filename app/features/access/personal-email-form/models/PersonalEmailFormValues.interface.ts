import type { PersonalEmailFieldChangeHandler } from "./PersonalEmailFieldChangeHandler.type";
import type { PersonalEmailFieldValues } from "./PersonalEmailFieldValues.type";

export interface PersonalEmailFormValues {
  onChange: PersonalEmailFieldChangeHandler;
  values: PersonalEmailFieldValues;
}
