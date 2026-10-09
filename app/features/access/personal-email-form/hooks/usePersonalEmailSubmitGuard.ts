import { useState } from "react";
import type { PersonalEmailIntent } from "@/app/constants";
import { validatePersonalEmailChange } from "@/app/utils/personal-email/validatePersonalEmailChange";
import { DEFAULT_PERSONAL_EMAIL_INTENT } from "../constants/PersonalEmailFormDefaults.constants";
import type { PersonalEmailFieldValues } from "../models/PersonalEmailFieldValues.type";
import type { PersonalEmailSubmitGuard } from "../models/PersonalEmailSubmitGuard.interface";
import type { PersonalEmailSubmitHandler } from "../models/PersonalEmailSubmitHandler.type";
import { resolveSubmittedPersonalEmailIntent } from "../utils/resolveSubmittedPersonalEmailIntent";

const nextCount = (count: number): number => count + 1;

export const usePersonalEmailSubmitGuard = (
  values: PersonalEmailFieldValues,
  dismissServerError: () => void,
  isPending: boolean
): PersonalEmailSubmitGuard => {
  const [invalidSubmitCount, setInvalidSubmitCount] =
    useState(0);
  const [intent, setIntent] = useState<PersonalEmailIntent>(
    DEFAULT_PERSONAL_EMAIL_INTENT
  );

  const onSubmit: PersonalEmailSubmitHandler = (event) => {
    if (isPending) {
      event.preventDefault();
      return;
    }
    const submittedIntent =
      resolveSubmittedPersonalEmailIntent(event);
    setIntent(submittedIntent);
    if (
      validatePersonalEmailChange({
        ...values,
        intent: submittedIntent,
      }).ok
    ) {
      return;
    }
    event.preventDefault();
    dismissServerError();
    setInvalidSubmitCount(nextCount);
  };

  return {
    hasSubmitted: invalidSubmitCount > 0,
    intent,
    invalidSubmitCount,
    onSubmit,
    pendingIntent: isPending ? intent : null,
  };
};
