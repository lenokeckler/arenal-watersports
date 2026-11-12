import type { ExternalGuideRegistrationInput } from "@/app/services/external-guide-registration/models/ExternalGuideRegistrationInput.interface";
import type { ExternalGuideRegistrationState } from "./ExternalGuideRegistrationState.type";

export interface ExternalGuideRegistrationViewModel {
  formAction: (formData: FormData) => void;
  isPending: boolean;
  onChange: (
    event: React.ChangeEvent<
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
    >
  ) => void;
  state: ExternalGuideRegistrationState;
  values: ExternalGuideRegistrationInput;
}
