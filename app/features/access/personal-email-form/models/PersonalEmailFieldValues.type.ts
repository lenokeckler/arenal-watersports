import type { PersonalEmailChangeInput } from "@/app/utils/personal-email/models/PersonalEmailChangeInput.interface";

export type PersonalEmailFieldValues = Omit<
  PersonalEmailChangeInput,
  "intent"
>;
