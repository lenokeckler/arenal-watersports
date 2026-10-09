import {
  PERSONAL_EMAIL_INTENT,
  SUPABASE_WORK_AREA,
} from "@/app/constants";
import { DEFAULT_PERSONAL_EMAIL_CHANGE_INPUT } from "@/app/utils/personal-email/tests/personalEmail.constants";
import { SIGNED_IN_USER_RESULT } from "./firstSignIn.constants";
import type { OwnPersonalEmail } from "../models/OwnPersonalEmail.interface";

export const WORKER_ID = SIGNED_IN_USER_RESULT.data.user.id;

export const OWN_ADDRESS = "ana@correo.com";

export const PADDED_MIXED_CASE_ADDRESS =
  "  Ana.Perez@Correo.COM ";

export const NON_ADMINISTRATION_WORK_AREA = "reservas";

export const ADMINISTRATION_AREA =
  SUPABASE_WORK_AREA.ADMINISTRATION;

export const personalEmailRow = (
  address: string | null,
  baseRole: string
) => ({
  data: { base_role: baseRole, personal_email: address },
  error: null,
});

export const OPTIONAL_OWN_PERSONAL_EMAIL: OwnPersonalEmail =
  { address: OWN_ADDRESS, isRequired: false };

export const REQUIRED_OWN_PERSONAL_EMAIL: OwnPersonalEmail =
  { address: OWN_ADDRESS, isRequired: true };

export const REMOVE_INPUT = {
  ...DEFAULT_PERSONAL_EMAIL_CHANGE_INPUT,
  intent: PERSONAL_EMAIL_INTENT.REMOVE,
};
