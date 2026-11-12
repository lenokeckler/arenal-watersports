import type { ExternalGuideRegistrationResult } from "@/app/services/external-guide-registration/models/ExternalGuideRegistrationResult.type";
import type { EXTERNAL_GUIDE_REGISTRATION_STATUS } from "../constants/ExternalGuideRegistrationForm.constants";

export type ExternalGuideRegistrationState =
  | {
      status: typeof EXTERNAL_GUIDE_REGISTRATION_STATUS.IDLE;
    }
  | {
      status: typeof EXTERNAL_GUIDE_REGISTRATION_STATUS.REFUSED;
      code: Extract<
        ExternalGuideRegistrationResult,
        { ok: false }
      >["code"];
    }
  | {
      status: typeof EXTERNAL_GUIDE_REGISTRATION_STATUS.REGISTERED;
      registered: Extract<
        ExternalGuideRegistrationResult,
        { ok: true }
      >["registered"];
    };
