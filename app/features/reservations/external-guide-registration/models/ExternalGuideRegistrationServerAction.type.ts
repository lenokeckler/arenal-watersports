import type { ExternalGuideRegistrationState } from "./ExternalGuideRegistrationState.type";

export type ExternalGuideRegistrationServerAction = (
  previousState: ExternalGuideRegistrationState,
  formData: FormData
) => Promise<ExternalGuideRegistrationState>;
