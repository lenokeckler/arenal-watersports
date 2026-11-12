"use server";

import { registerExternalGuideAsSignedIn } from "@/app/services/external-guide-registration";
import { readTextField } from "@/app/utils/form-data/readTextField";
import {
  EXTERNAL_GUIDE_REGISTRATION_FIELD,
  EXTERNAL_GUIDE_REGISTRATION_STATUS,
} from "../constants/ExternalGuideRegistrationForm.constants";
import type { ExternalGuideRegistrationServerAction } from "../models/ExternalGuideRegistrationServerAction.type";

export const submitExternalGuideRegistration: ExternalGuideRegistrationServerAction =
  async (_previousState, formData) => {
    const result = await registerExternalGuideAsSignedIn({
      expiresOn: readTextField(
        formData,
        EXTERNAL_GUIDE_REGISTRATION_FIELD.EXPIRES_ON
      ),
      fullName: readTextField(
        formData,
        EXTERNAL_GUIDE_REGISTRATION_FIELD.FULL_NAME
      ),
      nationalId: readTextField(
        formData,
        EXTERNAL_GUIDE_REGISTRATION_FIELD.NATIONAL_ID
      ),
      personalEmail: readTextField(
        formData,
        EXTERNAL_GUIDE_REGISTRATION_FIELD.PERSONAL_EMAIL
      ),
    });

    if (!result.ok) {
      return {
        status: EXTERNAL_GUIDE_REGISTRATION_STATUS.REFUSED,
        code: result.code,
      };
    }

    return {
      status: EXTERNAL_GUIDE_REGISTRATION_STATUS.REGISTERED,
      registered: result.registered,
    };
  };
