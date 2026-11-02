import type { NullableRef } from "@/app/types";
import type { PersonalEmailError } from "@/app/utils/personal-email/models/PersonalEmailError.interface";
import type { PersonalEmailFormAction } from "./PersonalEmailFormAction.type";

export interface PersonalEmailAction {
  action: PersonalEmailFormAction;
  dismiss: () => void;
  error: NullableRef<PersonalEmailError>;
  isPending: boolean;
}
