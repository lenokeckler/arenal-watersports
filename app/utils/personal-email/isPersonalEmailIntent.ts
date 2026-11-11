import {
  PERSONAL_EMAIL_INTENT,
  type PersonalEmailIntent,
} from "@/app/constants";

export const isPersonalEmailIntent = (
  value: string
): value is PersonalEmailIntent =>
  Object.values(PERSONAL_EMAIL_INTENT).some(
    (intent) => intent === value
  );
