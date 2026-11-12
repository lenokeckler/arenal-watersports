import { EXTERNAL_GUIDE_REGISTRATION_ERROR_CODE } from "@/app/services/external-guide-registration/constants/ExternalGuideRegistration.constants";
import type { ExternalGuideRegistrationErrorCode } from "@/app/services/external-guide-registration/models/ExternalGuideRegistrationErrorCode.type";
import { EXTERNAL_GUIDE_REGISTRATION_COPY } from "../constants/ExternalGuideRegistrationCopy.constants";

export const resolveExternalGuideRegistrationError = (
  code: ExternalGuideRegistrationErrorCode
): string => {
  switch (code) {
    case EXTERNAL_GUIDE_REGISTRATION_ERROR_CODE.INVALID_INPUT:
      return EXTERNAL_GUIDE_REGISTRATION_COPY.INVALID;
    case EXTERNAL_GUIDE_REGISTRATION_ERROR_CODE.NATIONAL_ID_TAKEN:
      return EXTERNAL_GUIDE_REGISTRATION_COPY.NATIONAL_ID_TAKEN;
    case EXTERNAL_GUIDE_REGISTRATION_ERROR_CODE.NOT_ALLOWED:
      return EXTERNAL_GUIDE_REGISTRATION_COPY.NOT_ALLOWED;
    default:
      return EXTERNAL_GUIDE_REGISTRATION_COPY.FAILED;
  }
};
