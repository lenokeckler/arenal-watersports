import type { ExternalGuideRegistrationResult } from "@/app/services/external-guide-registration/models/ExternalGuideRegistrationResult.type";

export interface ExternalGuideRegistrationResultProps {
  onRegisterAnother: () => void;
  registered: Extract<
    ExternalGuideRegistrationResult,
    { ok: true }
  >["registered"];
}
