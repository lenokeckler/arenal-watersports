import {
  STRING,
  type PersonalEmailIntent,
} from "@/app/constants";
import { isPersonalEmailIntent } from "@/app/utils/personal-email/isPersonalEmailIntent";
import { DEFAULT_PERSONAL_EMAIL_INTENT } from "../constants/PersonalEmailFormDefaults.constants";
import type { PersonalEmailSubmitEvent } from "../models/PersonalEmailSubmitEvent.type";

export const resolveSubmittedPersonalEmailIntent = (
  event: PersonalEmailSubmitEvent
): PersonalEmailIntent => {
  const { submitter } = event.nativeEvent;
  const value =
    submitter instanceof HTMLButtonElement
      ? submitter.value
      : STRING.Empty;

  return isPersonalEmailIntent(value)
    ? value
    : DEFAULT_PERSONAL_EMAIL_INTENT;
};
