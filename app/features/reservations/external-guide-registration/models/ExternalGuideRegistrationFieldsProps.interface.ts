import type { ExternalGuideRegistrationInput } from "@/app/services/external-guide-registration/models/ExternalGuideRegistrationInput.interface";
import type { ExternalGuideRegistrationViewModel } from "./ExternalGuideRegistrationViewModel.interface";

export interface ExternalGuideRegistrationFieldsProps {
  isPending: boolean;
  onChange: ExternalGuideRegistrationViewModel["onChange"];
  values: ExternalGuideRegistrationInput;
}
