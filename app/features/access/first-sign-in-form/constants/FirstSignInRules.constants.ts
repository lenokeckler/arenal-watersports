import { PASSWORD_RULES_ID_SUFFIX } from "@/app/components/password-rules-checklist/constants/PasswordRulesIds.constants";
import { FIRST_SIGN_IN_FIELD } from "@/app/constants/access/FirstSignInError.constants";

export const FIRST_SIGN_IN_RULES_ID = `${FIRST_SIGN_IN_FIELD.NEW_PASSWORD}-rules`;

export const FIRST_SIGN_IN_RULES_TITLE_ID = `${FIRST_SIGN_IN_RULES_ID}${PASSWORD_RULES_ID_SUFFIX.TITLE}`;

export const FIRST_SIGN_IN_NEW_PASSWORD_DESCRIBED_BY = `${FIRST_SIGN_IN_RULES_TITLE_ID} ${FIRST_SIGN_IN_RULES_ID}`;
