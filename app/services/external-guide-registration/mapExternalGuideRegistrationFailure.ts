import { WORKER_REGISTRATION_ERROR_CODE } from "@/app/constants";
import {
  EXTERNAL_GUIDE_REGISTRATION_ERROR_CODE,
  EXTERNAL_GUIDE_REGISTRATION_RESULT,
} from "./constants/ExternalGuideRegistration.constants";
import type { ExternalGuideRegistrationErrorCode } from "./models/ExternalGuideRegistrationErrorCode.type";

export const mapExternalGuideAuthFailure = (
  code: string
): ExternalGuideRegistrationErrorCode => {
  if (
    code === WORKER_REGISTRATION_ERROR_CODE.USERNAME_TAKEN
  ) {
    return EXTERNAL_GUIDE_REGISTRATION_ERROR_CODE.NATIONAL_ID_TAKEN;
  }

  return EXTERNAL_GUIDE_REGISTRATION_ERROR_CODE.FAILED;
};

export const mapExternalGuideDatabaseFailure = (
  result: string | null
): ExternalGuideRegistrationErrorCode => {
  if (
    result ===
    EXTERNAL_GUIDE_REGISTRATION_RESULT.NATIONAL_ID_TAKEN
  ) {
    return EXTERNAL_GUIDE_REGISTRATION_ERROR_CODE.NATIONAL_ID_TAKEN;
  }

  if (
    result ===
    EXTERNAL_GUIDE_REGISTRATION_RESULT.NOT_ALLOWED
  ) {
    return EXTERNAL_GUIDE_REGISTRATION_ERROR_CODE.NOT_ALLOWED;
  }

  if (
    result ===
    EXTERNAL_GUIDE_REGISTRATION_RESULT.INVALID_INPUT
  ) {
    return EXTERNAL_GUIDE_REGISTRATION_ERROR_CODE.INVALID_INPUT;
  }

  return EXTERNAL_GUIDE_REGISTRATION_ERROR_CODE.FAILED;
};
