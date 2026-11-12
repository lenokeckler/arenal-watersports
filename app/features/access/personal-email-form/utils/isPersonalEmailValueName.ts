import { PERSONAL_EMAIL_FIELD } from "@/app/constants";
import type { PersonalEmailFieldValues } from "../models/PersonalEmailFieldValues.type";

export const isPersonalEmailValueName = (
  name: string
): name is keyof PersonalEmailFieldValues =>
  name === PERSONAL_EMAIL_FIELD.EMAIL ||
  name === PERSONAL_EMAIL_FIELD.CURRENT_PASSWORD;
