import { useActionState, useState } from "react";
import type { NullableRef } from "@/app/types";
import type { PersonalEmailError } from "@/app/utils/personal-email/models/PersonalEmailError.interface";
import type { PersonalEmailAction } from "../models/PersonalEmailAction.interface";
import type { PersonalEmailServerAction } from "../models/PersonalEmailServerAction.type";

export const usePersonalEmailAction = (
  serverAction: PersonalEmailServerAction
): PersonalEmailAction => {
  const [error, action, isPending] = useActionState(
    serverAction,
    null
  );
  const [dismissedError, setDismissedError] =
    useState<NullableRef<PersonalEmailError>>(null);

  return {
    action,
    dismiss: () => setDismissedError(error),
    error: error === dismissedError ? null : error,
    isPending,
  };
};
