import { useActionState, useState } from "react";
import type { ExternalGuideRegistrationInput } from "@/app/services/external-guide-registration/models/ExternalGuideRegistrationInput.interface";
import {
  EXTERNAL_GUIDE_REGISTRATION_EMPTY_VALUES,
  EXTERNAL_GUIDE_REGISTRATION_INITIAL_STATE,
} from "../constants/ExternalGuideRegistrationForm.constants";
import type { ExternalGuideRegistrationServerAction } from "../models/ExternalGuideRegistrationServerAction.type";
import type { ExternalGuideRegistrationViewModel } from "../models/ExternalGuideRegistrationViewModel.interface";

export const useExternalGuideRegistrationViewModel = (
  action: ExternalGuideRegistrationServerAction
): ExternalGuideRegistrationViewModel => {
  const [state, formAction, isPending] = useActionState(
    action,
    EXTERNAL_GUIDE_REGISTRATION_INITIAL_STATE
  );
  const [values, setValues] =
    useState<ExternalGuideRegistrationInput>(
      EXTERNAL_GUIDE_REGISTRATION_EMPTY_VALUES
    );

  return {
    formAction,
    isPending,
    onChange: ({ target: { name, value } }) => {
      setValues((current) => ({
        ...current,
        [name]: value,
      }));
    },
    state,
    values,
  };
};
