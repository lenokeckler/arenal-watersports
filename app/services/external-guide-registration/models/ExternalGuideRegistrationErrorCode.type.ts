import { EXTERNAL_GUIDE_REGISTRATION_ERROR_CODE } from "../constants/ExternalGuideRegistration.constants";

export type ExternalGuideRegistrationErrorCode =
  (typeof EXTERNAL_GUIDE_REGISTRATION_ERROR_CODE)[keyof typeof EXTERNAL_GUIDE_REGISTRATION_ERROR_CODE];
