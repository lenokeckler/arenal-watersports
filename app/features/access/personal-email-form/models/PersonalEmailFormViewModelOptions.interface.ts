import type { PersonalEmailErrorCopy } from "./PersonalEmailErrorCopy.type";
import type { PersonalEmailServerAction } from "./PersonalEmailServerAction.type";

export interface PersonalEmailFormViewModelOptions {
  action: PersonalEmailServerAction;
  errorCopy: PersonalEmailErrorCopy;
  initialEmail: string;
}
