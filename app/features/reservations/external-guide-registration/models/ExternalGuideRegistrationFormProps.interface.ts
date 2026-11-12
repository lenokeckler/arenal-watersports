import type { ExternalGuideRegistrationServerAction } from "./ExternalGuideRegistrationServerAction.type";

export interface ExternalGuideRegistrationFormProps {
  action: ExternalGuideRegistrationServerAction;
  onRegisterAnother: () => void;
}
