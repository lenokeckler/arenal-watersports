import { validatePersonalEmailAddress } from "@/app/utils/personal-email/validatePersonalEmailAddress";
import { EXTERNAL_GUIDE_REGISTRATION_INPUT } from "./constants/ExternalGuideRegistration.constants";
import type { ExternalGuideRegistrationInput } from "./models/ExternalGuideRegistrationInput.interface";

export const checkExternalGuideRegistrationInput = (
  input: ExternalGuideRegistrationInput
): boolean => {
  const nationalId = input.nationalId.trim();
  const expiresOn = input.expiresOn;
  const expiry = new Date(`${expiresOn}T00:00:00Z`);
  const personalEmail = input.personalEmail?.trim();

  return (
    input.fullName.trim().length > 0 &&
    nationalId.length >=
      EXTERNAL_GUIDE_REGISTRATION_INPUT.MIN_NATIONAL_ID_LENGTH &&
    nationalId.length <=
      EXTERNAL_GUIDE_REGISTRATION_INPUT.MAX_NATIONAL_ID_LENGTH &&
    EXTERNAL_GUIDE_REGISTRATION_INPUT.DATE_PATTERN.test(
      expiresOn
    ) &&
    !Number.isNaN(expiry.getTime()) &&
    expiry.toISOString().startsWith(expiresOn) &&
    (!personalEmail ||
      validatePersonalEmailAddress(personalEmail).ok)
  );
};
