import { STRING } from "@/app/constants";
import type { ExternalGuideRegistrationInput } from "@/app/services/external-guide-registration/models/ExternalGuideRegistrationInput.interface";
import type { ExternalGuideRegistrationState } from "../models/ExternalGuideRegistrationState.type";

export const EXTERNAL_GUIDE_REGISTRATION_FIELD = {
  EXPIRES_ON: "expiresOn",
  FULL_NAME: "fullName",
  NATIONAL_ID: "nationalId",
  PERSONAL_EMAIL: "personalEmail",
} as const;

export const EXTERNAL_GUIDE_REGISTRATION_STATUS = {
  IDLE: "idle",
  REGISTERED: "registered",
  REFUSED: "refused",
} as const;

export const EXTERNAL_GUIDE_REGISTRATION_EMPTY_VALUES: ExternalGuideRegistrationInput =
  {
    expiresOn: STRING.Empty,
    fullName: STRING.Empty,
    nationalId: STRING.Empty,
    personalEmail: STRING.Empty,
  };

export const EXTERNAL_GUIDE_REGISTRATION_INITIAL_STATE: ExternalGuideRegistrationState =
  {
    status: EXTERNAL_GUIDE_REGISTRATION_STATUS.IDLE,
  };
