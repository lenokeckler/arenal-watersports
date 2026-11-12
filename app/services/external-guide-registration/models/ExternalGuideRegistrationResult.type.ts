import type { ExternalGuideRegistrationInput } from "./ExternalGuideRegistrationInput.interface";
import type { ExternalGuideRegistrationErrorCode } from "./ExternalGuideRegistrationErrorCode.type";

export type ExternalGuideRegistrationResult =
  | {
      ok: true;
      registered: ExternalGuideRegistrationInput & {
        temporaryPassword: string;
      };
    }
  | {
      ok: false;
      code: ExternalGuideRegistrationErrorCode;
    };
