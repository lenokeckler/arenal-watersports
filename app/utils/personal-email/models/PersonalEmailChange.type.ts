import type { PERSONAL_EMAIL_INTENT } from "@/app/constants";

export type PersonalEmailChange =
  | {
      address: string;
      currentPassword: string;
      intent: typeof PERSONAL_EMAIL_INTENT.SAVE;
    }
  | {
      currentPassword: string;
      intent: typeof PERSONAL_EMAIL_INTENT.REMOVE;
    };
