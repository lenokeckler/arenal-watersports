import { readOwnPersonalEmail } from "@/app/services/authentication";
import { PERSONAL_EMAIL_STATE } from "../constants/PersonalEmailState.constants";
import type { PersonalEmailState } from "../models/PersonalEmailState.type";

export const resolvePersonalEmailState =
  async (): Promise<PersonalEmailState> => {
    try {
      const personalEmail = await readOwnPersonalEmail();

      return personalEmail?.address
        ? PERSONAL_EMAIL_STATE.REGISTERED
        : PERSONAL_EMAIL_STATE.NOT_REGISTERED;
    } catch {
      return PERSONAL_EMAIL_STATE.UNKNOWN;
    }
  };
