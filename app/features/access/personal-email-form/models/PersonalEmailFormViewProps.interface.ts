import type { PersonalEmailErrorCopy } from "./PersonalEmailErrorCopy.type";
import type { PersonalEmailServerAction } from "./PersonalEmailServerAction.type";

export interface PersonalEmailFormViewProps {
  action: PersonalEmailServerAction;
  canRemove: boolean;
  errorCopy: PersonalEmailErrorCopy;
  initialEmail: string;
}
