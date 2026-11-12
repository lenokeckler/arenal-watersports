import type { ExternalGuideRegistrationInput } from "../models/ExternalGuideRegistrationInput.interface";

export const EXTERNAL_GUIDE_TEST = {
  AUTH_USER_ID: "a1300000-0000-4000-8000-000000000001",
  CREATOR_ID: "a1300000-0000-4000-8000-000000000002",
  EXPIRES_ON: "2035-11-20",
  FULL_NAME: "External Guide",
  INVALID_DATE: "2035-02-30",
  INVALID_EMAIL: "invalid-email",
  NATIONAL_ID: "130000001",
  PERSONAL_EMAIL: "guide@example.com",
  TEMPORARY_PASSWORD: "Temporary-Password-1",
} as const;

export const EXTERNAL_GUIDE_INPUT: ExternalGuideRegistrationInput =
  {
    expiresOn: EXTERNAL_GUIDE_TEST.EXPIRES_ON,
    fullName: EXTERNAL_GUIDE_TEST.FULL_NAME,
    nationalId: EXTERNAL_GUIDE_TEST.NATIONAL_ID,
    personalEmail: EXTERNAL_GUIDE_TEST.PERSONAL_EMAIL,
  };
