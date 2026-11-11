import { useState } from "react";
import {
  PERSONAL_EMAIL_ERROR_CODE,
  STRING,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";
import type { PersonalEmailError } from "@/app/utils/personal-email/models/PersonalEmailError.interface";
import type { PersonalEmailFieldChangeHandler } from "../models/PersonalEmailFieldChangeHandler.type";
import type { PersonalEmailFieldValues } from "../models/PersonalEmailFieldValues.type";
import type { PersonalEmailFormValues } from "../models/PersonalEmailFormValues.interface";
import { isPersonalEmailValueName } from "../utils/isPersonalEmailValueName";

export const usePersonalEmailFormValues = (
  initialEmail: string,
  serverError: NullableRef<PersonalEmailError>,
  dismissServerError: () => void
): PersonalEmailFormValues => {
  const [values, setValues] =
    useState<PersonalEmailFieldValues>({
      currentPassword: STRING.Empty,
      email: initialEmail,
    });
  const [handledError, setHandledError] =
    useState<NullableRef<PersonalEmailError>>(null);

  if (serverError !== handledError) {
    setHandledError(serverError);
    if (
      serverError?.code ===
      PERSONAL_EMAIL_ERROR_CODE.CURRENT_PASSWORD_INVALID
    ) {
      setValues((current) => ({
        ...current,
        currentPassword: STRING.Empty,
      }));
    }
  }

  const onChange: PersonalEmailFieldChangeHandler = (
    event
  ) => {
    const { name, value } = event.target;
    if (!isPersonalEmailValueName(name)) {
      return;
    }
    setValues((current) => ({ ...current, [name]: value }));
    dismissServerError();
  };

  return { onChange, values };
};
