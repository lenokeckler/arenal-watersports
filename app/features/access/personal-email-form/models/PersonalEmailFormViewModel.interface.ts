import type { PersonalEmailIntent } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import type { PersonalEmailFieldRefs } from "./PersonalEmailFieldRefs.type";
import type { PersonalEmailFormAction } from "./PersonalEmailFormAction.type";
import type { PersonalEmailFormErrors } from "./PersonalEmailFormErrors.type";
import type { PersonalEmailFormValues } from "./PersonalEmailFormValues.interface";
import type { PersonalEmailSubmitHandler } from "./PersonalEmailSubmitHandler.type";

export interface PersonalEmailFormViewModel extends PersonalEmailFormValues {
  fieldErrors: PersonalEmailFormErrors;
  fieldRefs: PersonalEmailFieldRefs;
  formAction: PersonalEmailFormAction;
  isPending: boolean;
  onSubmit: PersonalEmailSubmitHandler;
  pendingIntent: NullableRef<PersonalEmailIntent>;
}
