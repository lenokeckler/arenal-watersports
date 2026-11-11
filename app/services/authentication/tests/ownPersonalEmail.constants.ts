import {
  PERSONAL_EMAIL_INTENT,
  SUPABASE_WORK_AREA,
} from "@/app/constants";
import {
  PASSWORD,
  VALID_ADDRESS,
} from "@/app/utils/personal-email/tests/personalEmail.constants";
import type { Database } from "@/app/types/Database";
import {
  ALREADY_CHANGED_WORKER,
  SIGNED_IN_USER_RESULT,
} from "./firstSignIn.constants";
import type { OwnPersonalEmail } from "../models/OwnPersonalEmail.interface";

export const WORKER_ID = SIGNED_IN_USER_RESULT.data.user.id;

export const OWN_ADDRESS = "ana@correo.com";

export const NON_ADMINISTRATION_WORK_AREA =
  SUPABASE_WORK_AREA.RESERVATIONS;

export const ADMINISTRATION_AREA =
  SUPABASE_WORK_AREA.ADMINISTRATION;

export const personalEmailRow = (
  address: string | null,
  baseRole: Database["public"]["Enums"]["work_area"]
) => ({
  data: { base_role: baseRole, personal_email: address },
  error: null,
});

export const OPTIONAL_OWN_PERSONAL_EMAIL: OwnPersonalEmail =
  { address: OWN_ADDRESS, isRequired: false };

export const REQUIRED_OWN_PERSONAL_EMAIL: OwnPersonalEmail =
  { address: OWN_ADDRESS, isRequired: true };

export const ADMINISTRATION_WORKER = {
  ...ALREADY_CHANGED_WORKER,
  baseRole: ADMINISTRATION_AREA,
};

export const FOREIGN_SESSION_USER_ID =
  "00000000-0000-4000-8000-0000000000f0";

export const REMOVAL = {
  currentPassword: PASSWORD,
  intent: PERSONAL_EMAIL_INTENT.REMOVE,
} as const;

export const REPLACEMENT = {
  address: VALID_ADDRESS,
  currentPassword: PASSWORD,
  intent: PERSONAL_EMAIL_INTENT.SAVE,
} as const;
