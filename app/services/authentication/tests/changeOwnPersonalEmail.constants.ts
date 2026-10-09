import { PERSONAL_EMAIL_INTENT } from "@/app/constants";
import {
  DEFAULT_PERSONAL_EMAIL_CHANGE_INPUT,
  VALID_ADDRESS,
} from "@/app/utils/personal-email/tests/personalEmail.constants";

const PADDING = "  ";

export const REMOVE_INPUT = {
  ...DEFAULT_PERSONAL_EMAIL_CHANGE_INPUT,
  intent: PERSONAL_EMAIL_INTENT.REMOVE,
};

export const PADDED_MIXED_CASE_ADDRESS = `${PADDING}${VALID_ADDRESS.toUpperCase()}${PADDING}`;
